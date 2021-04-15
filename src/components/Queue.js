/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../../styles/components/Queue.module.css';
import { useTransaction } from '../context/transactionContext';

function Queue({ processing }) {
  const { QueueArray } = useTransaction();

  return (
    <div className={styles.queueContainer}>
      {QueueArray.map((i) => (
        <li key={i} className={styles.cardContainer}>
          <div>
            <h2>{processing}</h2>
            {/* divs are for loading animation */}
            <div className={styles.ldsEllipsis}>
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}

export default Queue;
