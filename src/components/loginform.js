import React from 'react';
import { signIn } from 'next-auth/client';
import styles from '../../styles/components/loginform.module.css';

function loginform({ Entrar, Create }) {
  const handleClick = () => {
    signIn('auth0');
  };

  return (
    <div className={styles.loginformContainer}>
      <button type="button" onClick={handleClick}>
        {Entrar}
        {' '}
        /
        {' '}
        {Create}
        {' '}
      </button>
    </div>
  );
}

export default loginform;
