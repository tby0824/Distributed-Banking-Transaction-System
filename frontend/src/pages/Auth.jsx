import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../services/authService'
import { useAuth } from '../store/AuthContext'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { saveToken } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      let result
      if (isLogin) {
        result = await login(email, password)
      } else {
        await register(email, password)
        result = await login(email, password)
      }
      saveToken(result.token)
      navigate('/accounts')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border p-2 mb-4 w-full"
              required
              disabled={loading}
          />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border p-2 mb-4 w-full"
              required
              disabled={loading}
          />
          <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
              disabled={loading}
          >
            {loading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
          </button>
          <p className="mt-4 text-center">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span onClick={() => setIsLogin(!isLogin)} className="text-blue-500 cursor-pointer">
            {isLogin ? 'Register' : 'Login'}
          </span>
          </p>
        </form>
      </div>
  )
}
