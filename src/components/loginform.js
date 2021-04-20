import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/loginform.module.css';

function loginform({
  Entrar, Create, Password,
}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = (e) => {
    e.preventDefault();
    router.push('home');
  };

  const handleCreateClick = (e) => {
    e.preventDefault();
    router.push('newAccount');
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const hanldeChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  return (
    <div className={styles.loginformContainer}>
      <input value={email} onChange={handleChangeEmail} placeholder="Email" />
      <input value={password} onChange={hanldeChangePassword} placeholder={Password} />
      <button disabled={!email || !password} onClick={handleLoginClick} type="button">
        {' '}
        {Entrar}
        {' '}
      </button>
      <div className={styles.newAccount}>
        <button onClick={handleCreateClick} type="button">
          {' '}
          {Create}
          {' '}
        </button>
      </div>
    </div>
  );
}

export default loginform;
