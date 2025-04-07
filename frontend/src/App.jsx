import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Accounts from './pages/Accounts'
import Transactions from './pages/Transactions'
import Notifications from './pages/Notifications'
import FileUpload from './pages/FileUpload'
import ProtectedRoute from './components/ProtectedRoute'
import NavBar from './components/NavBar'

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
                <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                <Route path="/fileupload" element={<ProtectedRoute><FileUpload /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    )
}
