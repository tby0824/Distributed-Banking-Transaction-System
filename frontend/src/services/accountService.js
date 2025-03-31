let accounts = [
  { id: 1, name: 'Main Savings', balance: 1500.75, type: 'savings' },
  { id: 2, name: 'Daily Checking', balance: 320.50, type: 'checking' },
];

export const getAccounts = async () => {
  return accounts;
};

export const createAccount = async ({ name, type }) => {
  const newAccount = { id: Date.now(), name, balance: 0, type };
  accounts.push(newAccount);
  return newAccount;
};

export const updateAccountBalance = (accountName, amount, isDebit) => {
  const account = accounts.find((acc) => acc.name === accountName);
  if (account) {
    account.balance = isDebit
      ? account.balance - Number(amount)
      : account.balance + Number(amount);
  }
};

export const getTransactionHistory = async (accountId) => {
  if (accountId === 1) {
    return [
      { id: 1, date: '2025-03-28', type: 'credit', amount: 1000, description: 'Salary Deposit' },
      { id: 2, date: '2025-03-27', type: 'credit', amount: 500, description: 'Interest Earned' },
      { id: 3, date: '2025-03-26', type: 'debit', amount: 200, description: 'Transfer to Checking' },
      { id: 4, date: '2025-03-25', type: 'credit', amount: 300, description: 'Bonus Deposit' },
      { id: 5, date: '2025-03-24', type: 'debit', amount: 50, description: 'ATM Withdrawal' },
      { id: 6, date: '2025-03-23', type: 'credit', amount: 100, description: 'Cash Deposit' },
      { id: 7, date: '2025-03-22', type: 'debit', amount: 150, description: 'Online Payment' },
    ];
  } else if (accountId === 2) {
    return [
      { id: 1, date: '2025-03-29', type: 'debit', amount: 200, description: 'Grocery Shopping' },
      { id: 2, date: '2025-03-28', type: 'credit', amount: 200, description: 'Transfer from Savings' },
      { id: 3, date: '2025-03-27', type: 'debit', amount: 75, description: 'Coffee Shop' },
      { id: 4, date: '2025-03-26', type: 'debit', amount: 120, description: 'Restaurant Bill' },
      { id: 5, date: '2025-03-25', type: 'credit', amount: 50, description: 'Refund' },
      { id: 6, date: '2025-03-24', type: 'debit', amount: 30, description: 'Gas Station' },
      { id: 7, date: '2025-03-23', type: 'debit', amount: 90, description: 'Utility Bill' },
      { id: 8, date: '2025-03-22', type: 'credit', amount: 100, description: 'Friend Payment' },
    ];
  } else {
    return [];
  }
};

export const deleteAccount = async (accountId) => {
  accounts = accounts.filter((acc) => acc.id !== accountId);
  console.log(`Deleted account ${accountId}`);
};

export const transferFunds = async (fromAccountId, toAccountId, amount) => {
  console.log(`Transferred $${amount} from ${fromAccountId} to ${toAccountId}`);
};