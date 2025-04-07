require('dotenv').config()
const express = require('express')
const multer = require('multer')
const {
    BlobServiceClient,
    generateBlobSASQueryParameters,
    BlobSASPermissions
} = require('@azure/storage-blob')
const sequelize = require('./config')
const File = require('./models/file')
const app = express()
app.use(express.json())

// Use memoryStorage so file is in buffer
const upload = multer({ storage: multer.memoryStorage() })

sequelize.sync()

const blobClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
)
const container = blobClient.getContainerClient(
    process.env.AZURE_STORAGE_CONTAINER_NAME
)

// Upload to Azure, setting mime + Content-Disposition=attachment
async function uploadToAzure(buffer, name, mime, originalName) {
    const blockBlob = container.getBlockBlobClient(name)
    await blockBlob.uploadData(buffer, {
        blobHTTPHeaders: {
            blobContentType: mime,
            blobContentDisposition: `attachment; filename="${originalName}"`
        }
    })
    return blockBlob.url
}

// Generate a short-lived SAS URL so even if container is private, user can download
function generateSasUrl(blockBlob) {
    const now = new Date()
    const expiry = new Date(now.getTime() + 15 * 60 * 1000) // 15min
    const sas = generateBlobSASQueryParameters({
        containerName: blockBlob.containerName,
        blobName: blockBlob.name,
        expiresOn: expiry,
        permissions: BlobSASPermissions.parse('r')
    }, container.credential)
    return blockBlob.url + '?' + sas.toString()
}

app.get('/health', (req, res) => res.json({ status: 'OK' }))

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
        const blobName = Date.now() + '-' + req.file.originalname
        const url = await uploadToAzure(req.file.buffer, blobName, req.file.mimetype, req.file.originalname)
        const record = await File.create({
            ownerId: req.body.ownerId,
            blobUrl: url,
            filename: req.file.originalname
        })
        res.status(201).json(record)
    } catch {
        res.status(500).json({ error: 'File Service Error' })
    }
})

app.get('/', async (req, res) => {
    try {
        const files = await File.findAll({ order: [['id','DESC']] })
        res.json(files)
    } catch {
        res.status(500).json({ error: 'File Service Error' })
    }
})

// Download endpoint -> generate SAS URL + redirect
app.get('/:id/download', async (req, res) => {
    try {
        const f = await File.findByPk(req.params.id)
        if (!f) return res.status(404).json({ error: 'File not found' })
        const blobName = f.blobUrl.split('/').pop()
        const blockBlob = container.getBlockBlobClient(blobName)
        const sasUrl = generateSasUrl(blockBlob)
        res.redirect(sasUrl)
    } catch {
        res.status(500).json({ error: 'Download Error' })
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const f = await File.findByPk(req.params.id)
        if (!f) return res.status(404).json({ error: 'File not found' })

        await f.destroy()
        res.json({ message: 'File deleted' })
    } catch {
        res.status(500).json({ error: 'Delete Error' })
    }
})

app.listen(4005, () => console.log('File Service on port 4005'))
