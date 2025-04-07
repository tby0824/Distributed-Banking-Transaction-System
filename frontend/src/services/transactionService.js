import { apiFetch } from '../utils/api'
export const getTransactions = () => apiFetch('/transactions')
export const createTransaction = (data) => apiFetch('/transactions/transfer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
