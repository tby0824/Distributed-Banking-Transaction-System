let transactions = [
    { id: 1, fromAccount: 'Checking', toAccount: 'Savings', amount: 100, status: 'Completed' },
  ];
  
  export const getTransactions = () => transactions;
  
  export const createTransaction = (fromAccount, toAccount, amount) => {
    const newTransaction = {
      id: transactions.length + 1,
      fromAccount,
      toAccount,
      amount: Number(amount),
      status: 'Completed',
    };
    transactions.push(newTransaction);
    return newTransaction;
  };