import React, { useState } from 'react';
import styles from '../../styles/components/Wallet.module.css';
import { useTransaction } from '../context/transactionContext';
import WalltetButton from './Buttons/WalletButton';
import Input from './Input';

/* eslint-disable react/prop-types */
function Wallet({
  onClick, toDeposit, confirm, select, wallet,
}) {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');

  const {
    walletGBP,
    walletUSD,
    setWalletGBP,
    setWalletUSD,
  } = useTransaction();

  const handleChange = (e) => { setInputValue(e.target.value); };
  const handleClick = () => {
    if (selected === 'GBP') {
      setWalletGBP(parseFloat(walletGBP) + parseFloat(inputValue));
    } else if (selected === 'USD') {
      setWalletUSD(parseFloat(walletUSD) + parseFloat(inputValue));
    }
  };

  return (
    <div className={styles.walletContainer}>
      <div className={styles.moreOpacity}>
        <button className={styles.exitButton} type="button" onClick={onClick}>x</button>
        <h3>
          {' '}
          {wallet}
          {' '}
        </h3>
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
          <select
            className={styles.select}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          >
            <option value="">{select}</option>
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
          </select>
          <Input placeholder={toDeposit} type="number" value={inputValue} onChange={handleChange} />
          <WalltetButton
            disabled={(!!(inputValue === '' || inputValue <= 0) || selected === '')}
            onClick={handleClick}
          >
            {confirm}
          </WalltetButton>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
