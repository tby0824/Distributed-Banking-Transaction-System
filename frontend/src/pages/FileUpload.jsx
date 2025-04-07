import React, { useState, useEffect } from 'react'
import { uploadFile, getFiles, deleteFile, createDownloadUrl } from '../services/fileService'
import { useToast } from '../store/ToastContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'
import { decodeToken } from '../utils/decodeToken'

export default function FileUpload() {
    const [file, setFile] = useState(null)
    const [msg, setMsg] = useState('')
    const [error, setError] = useState('')
    const [files, setFiles] = useState([])
    const toast = useToast()
    const navigate = useNavigate()
    const { token } = useAuth()
    const user = decodeToken(token)

    useEffect(() => {
        if (user) loadFiles()
    }, [user])

    const loadFiles = async () => {
        try {
            const all = await getFiles()
            const mine = all.filter(x => x.ownerId === user.id)
            setFiles(mine)
        } catch (e) {
            setError(e.message)
        }
    }

    const handleUpload = async () => {
        setError('')
        setMsg('')
        if (!file) {
            setError('Please select a file')
            return
        }
        if (!confirm('Upload this file?')) return
        try {
            const res = await uploadFile(file, user.id)
            toast('File uploaded', 'success')
            setMsg(`Uploaded: ${res.filename}`)
            setFile(null)
            loadFiles()
        } catch (e) {
            setError(e.message)
        }
    }

    const handleDelete = async (fid) => {
        if (!confirm('Delete this file?')) return
        try {
            await deleteFile(fid)
            toast('File deleted', 'success')
            loadFiles()
        } catch (err) {
            setError(err.message)
        }
    }

    if (!user) {
        return (
            <div className="p-6">
                <p>Please login first</p>
            </div>
        )
    }

    if (files.length === 0) {
        return (
            <div className="p-6">
                <button onClick={() => navigate('/accounts')} className="mb-4 text-blue-500">← Back to Accounts</button>
                <h1 className="text-2xl mb-2">File Upload</h1>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                {msg && <div className="text-green-500 mb-2">{msg}</div>}
                <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-4" />
                <button onClick={handleUpload} className="bg-pink-500 text-white p-2 rounded">Upload</button>
                <p className="mt-4 text-gray-500">No files found</p>
            </div>
        )
    }

    return (
        <div className="p-6">
            <button onClick={() => navigate('/accounts')} className="mb-4 text-blue-500">← Back to Accounts</button>
            <h1 className="text-3xl font-bold mb-2">File Upload</h1>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {msg && <div className="text-green-500 mb-2">{msg}</div>}
            <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-4" />
            <button onClick={handleUpload} className="bg-pink-500 text-white p-2 rounded mb-6">Upload</button>
            <ul>
                {files.map(f => (
                    <li key={f.id} className="border p-2 mb-2 flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{f.filename}</p>
                            <p className="text-sm text-gray-500">File ID: {f.id}</p>
                        </div>
                        <div className="flex gap-2">
                            <a
                                href={createDownloadUrl(f.id)}
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                            >
                                Download
                            </a>
                            <button
                                onClick={() => handleDelete(f.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
