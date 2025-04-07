require('dotenv').config()
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const { Kafka } = require('kafkajs')
const sequelize = require('./config')
const Notification = require('./models/notification')
const app = express()
app.use(express.json())
const server = http.createServer(app)
const io = socketIo(server, { cors: { origin: '*' } })
sequelize.sync()
const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: [process.env.KAFKA_BROKER || 'kafka:9092']
})
const consumer = kafka.consumer({ groupId: 'notification-group' })
;(async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'transaction_events', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ message }) => {
            const event = JSON.parse(message.value.toString())
            const nt = await Notification.create({
                userId: 1,
                type: event.status === 'completed' ? 'TRANSACTION_COMPLETED' : 'TRANSACTION_FAILED',
                message: `Transaction ${event.transactionId} ${event.status}`
            })
            io.emit('notification', nt)
        }
    })
})()
app.get('/health', (req, res) => res.json({ status: 'OK' }))
app.get('/', async (req, res) => {
    try {
        const data = await Notification.findAll({ order: [['id','DESC']] })
        res.json(data)
    } catch {
        res.status(500).json({ error: 'Cannot list notifications' })
    }
})
io.on('connection', () => {})
server.listen(4004, () => console.log('Notification Service on port 4004'))
