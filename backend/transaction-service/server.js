require('dotenv').config()
const express = require('express')
const axios = require('axios')
const { Kafka } = require('kafkajs')
const sequelize = require('./config')
const Transaction = require('./models/transaction')
const TransactionSaga = require('./models/transactionSaga')
const CompensationLog = require('./models/compensationLog')
const app = express()
app.use(express.json())
sequelize.sync()
const kafka = new Kafka({
    clientId: 'transaction-service',
    brokers: [process.env.KAFKA_BROKER || 'kafka:9092']
})
const producer = kafka.producer()
;(async () => { await producer.connect() })()
app.get('/health', (req, res) => res.json({ status: 'OK' }))
app.post('/transfer', async (req, res) => {
    const { fromAccountId, toAccountId, amount } = req.body
    if (!fromAccountId || !toAccountId || !amount) {
        return res.status(400).json({ error: 'Missing parameters' })
    }
    try {
        await axios.put(`http://account-service:4002/${fromAccountId}`, { amount: -amount })
        await axios.put(`http://account-service:4002/${toAccountId}`, { amount })
        const tx = await Transaction.create({ fromAccountId, toAccountId, amount, status: 'completed' })
        await TransactionSaga.create({ transactionId: tx.id, currentStep: 2, state: 'COMPLETED' })
        await producer.send({
            topic: 'transaction_events',
            messages: [{ value: JSON.stringify({ transactionId: tx.id, status: 'completed' }) }]
        })
        res.json(tx)
    } catch (err) {
        try {
            await axios.put(`http://account-service:4002/${fromAccountId}`, { amount })
            await CompensationLog.create({
                sagaId: (await TransactionSaga.max('sagaId')) || 0,
                action: 'ROLLBACK_DEBIT',
                notes: 'Rollback due to transfer failure'
            })
            res.status(500).json({ error: 'Transfer failed, rollback performed' })
        } catch {
            res.status(500).json({ error: 'Transfer failed and compensation error' })
        }
    }
})
app.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ order: [['id','DESC']] })
        res.json(transactions)
    } catch {
        res.status(500).json({ error: 'Cannot list transactions' })
    }
})
app.listen(4003, () => console.log('Transaction Service on port 4003'))
