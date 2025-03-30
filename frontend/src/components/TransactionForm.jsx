import React, { useState } from 'react';
import { createTransaction } from '../services/transactionService';

function TransactionForm({ setTransactions }) {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = createTransaction(fromAccount, toAccount, amount); // Mock
    setTransactions((prev) => [...prev, newTransaction]);
    setFromAccount('');
    setToAccount('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">New Transaction</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">From Account</label>
        <input
          type="text"
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">To Account</label>
        <input
          type="text"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
        Send
      </button>
    </form>
  );
}

export default TransactionForm;