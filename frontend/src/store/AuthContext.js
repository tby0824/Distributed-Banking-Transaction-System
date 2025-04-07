import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const saveToken = (tk) => {
        localStorage.setItem('token', tk)
        setToken(tk)
    }
    const clearToken = () => {
        localStorage.removeItem('token')
        setToken('')
    }
    return (
        <AuthContext.Provider value={{ token, saveToken, clearToken }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)
