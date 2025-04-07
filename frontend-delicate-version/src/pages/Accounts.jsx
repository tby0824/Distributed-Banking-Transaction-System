import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountList from '../components/AccountList';
import AccountFormModal from '../components/AccountFormModal';
import { getAccounts } from '../services/accountService';

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const data = await getAccounts();
        setAccounts(data);
      } catch (err) {
        setError('Failed to load accounts. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Your Banking Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/transactions')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Transactions
            </button>
            <button
              onClick={() => navigate('/home')}
              className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all shadow-md flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v7a2 2 0 002 2h4a2 2 0 002-2v-7" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-lg font-medium">Total Balance</h2>
          <p className="text-4xl font-bold mt-2">${totalBalance.toFixed(2)}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Your Accounts</h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow"
              >
                + Add New Account
              </button>
            </div>
            <AccountList
              accounts={accounts}
              onAccountsChange={setAccounts}
              onError={setError}
            />

            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Latest Offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold text-gray-800">New Savings Plan</h4>
                  <p className="text-gray-600 mt-2">Earn up to 3.5% interest!</p>
                  <button className="mt-4 text-blue-600 font-medium hover:underline">Learn More</button>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold text-gray-800">Credit Card Upgrade</h4>
                  <p className="text-gray-600 mt-2">Get 2% cashback on all purchases.</p>
                  <button className="mt-4 text-blue-600 font-medium hover:underline">Learn More</button>
                </div>
              </div>
            </div>
          </>
        )}

        {isModalOpen && (
          <AccountFormModal
            onAccountsChange={setAccounts}
            onError={setError}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Accounts;