import React from 'react';
import styles from '../../styles/components/Input.module.css';

function Input({
  // eslint-disable-next-line react/prop-types
  onChange, value, placeholder,
}) {
  return (
    <input
      className={styles.inputComponent}
      placeholder={placeholder}
      type="number"
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
