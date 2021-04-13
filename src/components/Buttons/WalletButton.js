import React from 'react';
import styles from '../../../styles/components/WalletButton.module.css';

// eslint-disable-next-line react/prop-types
function WalltetButton({ onClick, children, disabled }) {
  return (
    <button
      className={styles.walletButton}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      { children }
    </button>
  );
}

export default WalltetButton;
