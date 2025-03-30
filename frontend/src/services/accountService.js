let accounts = [
    { id: 1, name: 'Checking', balance: 1000 },
    { id: 2, name: 'Savings', balance: 5000 },
  ];
  
  export const getAccounts = () => accounts;
  
  export const createAccount = (name) => {
    const newAccount = { id: accounts.length + 1, name, balance: 0 };
    accounts.push(newAccount);
    return newAccount;
  };