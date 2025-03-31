import { updateAccountBalance } from './accountService';

let transactions = [
  { id: 1, fromAccount: 'Daily Checking', toAccount: 'Main Savings', amount: 100, status: 'Completed', reason: 'Daily Transfer', description: 'Monthly savings', type: 'transfer' },
  { id: 2, fromAccount: 'Main Savings', toAccount: 'Daily Checking', amount: 50, status: 'Completed', reason: 'Bill Payment', description: 'Utility bill', type: 'transfer' },
  { id: 3, fromAccount: 'External', toAccount: 'Main Savings', amount: 200, status: 'Completed', reason: 'Gift', description: 'Birthday gift', type: 'credit' },
  { id: 4, fromAccount: 'Daily Checking', toAccount: 'External', amount: 30, status: 'Completed', reason: 'Investment', description: 'Stock purchase', type: 'debit' },
  { id: 5, fromAccount: 'Daily Checking', toAccount: 'Main Savings', amount: 75, status: 'Completed', reason: 'Daily Transfer', description: 'Weekly savings', type: 'transfer' },
  { id: 6, fromAccount: 'Main Savings', toAccount: 'Daily Checking', amount: 20, status: 'Completed', reason: 'Bill Payment', description: 'Internet bill', type: 'transfer' },
  { id: 7, fromAccount: 'External', toAccount: 'Daily Checking', amount: 150, status: 'Completed', reason: 'Gift', description: 'Holiday gift', type: 'credit' },
  { id: 8, fromAccount: 'Daily Checking', toAccount: 'External', amount: 40, status: 'Completed', reason: 'Custom', description: 'Charity donation', type: 'debit' },
];

export const getTransactions = () => transactions;

export const createTransaction = ({ fromAccount, toAccount, amount, reason, description, type }) => {
  const newTransaction = {
    id: transactions.length + 1,
    fromAccount,
    toAccount,
    amount: Number(amount),
    status: 'Completed',
    reason,
    description,
    type,
  };

  // 根据交易类型更新账户余额
  if (type === 'transfer') {
    updateAccountBalance(fromAccount, amount, true); // 减少转出账户余额
    updateAccountBalance(toAccount, amount, false); // 增加转入账户余额
  } else if (type === 'credit') {
    updateAccountBalance(toAccount, amount, false); // 增加目标账户余额
  } else if (type === 'debit') {
    updateAccountBalance(fromAccount, amount, true); // 减少源账户余额
  }

  // 只添加一次交易记录
  transactions.push(newTransaction);
  return newTransaction;
};

export const subscribeToNotifications = () => {};