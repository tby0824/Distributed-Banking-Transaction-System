import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccounts, createAccount, deleteAccount, updateAccountBalance } from '../services/accountService'
import { useToast } from '../store/ToastContext'
import { useAuth } from '../store/AuthContext'
import { decodeToken } from '../utils/decodeToken'

export default function Accounts() {
    const [accounts, setAccounts] = useState([])
    const [error, setError] = useState('')
    const [newAcct, setNewAcct] = useState('')
    const [depositAmounts, setDepositAmounts] = useState({})
    const [withdrawAmounts, setWithdrawAmounts] = useState({})
    const toast = useToast()
    const navigate = useNavigate()
    const { token } = useAuth()
    const user = decodeToken(token)

    useEffect(() => {
        if (!user) return
        loadAccounts()
    }, [user])

    const loadAccounts = async () => {
        try {
            const all = await getAccounts()
            const filtered = all.filter(a => a.userId === user.id)
            setAccounts(filtered)
        } catch (e) {
            setError(e.message)
        }
    }

    const handleCreate = async () => {
        setError('')
        if (!user) return
        if (!newAcct.trim()) {
            setError('Account number required')
            return
        }
        try {
            await createAccount({ userId: user.id, accountNumber: newAcct })
            toast('Account created', 'success')
            setNewAcct('')
            loadAccounts()
        } catch (e) {
            setError(e.message)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete this account?')) return
        try {
            await deleteAccount(id)
            toast('Account deleted', 'success')
            loadAccounts()
        } catch (e) {
            setError(e.message)
        }
    }

    const handleDeposit = async (id) => {
        const amt = Number(depositAmounts[id])
        if (amt <= 0) {
            setError('Deposit must be > 0')
            return
        }
        try {
            await updateAccountBalance(id, amt)
            toast('Deposit successful', 'success')
            setDepositAmounts(prev => ({ ...prev, [id]: '' }))
            loadAccounts()
        } catch (e) {
            setError(e.message)
        }
    }

    const handleWithdraw = async (id) => {
        const amt = Number(withdrawAmounts[id])
        if (amt <= 0) {
            setError('Withdraw must be > 0')
            return
        }
        try {
            await updateAccountBalance(id, -amt)
            toast('Withdrawal successful', 'success')
            setWithdrawAmounts(prev => ({ ...prev, [id]: '' }))
            loadAccounts()
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

    if (accounts.length === 0) {
        return (
            <div className="p-6">
                <button onClick={() => navigate('/')} className="mb-4 text-blue-500">← Home</button>
                <h1 className="text-2xl">No accounts yet</h1>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <div className="mt-4 flex gap-2">
                    <input
                        value={newAcct}
                        onChange={e => setNewAcct(e.target.value)}
                        placeholder="Account Number"
                        className="border p-2"
                    />
                    <button onClick={handleCreate} className="bg-green-500 text-white p-2 rounded">Add</button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6">
            <button onClick={() => navigate('/')} className="mb-4 text-blue-500">← Back to Home</button>
            <h1 className="text-3xl font-bold mb-4">Accounts</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4 flex gap-2">
                <input
                    value={newAcct}
                    onChange={e => setNewAcct(e.target.value)}
                    placeholder="Account Number"
                    className="border p-2 flex-1"
                />
                <button onClick={handleCreate} className="bg-green-500 text-white p-2 rounded">Add</button>
            </div>
            <ul>
                {accounts.map(a => (
                    <li key={a.id} className="border p-4 mb-4">
                        <p className="font-semibold">ID {a.id}: {a.accountNumber}</p>
                        <p>Balance: ${a.balance}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <input
                                type="number"
                                placeholder="Deposit"
                                value={depositAmounts[a.id] || ''}
                                onChange={e => setDepositAmounts(prev => ({ ...prev, [a.id]: e.target.value }))}
                                className="border p-1 w-24"
                            />
                            <button onClick={() => handleDeposit(a.id)} className="bg-blue-500 text-white p-1 rounded">Deposit</button>

                            <input
                                type="number"
                                placeholder="Withdraw"
                                value={withdrawAmounts[a.id] || ''}
                                onChange={e => setWithdrawAmounts(prev => ({ ...prev, [a.id]: e.target.value }))}
                                className="border p-1 w-24"
                            />
                            <button onClick={() => handleWithdraw(a.id)} className="bg-yellow-500 text-white p-1 rounded">Withdraw</button>

                            <button onClick={() => navigate('/transactions', { state: { fromAccountId: a.id } })}
                                    className="bg-indigo-500 text-white p-1 rounded"
                            >
                                Transfer
                            </button>
                            <button onClick={() => navigate('/notifications')} className="bg-purple-500 text-white p-1 rounded">
                                Notifications
                            </button>
                            <button onClick={() => navigate('/fileupload')} className="bg-pink-500 text-white p-1 rounded">
                                File Upload
                            </button>
                            <button onClick={() => handleDelete(a.id)} className="bg-red-500 text-white p-1 rounded">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
