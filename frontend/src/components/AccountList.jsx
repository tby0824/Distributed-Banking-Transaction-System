import React from 'react';

function AccountList({ accounts }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Account List</h3>
      <ul className="space-y-2">
        {accounts.map((account) => (
          <li key={account.id} className="p-2 bg-white rounded shadow">
            {account.name} - Balance: ${account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountList;