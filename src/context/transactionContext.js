import React, { createContext, useState, useContext } from 'react';

export const TransactionContext = createContext();

// eslint-disable-next-line react/prop-types
export default function Provider({ children }) {
  const [history, setHistory] = useState([]);
  const [dbHistory, setDbHistory] = useState([]);
  const [walletGBP, setWalletGBP] = useState(0);
  const [walletUSD, setWalletUSD] = useState(0);
  const [QueueArray, setQueueArray] = useState([]);

  return (
    <TransactionContext.Provider value={{
      history,
      setHistory,
      dbHistory,
      setDbHistory,
      walletGBP,
      setWalletGBP,
      walletUSD,
      setWalletUSD,
      QueueArray,
      setQueueArray,
    }}
    >
      {children}
    </TransactionContext.Provider>

  );
}

export function useTransaction() {
  const context = useContext(TransactionContext);
  const {
    history,
    setHistory,
    dbHistory,
    setDbHistory,
    walletGBP,
    setWalletGBP,
    walletUSD,
    setWalletUSD,
    QueueArray,
    setQueueArray,
  } = context;
  return {
    history,
    setHistory,
    dbHistory,
    setDbHistory,
    walletGBP,
    setWalletGBP,
    walletUSD,
    setWalletUSD,
    QueueArray,
    setQueueArray,
  };
}
