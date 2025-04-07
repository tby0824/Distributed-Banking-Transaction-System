import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

export default function Home() {
    const { token } = useAuth()
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Banking System</h1>
                {!token ? (
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/auth" className="bg-blue-500 text-white p-2 rounded">Login / Register</Link>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/accounts" className="bg-green-500 text-white p-2 rounded">Accounts</Link>
                        <Link to="/transactions" className="bg-indigo-500 text-white p-2 rounded">Transactions</Link>
                        <Link to="/notifications" className="bg-purple-500 text-white p-2 rounded">Notifications</Link>
                        <Link to="/fileupload" className="bg-pink-500 text-white p-2 rounded">File Upload</Link>
                    </div>
                )}
            </div>
        </div>
    )
}
