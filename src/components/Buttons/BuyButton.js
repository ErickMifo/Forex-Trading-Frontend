import React from 'react';
import styles from '../../../styles/components/BuyButton.module.css';

function BuyButton({
  // eslint-disable-next-line react/prop-types
  children, bgColor, onClick, disabled,
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

    </button>
  );
}

export default BuyButton;
