require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sequelize = require('./config')
const User = require('./models/user')
const app = express()
app.use(express.json())
const JWT_SECRET = process.env.JWT_SECRET || 'my_jwt_secret'
sequelize.sync()
app.get('/health', (req, res) => res.json({ status: 'OK' }))
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
        const existing = await User.findOne({ where: { email } })
        if (existing) return res.status(400).json({ error: 'User already exists' })
        const hash = await bcrypt.hash(password, 10)
        await User.create({ email, passwordHash: hash })
        res.status(201).json({ message: 'User registered successfully' })
    } catch {
        res.status(500).json({ error: 'Auth Error' })
    }
})
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(400).json({ error: 'Invalid credentials' })
        const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) return res.status(400).json({ error: 'Invalid credentials' })
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
        res.json({ token })
    } catch {
        res.status(500).json({ error: 'Auth Error' })
    }
})
app.listen(4001, () => console.log('Auth Service on port 4001'))
