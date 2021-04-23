/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import { useSession } from 'next-auth/client';
import styles from '../../styles/components/dashboard.module.css';
import instance from '../axios/axios';
import { useTransaction } from '../context/transactioncontext';
import Input from './input';
import Graph from './graph';
import BuyButton from './buttons/buybutton';
import WalltetButton from './buttons/walletbutton';
import LogOutButton from './buttons/logoutbutton';
import Wallet from './wallet';

let socket;

function DashBoard({
  wallet, toBuy, toDeposit, select, confirm, buy, logout, from,
}) {
  const {
    history,
    setHistory,
    walletGBP,
    walletUSD,
    setWalletGBP,
    setWalletUSD,
    QueueArray,
    setQueueArray,
  } = useTransaction();

  const [session] = useSession();

  const nameReplace = session.user.email.replace(/@.*$/, '');
  const name = nameReplace !== session.user.email ? nameReplace : null;

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
    async function getCurrencyData() {
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
    }

    getCurrencyData();
  }, []);

  let count = 0;
  useEffect(() => {
    async function getWalletData() {
      const walletRequest = await instance.get('wallet');
      walletRequest.data.forEach((item) => {
        item.wallet_id === session.user.email
        && setWalletUSD(item.usd);
      });
      walletRequest.data.forEach((item) => {
        item.wallet_id === session.user.email
        && setWalletGBP(item.gbp);
      });

      walletRequest.data.forEach((item) => {
        item.wallet_id !== session.user.email
        // eslint-disable-next-line no-plusplus
        && count++;
        if (count === walletRequest.data.length) {
          instance.post('wallet', { wallet_id: session.user.email, usd: 1000, gbp: 1000 });
        }
      });
    }

    getWalletData();
  }, [session.user.email]);

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

  // Update USD and GBP wallet values on postgresql when they change.
  const [changes, setChanges] = useState(0);
  useEffect(() => {
    if (changes < 5) {
      setChanges(changes + 1);
    } else {
      instance.put(`wallet/${session.user.email}`, { gbp: walletGBP, usd: walletUSD });
    }
  }, [walletUSD, walletGBP]);

  const handleChange2 = (e) => { setInputValue2(e.target.value); };
  const handleChange1 = (e) => { setInputValue1(e.target.value); };

  const time = 3000;

  const id = uuid();
  const Queueref = useRef();
  const historyref = useRef();
  const walletGBPref = useRef();
  const walletUSDref = useRef();
  Queueref.current = QueueArray;
  historyref.current = history;
  walletUSDref.current = walletUSD;
  walletGBPref.current = walletGBP;

  const buyUSD = () => {
    setQueueArray([...QueueArray, { value: 1, id }]);

    setTimeout(() => {
      setWalletGBP(parseFloat(walletGBPref.current) - Math.round(roundUSD * inputValue1 * 1000) / 1000);
      setWalletUSD(parseFloat(walletUSDref.current) + parseFloat(inputValue1));
      setHistory([`${Math.round(roundUSD * inputValue1 * 1000) / 1000} GBP → ${inputValue1} USD`, ...historyref.current]);
      instance.post('history', {
        history_email: `${session.user.email}`,
        history_content: `${Math.round(roundUSD * inputValue1 * 1000) / 1000} GBP → ${inputValue1} USD`,
      });
      setQueueArray(Queueref.current.filter((item) => item.id !== id));
    }, time);
  };

  const buyGBP = () => {
    setQueueArray([...QueueArray, { value: 1, id }]);

    setTimeout(() => {
      setWalletUSD(parseFloat(walletUSDref.current) - Math.round(roundGBP * inputValue2 * 1000) / 1000);
      setWalletGBP(parseFloat(walletGBPref.current) + parseFloat(inputValue2));
      setHistory([`${Math.round(roundGBP * inputValue2 * 1000) / 1000} USD → ${inputValue2} GBP`, ...historyref.current]);
      instance.post('history', {
        history_email: `${session.user.email}`,
        history_content: `${Math.round(roundGBP * inputValue2 * 1000) / 1000} USD → ${inputValue2} GBP`,
      });
      setQueueArray(Queueref.current.filter((item) => item.id !== id));
    }, time);
  };

  return (
    <div className={styles.dashBoardContainer}>

      <div className={styles.graphContainer}>
        <div className={styles.buttonContainer}>
          <WalltetButton onClick={onOpen}>
            {' '}
            {wallet}
            {' '}
          </WalltetButton>
          <LogOutButton>
            {logout}
            {' '}
            {from}
            {' '}
            {name}
          </LogOutButton>
        </div>
        <h3>
          Base EUR
        </h3>
        {isWalletOpen ? (
          <Wallet
            confirm={confirm}
            select={select}
            toDeposit={toDeposit}
            wallet={wallet}
            onClick={onClose}
          />
        ) : null}

        <Graph />

      </div>

      <div className={styles.buyContainer}>

        <div>
          USD
          <Input placeholder={toBuy} type="number" value={inputValue1} onChange={handleChange1} />
          <BuyButton
            disabled={!!(inputValue1 === '' || inputValue1 <= 0)}
            onClick={buyUSD}
            bgColor="var(--blue)"
            inputValue={inputValue1}
            round={roundUSD}
            currency="GBP"
          >
            {buy}
          </BuyButton>

        </div>

        <div>
          GBP
          <Input placeholder={toBuy} type="number" value={inputValue2} onChange={handleChange2} />
          <BuyButton
            disabled={!!(inputValue2 === '' || inputValue2 <= 0)}
            onClick={buyGBP}
            bgColor="var(--blue)"
            inputValue={inputValue2}
            round={roundGBP}
            currency="USD"
          >
            {buy}
          </BuyButton>

        </div>

      </div>

    </div>
  );
}

export default DashBoard;
