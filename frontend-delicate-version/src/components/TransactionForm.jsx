import React, { useState, useEffect } from 'react';
import { createTransaction } from '../services/transactionService';
import { getAccounts, updateAccountBalance } from '../services/accountService';

function TransactionForm({ setTransactions, setError, setNotification }) {
  const [type, setType] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const typeOptions = ['transfer', 'credit', 'debit'];
  const reasonOptions = ['Daily Transfer', 'Bill Payment', 'Gift', 'Investment', 'Custom'];

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountData = await getAccounts();
        setAccounts(accountData);
      } catch (err) {
        setError('Failed to load accounts.');
      }
    };
    fetchAccounts();
  }, [setError]);

  const validateInputs = () => {
    const amountNum = Number(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      throw new Error('Amount must be a positive number.');
    }
    if (!type) {
      throw new Error('Please select a transaction type.');
    }
    if ((type === 'transfer' || type === 'debit') && !fromAccount) {
      throw new Error('Please select a source account.');
    }
    if ((type === 'transfer' || type === 'credit') && !toAccount) {
      throw new Error('Please select a destination account.');
    }
    if (type === 'transfer' && fromAccount === toAccount) {
      throw new Error('Source and destination accounts must be different.');
    }
    if (!reason) {
      throw new Error('Please select a reason.');
    }
    if (reason === 'Custom' && !customReason.trim()) {
      throw new Error('Custom reason cannot be empty.');
    }
    const fromAcc = accounts.find((acc) => acc.name === fromAccount);
    if ((type === 'transfer' || type === 'debit') && (!fromAcc || fromAcc.balance < amountNum)) {
      throw new Error('Insufficient balance in the source account.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setNotification('');

    try {
      validateInputs();
      const finalReason = reason === 'Custom' ? customReason : reason;
      const transactionData = {
        fromAccount: type === 'credit' ? 'External' : fromAccount,
        toAccount: type === 'debit' ? 'External' : toAccount,
        amount,
        reason: finalReason,
        description,
        type,
      };

      if (type === 'transfer') {
        updateAccountBalance(fromAccount, amount, true);
        updateAccountBalance(toAccount, amount, false);
      } else if (type === 'credit') {
        updateAccountBalance(toAccount, amount, false);
      } else if (type === 'debit') {
        updateAccountBalance(fromAccount, amount, true);
      }

      const newTransaction = createTransaction(transactionData);

      setTransactions((prev) => {
        if (prev.some((tx) => tx.id === newTransaction.id)) {
          return prev;
        }
        return [...prev, newTransaction];
      });
      setNotification('Transaction completed successfully!');
      setType('');
      setFromAccount('');
      setToAccount('');
      setAmount('');
      setReason('');
      setCustomReason('');
      setDescription('');
    } catch (err) {
      setError(err.message || 'Failed to create transaction.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-white rounded-xl shadow-md border border-gray-200 w-full max-w-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">New Transaction</h2>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 min-w-[250px]"
          required
        >
          <option value="">Please select</option>
          <option value="transfer">Transfer Between Accounts</option>
          <option value="credit">Add Money</option>
          <option value="debit">Withdraw Money</option>
        </select>
      </div>

      {(type === 'transfer' || type === 'debit') && (
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">From Account</label>
          <select
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 min-w-[250px]"
            required
          >
            <option value="">Please select</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.name}>
                {acc.name} (${acc.balance.toFixed(2)})
              </option>
            ))}
          </select>
        </div>
      )}

      {(type === 'transfer' || type === 'credit') && (
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">To Account</label>
          <select
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 min-w-[250px]"
            required
          >
            <option value="">Please select</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.name}>
                {acc.name} (${acc.balance.toFixed(2)})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          placeholder="Enter amount"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 min-w-[250px]"
          required
        >
          <option value="">Please select</option>
          {reasonOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {reason === 'Custom' && (
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Custom Reason</label>
          <input
            type="text"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            placeholder="Enter your reason"
            required
          />
        </div>
      )}

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 resize-y h-24 max-h-48 overflow-y-auto"
          placeholder="e.g., Bought a new phone"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || accounts.length === 0}
        className={`w-full p-3 rounded-md text-white font-medium transition-colors ${
          isSubmitting || accounts.length === 0 ? 'bg-green-300' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isSubmitting ? 'Processing...' : 'Submit Transaction'}
      </button>
    </form>
  );
}

export default TransactionForm;