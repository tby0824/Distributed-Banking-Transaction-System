import { apiFetch } from '../utils/api'

export const uploadFile = async (file, ownerId) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('ownerId', ownerId)
    const res = await fetch('/files/upload', { method: 'POST', body: formData })
    if (!res.ok) {
        const e = await res.json().catch(() => null)
        throw new Error(e?.error || 'Upload failed')
    }
    return res.json()
}

export const getFiles = () => apiFetch('/files')

export const deleteFile = (id) => apiFetch(`/files/${id}`, { method: 'DELETE' })

export const createDownloadUrl = (id) => `/files/${id}/download`
