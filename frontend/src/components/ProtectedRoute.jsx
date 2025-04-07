import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

export default function ProtectedRoute({ children }) {
    const { token } = useAuth()
    return token ? children : <Navigate to="/auth" replace />
}
