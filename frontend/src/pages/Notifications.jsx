import React, { useState, useEffect } from 'react'
import { apiFetch } from '../utils/api'
import { subscribeToNotifications } from '../services/notificationService'
import { useToast } from '../store/ToastContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'
import { decodeToken } from '../utils/decodeToken'

export default function Notifications() {
    const [notes, setNotes] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const toast = useToast()
    const { token } = useAuth()
    const user = decodeToken(token)

    useEffect(() => {
        if (!user) return
        loadNotes()
        subscribeToNotifications(n => {
            if (n.userId === user.id) {
                setNotes(prev => [n, ...prev])
                toast('New notification', 'success')
            }
        })
    }, [user])

    const loadNotes = async () => {
        try {
            const data = await apiFetch('/notifications')
            const filtered = data.filter(x => x.userId === user.id)
            setNotes(filtered)
        } catch (e) {
            setError(e.message)
        }
    }

    if (!user) {
        return (
            <div className="p-6">
                <p>Please login first</p>
            </div>
        )
    }

    if (notes.length === 0) {
        return (
            <div className="p-6">
                <button onClick={() => navigate('/accounts')} className="mb-4 text-blue-500">← Back to Accounts</button>
                <h1 className="text-2xl">Notifications</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <p className="text-gray-500">No notifications found</p>
            </div>
        )
    }

    return (
        <div className="p-6">
            <button onClick={() => navigate('/accounts')} className="mb-4 text-blue-500">← Back to Accounts</button>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <ul>
                {notes.map(n => (
                    <li key={n.id} className="border p-4 mb-2">
                        <p><strong>{n.type}</strong></p>
                        <p>{n.message}</p>
                        <p className="text-sm text-gray-500">
                            Created: {n.createdAt ? new Date(n.createdAt).toLocaleString() : 'N/A'}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
