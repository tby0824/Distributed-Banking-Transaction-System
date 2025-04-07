import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'
import { decodeToken } from '../utils/decodeToken'

export default function NavBar() {
    const { token, clearToken } = useAuth()
    const navigate = useNavigate()
    if (!token) return null
    const user = decodeToken(token)
    const logout = () => {
        clearToken()
        navigate('/auth')
    }
    return (
        <nav className="bg-white shadow mb-4">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="space-x-4 flex items-center">
                    <span className="text-gray-700 font-semibold">Hello, {user?.email || 'User'}</span>
                    <Link to="/accounts" className="text-gray-700 hover:text-black">Accounts</Link>
                    <Link to="/transactions" className="text-gray-700 hover:text-black">Transactions</Link>
                    <Link to="/notifications" className="text-gray-700 hover:text-black">Notifications</Link>
                    <Link to="/fileupload" className="text-gray-700 hover:text-black">FileUpload</Link>
                </div>
                <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
            </div>
        </nav>
    )
}
