import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import Loginform from '../src/components/loginform';
import styles from '../styles/login.module.css';
import { ptBR, enUS } from '../i18n';

export default function Login() {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === 'pt-BR' ? ptBR : enUS;

  return (
    <>
      <Head>
        <title>{translation.formTitle}</title>
      </Head>
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
    </>
  );
}
