require('dotenv').config()
const express = require('express')
const Redis = require('ioredis')
const sequelize = require('./config')
const Account = require('./models/account')
const app = express()
app.use(express.json())
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')
sequelize.sync()
app.get('/health', (req, res) => res.json({ status: 'OK' }))
app.post('/', async (req, res) => {
    try {
        const { userId, accountNumber } = req.body
        if (!userId || !accountNumber) return res.status(400).json({ error: 'Missing parameters' })
        const newAccount = await Account.create({ userId, accountNumber })
        await redis.del(`account:${newAccount.id}`)
        res.status(201).json(newAccount)
    } catch {
        res.status(500).json({ error: 'Account Error' })
    }
})
app.get('/', async (req, res) => {
    try {
        const { userId } = req.query
        let accounts
        if (userId) {
            accounts = await Account.findAll({ where: { userId } })
        } else {
            accounts = await Account.findAll()
        }
        res.json(accounts)
    } catch {
        res.status(500).json({ error: 'Account Error' })
    }
})
app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { amount } = req.body
        const account = await Account.findByPk(id)
        if (!account) return res.status(404).json({ error: 'Account not found' })
        account.balance = Number(account.balance) + Number(amount)
        await account.save()
        await redis.set(`account:${id}`, JSON.stringify(account))
        res.json(account)
    } catch {
        res.status(500).json({ error: 'Account Error' })
    }
})
app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const account = await Account.findByPk(id)
        if (!account) return res.status(404).json({ error: 'Account not found' })
        await account.destroy()
        res.json({ message: 'Account deleted successfully' })
    } catch {
        res.status(500).json({ error: 'Account Error' })
    }
})
app.listen(4002, () => console.log('Account Service on port 4002'))
