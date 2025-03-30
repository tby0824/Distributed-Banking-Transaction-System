import React, { useEffect, useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import { getTransactions } from '../services/transactionService';
import { subscribeToNotifications } from '../services/notificationService';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setTransactions(getTransactions()); // Mock data
    subscribeToNotifications((msg) => setNotification(msg)); // WebSocket mock
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h1>
      <TransactionForm setTransactions={setTransactions} />
      {notification && (
        <p className="text-green-600 bg-green-100 p-2 rounded mb-4">{notification}</p>
      )}
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li key={tx.id} className="p-4 bg-white rounded-lg shadow">
            {tx.fromAccount} → {tx.toAccount}: ${tx.amount} ({tx.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;