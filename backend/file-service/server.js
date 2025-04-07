require('dotenv').config()
const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const sequelize = require('./config')
const File = require('./models/file')
const app = express()
app.use(express.json())
const upload = multer({ dest: 'uploads/' })
sequelize.sync()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.get('/health', (req, res) => res.json({ status: 'OK' }))
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
        const blobUrl = `http://localhost:4005/uploads/${req.file.filename}`
        const record = await File.create({ ownerId: req.body.ownerId, blobUrl, filename: req.file.originalname })
        res.status(201).json(record)
    } catch {
        res.status(500).json({ error: 'File Service Error' })
    }
})
app.get('/', async (req, res) => {
    try {
        const data = await File.findAll({ order: [['id','DESC']] })
        res.json(data)
    } catch {
        res.status(500).json({ error: 'File Service Error' })
    }
})
app.get('/:id/download', async (req, res) => {
    try {
        const f = await File.findByPk(req.params.id)
        if (!f) return res.status(404).json({ error: 'File not found' })
        const filenamePart = f.blobUrl.split('/').pop()
        const localPath = path.join(__dirname, 'uploads', filenamePart)
        if (!fs.existsSync(localPath)) return res.status(404).json({ error: 'File not on disk' })
        res.download(localPath, f.filename)
    } catch {
        res.status(500).json({ error: 'Download Error' })
    }
})
app.delete('/:id', async (req, res) => {
    try {
        const f = await File.findByPk(req.params.id)
        if (!f) return res.status(404).json({ error: 'File not found' })
        const filenamePart = f.blobUrl.split('/').pop()
        const localPath = path.join(__dirname, 'uploads', filenamePart)
        if (fs.existsSync(localPath)) fs.unlinkSync(localPath)
        await f.destroy()
        res.json({ message: 'File deleted' })
    } catch {
        res.status(500).json({ error: 'Delete Error' })
    }
})
app.listen(4005, () => console.log('File Service on port 4005'))
