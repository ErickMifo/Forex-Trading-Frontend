import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Loginform from '../src/components/loginform';
import styles from '../styles/home.module.css';
import { ptBR, enUS } from '../i18n';
import TransactionProvider from '../src/context/transactioncontext';
import History from '../src/components/history';
import DashBoard from '../src/components/dashboard';
import Queue from '../src/components/queue';

export default function Login() {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === 'pt-BR' ? ptBR : enUS;
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>{translation.formTitle}</title>
      </Head>
      {session ? (
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
              logout={translation.logout}
              from={translation.from}
            />
            <Queue done={translation.done} processing={translation.processing} />
          </div>
        </TransactionProvider>
      )
        : (
          <div className={styles.loginContainer}>
            <div>
              <h1> Module 2</h1>
              <p> A Forex Trading Application </p>
            </div>
            <Loginform
              Entrar={translation.enter}
              Create={translation.create}
              Password={translation.password}
            />
          </div>
        ) }
    </>
  );
}
