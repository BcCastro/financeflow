import React, { createContext, useState, useEffect } from 'react';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const localData = localStorage.getItem('finance_transactions');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID()
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <FinanceContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </FinanceContext.Provider>
  );
};
