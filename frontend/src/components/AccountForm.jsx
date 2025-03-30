import React, { useState } from 'react';
import { createAccount } from '../services/accountService';

function AccountForm({ setAccounts }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAccount = createAccount(name); // Mock for now
    setAccounts((prev) => [...prev, newAccount]);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Account</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">Account Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
        Add Account
      </button>
    </form>
  );
}

export default AccountForm;