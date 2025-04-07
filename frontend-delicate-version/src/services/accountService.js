import { createTransaction } from './transactionService';

let accounts = [
  { id: 1, name: 'Main Savings', balance: 1500.75, type: 'savings' },
  { id: 2, name: 'Daily Checking', balance: 320.50, type: 'checking' },
];

export const getAccounts = async () => {
  return [...accounts];
};

export const createAccount = async ({ name, type }) => {
  const newAccount = { id: Date.now(), name, balance: 0, type };
  accounts.push(newAccount);
  console.log('Created account:', newAccount);
  return { ...newAccount };
};

export const deleteAccount = async (accountId) => {
  const accountExists = accounts.some((acc) => acc.id === accountId);
  if (!accountExists) {
    throw new Error(`Account with ID ${accountId} not found`);
  }
  accounts = accounts.filter((acc) => acc.id !== accountId);
  console.log(`Deleted account ${accountId}`);
};

export const transferFunds = async (fromAccountId, toAccountId, amount) => {
  const fromAccount = accounts.find((acc) => acc.id === fromAccountId);
  const toAccount = accounts.find((acc) => acc.id === toAccountId);

  if (!fromAccount) {
    throw new Error(`Source account with ID ${fromAccountId} not found`);
  }
  if (!toAccount) {
    throw new Error(`Target account with ID ${toAccountId} not found`);
  }
  if (fromAccount.balance < amount) {
    throw new Error('Insufficient funds in source account');
  }

  fromAccount.balance -= Number(amount);
  toAccount.balance += Number(amount);

  const transferTransaction = createTransaction({
    fromAccount: fromAccount.name,
    toAccount: toAccount.name,
    amount: Number(amount),
    reason: 'Account Deletion Transfer',
    description: `Transferred funds from ${fromAccount.name} to ${toAccount.name} due to account deletion`,
    type: 'transfer',
  });

  console.log(`Transferred $${amount} from ${fromAccount.name} to ${toAccount.name}`);
  return { fromAccount, toAccount, transferTransaction };
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
  const account = accounts.find((acc) => acc.id === accountId);
  if (!account) return [];

  const { getTransactions } = await import('./transactionService');
  const allTransactions = getTransactions();

  return allTransactions
    .filter((tx) => tx.fromAccount === account.name || tx.toAccount === account.name)
    .map((tx) => ({
      id: tx.id,
      date: new Date().toISOString().split('T')[0],
      type: tx.fromAccount === account.name ? 'debit' : 'credit',
      amount: tx.amount,
      description: `${tx.reason} - ${tx.description || 'No description'}`,
    }))
    .sort((a, b) => b.id - a.id);
};