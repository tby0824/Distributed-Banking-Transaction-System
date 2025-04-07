import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AuthProvider } from './store/AuthContext'
import { ToastProvider } from './store/ToastContext'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

const root = createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <AuthProvider>
            <ToastProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </ToastProvider>
        </AuthProvider>
    </React.StrictMode>
)
