import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Distributed Banking System</h1>
      <div className="space-x-4">
        <Link to="/auth" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login/Register
        </Link>
        <Link to="/accounts" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Accounts
        </Link>
        <Link to="/transactions" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          Transactions
        </Link>
      </div>
    </div>
  );
}

export default Home;