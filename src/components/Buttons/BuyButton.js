import React from 'react';
import styles from '../../../styles/components/buybutton.module.css';

function BuyButton({
  // eslint-disable-next-line react/prop-types
  children, bgColor, onClick, disabled, inputValue, round, currency,
}) {
  return (
    <button
      className={styles.buyButton}
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
    >

      {children}
      {' '}
      {inputValue === '' || inputValue <= 0
        ? round
        : Math.round(round * inputValue * 1000) / 1000}
      {' '}
      {currency}

    </button>
  );
}

export default BuyButton;
