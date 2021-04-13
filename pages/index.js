import React from 'react';
import styles from '../styles/Home.module.css';
import TransactionProvider from '../src/context/transactionContext';
import History from '../src/components/History';
import DashBoard from '../src/components/DashBoard';

export default function Home() {
  return (
    <TransactionProvider>
      <div className={styles.App}>
        <History />
        <DashBoard />
      </div>
    </TransactionProvider>
  );
}
