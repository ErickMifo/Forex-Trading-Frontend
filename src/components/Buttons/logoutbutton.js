/* eslint-disable react/prop-types */
import React from 'react';
import { signOut } from 'next-auth/client';
import styles from '../../../styles/components/logoutbutton.module.css';

function LogOutButton({ children }) {
  return (
    <button
      onClick={() => signOut()}
      className={styles.logoutbutton}
      type="button"
    >

      {children}

    </button>
  );
}

export default LogOutButton;
