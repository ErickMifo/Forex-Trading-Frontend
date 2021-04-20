/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/newuser.module.css';

function loginform({
  Password, ConfirmPassword, Create, alreadyHave, signup,
}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleAlreadyHaveClick = (e) => {
    e.preventDefault();
    router.push('http://localhost:3000/');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmChange = (e) => {
    setConfirm(e.target.value);
  };

  return (
    <div className={styles.newuserContainer}>
      <div className={styles.newuserHeader}>
        <h2>{signup}</h2>
      </div>
      <input value={email} onChange={handleEmailChange} placeholder="Email" />
      <input value={password} onChange={handlePasswordChange} placeholder={Password} />
      <input value={confirm} onChange={handleConfirmChange} placeholder={ConfirmPassword} />
      <button disabled={!email || !password || !confirm || confirm !== password} type="button">
        {' '}
        {Create}
        {' '}
      </button>
      <button onClick={handleAlreadyHaveClick} type="button">
        {' '}
        {alreadyHave}
        {' '}
      </button>
    </div>
  );
}

export default loginform;
