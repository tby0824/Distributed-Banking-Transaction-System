import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <header className="p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Distributed Banking System</h1>
      </header>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Welcome</h2>
        <p className="text-gray-600 mb-8">Manage your accounts and transactions with ease.</p>
        <div className="flex space-x-6">
          <Link
            to="/auth"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Login/Register
          </Link>
          <Link
            to="/accounts"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          >
            Accounts
          </Link>
          <Link
            to="/transactions"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
          >
            Transactions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;