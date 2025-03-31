import React, { useState } from 'react';
import { createAccount } from '../services/accountService';

function AccountFormModal({ setAccounts, setError, closeModal }) {
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('savings');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const accountOptions = [
    { value: 'savings', label: 'Savings Account', description: 'High interest, limited withdrawals' },
    { value: 'checking', label: 'Checking Account', description: 'Daily use, no limits' },
    { value: 'investment', label: 'Investment Account', description: 'Grow your wealth' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLocalError('');

    try {
      const newAccount = await createAccount({ name, type: accountType });
      setAccounts((prev) => [...prev, newAccount]);
      closeModal();
    } catch (err) {
      const errorMsg = 'Failed to create account. Please try again.';
      setLocalError(errorMsg);
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Account</h2>

        {localError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{localError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="e.g., My Savings"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              disabled={isSubmitting}
            >
              {accountOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="w-full p-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 rounded-md text-white font-medium transition-colors ${
                isSubmitting ? 'bg-green-300' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountFormModal;