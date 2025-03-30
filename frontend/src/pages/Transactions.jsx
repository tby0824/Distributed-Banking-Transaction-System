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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      <TransactionForm setTransactions={setTransactions} />
      {notification && <p className="text-green-500 mb-4">{notification}</p>}
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li key={tx.id} className="p-2 bg-white rounded shadow">
            {tx.fromAccount} → {tx.toAccount}: ${tx.amount} ({tx.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;