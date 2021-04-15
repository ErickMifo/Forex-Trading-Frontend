import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import TransactionProvider from '../src/context/transactionContext';
import History from '../src/components/History';
import DashBoard from '../src/components/DashBoard';
import { ptBR, enUS } from '../i18n';
import Queue from '../src/components/Queue';

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === 'pt-BR' ? ptBR : enUS;

  return (
    <TransactionProvider>
      <Head>
        <title>WestPoint Module 2</title>
      </Head>
      <div className={styles.App}>
        <History past={translation.past} />
        <DashBoard
          base={translation.base}
          wallet={translation.wallet}
          buy={translation.buy}
          toBuy={translation.toBuy}
          toDeposit={translation.toDeposit}
          select={translation.select}
          confirm={translation.confirm}
        />
        <Queue done={translation.done} processing={translation.processing} />
      </div>
    </TransactionProvider>
  );
}
