import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from '../../styles/components/DashBoard.module.css';
import instance from '../axios/axios';
import { useTransaction } from '../context/transactionContext';
import Input from './Input';
import Graph from './Graph';
import BuyButton from './Buttons/BuyButton';
import WalltetButton from './Buttons/WalletButton';
import Wallet from './Wallet';

let socket;

function DashBoard() {
  const {
    history,
    setHistory,
    walletGBP,
    walletUSD,
    setWalletGBP,
    setWalletUSD,
  } = useTransaction();

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const onOpen = () => {
    setIsWalletOpen(true);
  };
  const onClose = () => {
    setIsWalletOpen(false);
  };

  const [USD, setUSD] = useState('');
  const [GBP, setGBP] = useState('');

  // since the value is started as a string, need to use parseFloat() in the future.
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue1, setInputValue1] = useState('');

  // getting data from my own api.
  useEffect(() => {
    async function getData() {
      const request = await instance.get('currency');
      if (request.data[0].currency_id === 1) {
        setUSD(request.data[0].usd);
      } else {
        setGBP(request.data[0].gbp);
      }
      if (request.data[1].currency_id === 2) {
        setGBP(request.data[1].gbp);
      } else {
        setUSD(request.data[1].usd);
      }
      const walletRequest = await instance.get('wallet');
      setWalletUSD(walletRequest.data[0].usd);
      setWalletGBP(walletRequest.data[0].gbp);
    }

    getData();
  }, []);

  const roundUSD = Math.round(USD * 1000) / 1000;
  const roundGBP = Math.round(GBP * 1000) / 1000;

  // update GBP and USD values with socket.io.
  const ENDPOINT = 'http://localhost:3001/';

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('GBPUSD', (arg) => {
      setUSD(arg.GBP_USD);
      setGBP(1 / arg.GBP_USD);
    });
  }, [ENDPOINT]);

  // prevent USD and GBP values to be saved with wrong values.
  if ((USD && GBP !== '') && (!Number.isNaN(GBP) || !Number.isNaN(USD))) {
    instance.put('currency/2', { gbp: roundGBP });
    instance.put('currency/1', { usd: roundUSD });
  }

  // Update USD and GBP wallet values on mongodb when they change.
  useEffect(() => {
    if (walletGBP && walletUSD !== 0) {
      instance.put('wallet/1', { gbp: walletGBP, usd: walletUSD });
    }
  }, [walletUSD, walletGBP]);

  const handleChange2 = (e) => { setInputValue2(e.target.value); };
  const handleChange1 = (e) => { setInputValue1(e.target.value); };

  const handleClick1 = () => {
    setWalletGBP(parseFloat(walletGBP) + parseFloat(inputValue1));
    setWalletUSD(parseFloat(walletUSD) - Math.round(roundUSD * inputValue1 * 1000) / 1000);
    setHistory([...history, `Buy ${inputValue1} GBP for ${Math.round(roundUSD * inputValue1 * 1000) / 1000} USD`]);
    instance.post('history', {
      history_content: `Buy ${inputValue1} GBP for ${Math.round(roundUSD * inputValue1 * 1000) / 1000} USD`,
    });
  };

  const handleClick2 = () => {
    setWalletUSD(parseFloat(walletUSD) + parseFloat(inputValue2));
    setWalletGBP(parseFloat(walletGBP) - Math.round(roundGBP * inputValue2 * 1000) / 1000);
    setHistory([...history, `Buy ${inputValue2} USD for ${Math.round(roundGBP * inputValue2 * 1000) / 1000} GBP`]);
    instance.post('history', {
      history_content: `Buy ${inputValue2} USD for ${Math.round(roundGBP * inputValue2 * 1000) / 1000} GBP`,
    });
  };

  return (
    <div className={styles.dashBoardContainer}>

      <div className={styles.graphContainer}>

        <WalltetButton onClick={onOpen}> My Wallet </WalltetButton>
        <h3> Base EUR </h3>
        {isWalletOpen ? <Wallet onClick={onClose} /> : null}

        <Graph />

      </div>

      <div className={styles.buyContainer}>

        <div>
          GBP to USD
          <Input placeholder="amount to buy" type="number" value={inputValue1} onChange={handleChange1} />
          <BuyButton
            disabled={!!(inputValue1 === '' || inputValue1 <= 0)}
            onClick={handleClick1}
            bgColor="var(--blue)"
          >
            Buy
            <p>
              {inputValue1 === '' || inputValue1 <= 0
                ? roundUSD
                : Math.round(roundUSD * inputValue1 * 1000) / 1000}
            </p>
          </BuyButton>

        </div>

        <div>
          USD to GBP
          <Input placeholder="amount to buy" type="number" value={inputValue2} onChange={handleChange2} />
          <BuyButton
            disabled={!!(inputValue2 === '' || inputValue2 <= 0)}
            onClick={handleClick2}
            bgColor="var(--blue)"
          >
            Buy
            <p>
              {inputValue2 === '' || inputValue2 <= 0
                ? roundGBP
                : Math.round(roundGBP * inputValue2 * 1000) / 1000}
            </p>
          </BuyButton>

        </div>
      </div>

    </div>
  );
}

export default DashBoard;
