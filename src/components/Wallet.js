import React, { useState } from 'react';
import styles from '../../styles/components/Wallet.module.css';
import { useTransaction } from '../context/transactionContext';
import WalltetButton from './Buttons/WalletButton';
import Input from './Input';

/* eslint-disable react/prop-types */
function Wallet({ onClick }) {
  const [inputValue, setInputValue] = useState('');

  const {
    walletGBP,
    walletUSD,
    setWalletGBP,
  } = useTransaction();

  const handleChange = (e) => { setInputValue(e.target.value); };
  const handleClick = () => {
    setWalletGBP(parseFloat(walletGBP) + parseFloat(inputValue));
    console.log(walletGBP);
  };

  return (
    <div className={styles.walletContainer}>
      <button className={styles.exitButton} type="button" onClick={onClick}>x</button>
      <h3> My Wallet </h3>
      <div>
        <h2>
          {' '}
          GBP :
          {' '}
          {walletGBP}
        </h2>
        <h2>
          {' '}
          USD :
          {' '}
          {walletUSD}
        </h2>
      </div>
      <div className={styles.form}>
        <select>
          <option value="">Select a currency</option>
          <option value="GBP">GBP</option>
          <option value="USD">USD</option>
        </select>
        <Input placeholder="amount to deposit" type="number" value={inputValue} onChange={handleChange} />
        <WalltetButton
          disabled={!!(inputValue === '' || inputValue <= 0)}
          onClick={handleClick}
        >
          Confirm
        </WalltetButton>
      </div>
    </div>
  );
}

export default Wallet;
