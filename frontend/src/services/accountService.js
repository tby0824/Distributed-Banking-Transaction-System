import { apiFetch } from '../utils/api'

export const getAccounts = () => apiFetch('/accounts')

export const createAccount = (data) => apiFetch('/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})

export const updateAccountBalance = (accountId, amount) => apiFetch(`/accounts/${accountId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
})

export const deleteAccount = (accountId) => apiFetch(`/accounts/${accountId}`, { method: 'DELETE' })
