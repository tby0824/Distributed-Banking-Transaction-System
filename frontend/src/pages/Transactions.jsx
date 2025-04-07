import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTransactions, createTransaction } from '../services/transactionService'
import { getAccounts } from '../services/accountService'
import { useToast } from '../store/ToastContext'
import { useAuth } from '../store/AuthContext'
import { decodeToken } from '../utils/decodeToken'

export default function Transactions() {
    const [txs, setTxs] = useState([])
    const [accs, setAccs] = useState([])
    const [error, setError] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [amt, setAmt] = useState('')
    const toast = useToast()
    const loc = useLocation()
    const nav = useNavigate()
    const { token } = useAuth()
    const user = decodeToken(token)

    useEffect(() => {
        if (!user) return
        loadData()
    }, [user])

    const loadData = async () => {
        try {
            const [allTx, allAcc] = await Promise.all([getTransactions(), getAccounts()])
            const userAccts = allAcc.filter(a => a.userId === user.id).map(x => x.id)
            const filteredTx = allTx.filter(t => userAccts.includes(t.fromAccountId) || userAccts.includes(t.toAccountId))
            setTxs(filteredTx)
            const myAccounts = allAcc.filter(a => a.userId === user.id)
            setAccs(myAccounts)
            if (loc.state?.fromAccountId) setFrom(loc.state.fromAccountId)
        } catch (e) {
            setError(e.message)
        }
    }

    const handleTransfer = async (e) => {
        e.preventDefault()
        setError('')
        if (!from || !to) {
            setError('Please select accounts')
            return
        }
        if (from === to) {
            setError('From and To cannot be the same')
            return
        }
        if (Number(amt) <= 0) {
            setError('Amount must be > 0')
            return
        }
        try {
            await createTransaction({ fromAccountId: from, toAccountId: to, amount: amt })
            toast('Transfer completed', 'success')
            await loadData()
            setFrom('')
            setTo('')
            setAmt('')
        } catch (err) {
            setError(err.message)
        }
    }

    if (!user) {
        return (
            <div className="p-6">
                <p>Please login first</p>
            </div>
        )
    }

    if (txs.length === 0) {
        return (
            <div className="p-6">
                <button onClick={() => nav('/accounts')} className="mb-4 text-blue-500">← Back to Accounts</button>
                <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
                <p className="text-sm text-gray-600 mb-4">Transfer money between your accounts</p>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <p className="text-gray-500">No transactions found</p>
                <form onSubmit={handleTransfer} className="mt-4 flex gap-2 flex-wrap">
                    <select value={from} onChange={e => setFrom(e.target.value)} className="border p-2">
                        <option value="">From</option>
                        {accs.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.accountNumber} (Balance: ${a.balance})
                            </option>
                        ))}
                    </select>
                    <select value={to} onChange={e => setTo(e.target.value)} className="border p-2">
                        <option value="">To</option>
                        {accs.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.accountNumber} (Balance: ${a.balance})
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amt}
                        onChange={e => setAmt(e.target.value)}
                        className="border p-2 w-28"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Send
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div className="p-6">
            <button onClick={() => nav('/accounts')} className="mb-4 text-blue-500">← Back to Accounts</button>
            <h1 className="text-3xl font-bold mb-2">Transactions</h1>
            <p className="text-sm text-gray-600 mb-4">Transfer money between your accounts</p>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleTransfer} className="mb-4 flex gap-2 flex-wrap">
                <select value={from} onChange={e => setFrom(e.target.value)} className="border p-2">
                    <option value="">From</option>
                    {accs.map(a => (
                        <option key={a.id} value={a.id}>
                            {a.accountNumber} (Balance: ${a.balance})
                        </option>
                    ))}
                </select>
                <select value={to} onChange={e => setTo(e.target.value)} className="border p-2">
                    <option value="">To</option>
                    {accs.map(a => (
                        <option key={a.id} value={a.id}>
                            {a.accountNumber} (Balance: ${a.balance})
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amt}
                    onChange={e => setAmt(e.target.value)}
                    className="border p-2 w-28"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Send
                </button>
            </form>

            <ul>
                {txs.map(tx => (
                    <li key={tx.id} className="border p-4 mb-2 flex flex-col gap-1">
                        <p>Transaction #{tx.id}: {tx.fromAccountId} → {tx.toAccountId}</p>
                        <p>Amount: ${tx.amount}, Status: {tx.status}</p>
                        <p className="text-sm text-gray-500">
                            Created: {tx.createdAt ? new Date(tx.createdAt).toLocaleString() : 'N/A'}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
