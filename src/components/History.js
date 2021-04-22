/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import styles from '../../styles/components/history.module.css';
import { useTransaction } from '../context/transactioncontext';
import instance from '../axios/axios';

function History({ past }) {
  const { history, dbHistory, setDbHistory } = useTransaction();
  const [session] = useSession();

  useEffect(() => {
    async function getHistoryData() {
      const requestHistory = await instance.get('history');
      setDbHistory(requestHistory.data);
    }

    getHistoryData();
  }, []);

  return (
    <div className={styles.historyContainer}>
      <div>
        <h2>
          {' '}
          {past}
          {' '}
        </h2>
        {dbHistory.map((item, i) => (
          item.history_email === session.user.email
            ? <p key={i}>{item.history_content}</p>
            : null
        ))}
        {history.map((item, i) => <p key={i}>{item}</p>)}
      </div>
    </div>
  );
}

export default History;
