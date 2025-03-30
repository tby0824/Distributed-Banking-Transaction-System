import React, { useEffect, useState } from 'react';
import AccountList from '../components/AccountList';
import AccountForm from '../components/AccountForm';
import { getAccounts } from '../services/accountService';

function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    setAccounts(getAccounts()); // Mock data for now
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Accounts</h1>
      <AccountForm setAccounts={setAccounts} />
      <AccountList accounts={accounts} />
    </div>
  );
}

export default Accounts;