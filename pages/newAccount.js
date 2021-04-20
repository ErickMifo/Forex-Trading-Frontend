import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ptBR, enUS } from '../i18n';
import Newuser from '../src/components/newuser';

export default function Login() {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === 'pt-BR' ? ptBR : enUS;

  return (
    <>
      <Head>
        <title>{translation.formTitle}</title>
      </Head>
      <Newuser
        Create={translation.create}
        Password={translation.password}
        ConfirmPassword={translation.confirmPassword}
        alreadyHave={translation.alreadyHave}
        signup={translation.signup}
      />
    </>
  );
}
