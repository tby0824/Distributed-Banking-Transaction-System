import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';
import { getTransactions } from '../services/transactionService';
import { getAccounts } from '../services/accountService';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [notification, setNotification] = useState('');
  const [error, setError] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialTransactions = getTransactions();
        setTransactions(initialTransactions);
        const accountData = await getAccounts();
        setAccounts(accountData);
      } catch (err) {
        setError('Failed to load transactions.');
      }
    };
    fetchData();
  }, []);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const handleViewDetails = (tx) => {
    setSelectedTransaction(tx);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Transactions</h1>
          <button
            onClick={() => navigate('/accounts')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Accounts
          </button>
        </div>

        {/* Error and Notification */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}
        {notification && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">{notification}</div>
        )}

        {/* Main Layout: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: New Transaction */}
          <div className="lg:col-span-1">
            <TransactionForm
              setTransactions={setTransactions}
              setError={setError}
              setNotification={setNotification}
            />
          </div>

          {/* Right Column: Transaction History and Balance Flow */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Transaction History */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h3>
              {transactions.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No transactions yet. Start by adding one above!
                </div>
              ) : (
                <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {transactions.map((tx) => (
                    <li
                      key={tx.id}
                      className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <span className="text-lg font-medium text-gray-800">
                          {tx.fromAccount} → {tx.toAccount}
                        </span>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {tx.reason || 'No reason provided'} -{' '}
                          {tx.description?.length > 30
                            ? `${tx.description.substring(0, 30)}...`
                            : tx.description || 'No description'}
                        </p>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <span
                          className={`text-lg font-semibold ${
                            tx.type === 'debit' ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {tx.type === 'debit' ? '-' : '+'}${tx.amount}
                        </span>
                        <button
                          onClick={() => handleViewDetails(tx)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Balance Flow */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Balance Flow</h3>
              <div className="text-lg font-medium text-gray-800 mb-4">
                Total Balance: <span className="text-green-600">${totalBalance.toFixed(2)}</span>
              </div>
              <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {accounts.map((acc) => (
                  <li key={acc.id} className="text-sm text-gray-600 p-2 bg-gray-50 rounded-lg">
                    {acc.name} ({acc.type}): ${acc.balance.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal for Transaction Details */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Transaction Details</h3>
              <div className="space-y-3">
                <p><strong>From:</strong> {selectedTransaction.fromAccount}</p>
                <p><strong>To:</strong> {selectedTransaction.toAccount}</p>
                <p><strong>Amount:</strong> {selectedTransaction.type === 'debit' ? '-' : '+'}${selectedTransaction.amount}</p>
                <p><strong>Type:</strong> {selectedTransaction.type}</p>
                <p><strong>Reason:</strong> {selectedTransaction.reason || 'N/A'}</p>
                <p><strong>Status:</strong> {selectedTransaction.status}</p>
                <div>
                  <p className="font-semibold">Description:</p>
                  <div className="mt-2 p-2 bg-gray-100 rounded max-h-40 overflow-y-auto whitespace-pre-wrap break-words">
                    {selectedTransaction.description || 'No description provided'}
                  </div>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="mt-4 w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;