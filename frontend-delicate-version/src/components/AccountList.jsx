import React, { useState } from 'react';
import { deleteAccount, getTransactionHistory, transferFunds, getAccounts } from '../services/accountService';

function AccountList({ accounts, onAccountsChange, onError }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [history, setHistory] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [transferAccountId, setTransferAccountId] = useState('');
  const [loadingAction, setLoadingAction] = useState(null);

  const handleViewHistory = async (accountId) => {
    try {
      setLoadingAction('history');
      const transactions = await getTransactionHistory(accountId);
      setSelectedAccount(accountId);
      setHistory(transactions);
    } catch (err) {
      onError('Failed to load transaction history: ' + err.message);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleHideHistory = () => {
    setSelectedAccount(null);
    setHistory([]);
  };

  const handleDelete = async (accountId) => {
    const account = accounts.find((acc) => acc.id === accountId);
    if (account.balance > 0) {
      setShowDeleteModal(accountId);
      setTransferAccountId('');
    } else {
      try {
        setLoadingAction('delete');
        await deleteAccount(accountId);
        const updatedAccounts = await getAccounts();
        onAccountsChange(updatedAccounts);
      } catch (err) {
        onError('Failed to delete account: ' + err.message);
      } finally {
        setLoadingAction(null);
      }
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setLoadingAction('delete');
      const account = accounts.find((acc) => acc.id === showDeleteModal);
      if (!account) throw new Error('Account to delete not found');

      if (transferAccountId) {
        await transferFunds(showDeleteModal, Number(transferAccountId), account.balance);
      }
      await deleteAccount(showDeleteModal);
      const updatedAccounts = await getAccounts();
      onAccountsChange(updatedAccounts);
      setShowDeleteModal(null);
      setTransferAccountId('');
    } catch (err) {
      onError(`Failed to process deletion or transfer funds: ${err.message}`);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="mt-6">
      {accounts.length === 0 ? (
        <div className="p-6 bg-white rounded-xl shadow-md text-center text-gray-500">
          No accounts yet. Add one to get started!
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all min-h-[150px]"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-semibold text-gray-800 block">{account.name}</span>
                  <span className="text-sm text-gray-500 capitalize">{account.type}</span>
                </div>
                <span className="text-xl font-bold text-green-600">${account.balance.toFixed(2)}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleViewHistory(account.id)}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                  disabled={loadingAction === 'history'}
                >
                  {loadingAction === 'history' ? 'Loading...' : 'View History'}
                </button>
                <button
                  onClick={() => handleDelete(account.id)}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                  disabled={loadingAction === 'delete'}
                >
                  {loadingAction === 'delete' ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Transaction History - {accounts.find((acc) => acc.id === selectedAccount)?.name}
              </h4>
              <button
                onClick={handleHideHistory}
                className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 text-sm"
              >
                Hide
              </button>
            </div>
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">No transactions yet.</p>
            ) : (
              <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {history.map((tx) => (
                  <li key={tx.id} className="text-sm text-gray-600">
                    {tx.date} - {tx.type === 'debit' ? '-' : '+'}${tx.amount} ({tx.description})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Delete Account</h3>
            <p className="text-gray-600 mb-4">
              This account has a balance of $
              {accounts.find((acc) => acc.id === showDeleteModal)?.balance.toFixed(2)}. Please transfer
              the funds before deleting.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer to:
              </label>
              <select
                value={transferAccountId}
                onChange={(e) => setTransferAccountId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select an account</option>
                {accounts
                  .filter((acc) => acc.id !== showDeleteModal)
                  .map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} (${acc.balance.toFixed(2)})
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="w-full p-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={!transferAccountId || loadingAction === 'delete'}
                className={`w-full p-3 rounded-md text-white font-medium transition-colors ${
                  !transferAccountId || loadingAction === 'delete'
                    ? 'bg-gray-400'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {loadingAction === 'delete' ? 'Processing...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountList;