import React, { useState } from 'react';
import styles from './App.module.css';

const digits_creator = (setDisplayValue) => {
  const digits = [];
  for (let i = 1; i < 10; i++) {
    digits.push(
      <button key={i} onClick={() => handleDigitClick(setDisplayValue, i)}>
        {i}
      </button>
    );
  }
  return digits;
};

const handleDigitClick = (setDisplayValue, digit) => {
  setDisplayValue(prevValue => {
    if (prevValue === 'ERROR') {
      return String(digit);
    }
    const newValue = prevValue + digit;
    if (parseInt(newValue) >= 999999999) {
      return 'ERROR';
    } else {
      return newValue;
    }
  });
};

function App() {
  const [displayValue, setDisplayValue] = useState('');

  return (
    <>
      <div className={styles.calculator_container}>
        <div className={styles.display}>{displayValue}</div>
        <div className={styles.operators}>
          <button>
            <img src='plus-sub.png' alt="Plus Subtraction" />
          </button>
          <button>
            <img src='percentage.png' alt="Percentage" />
          </button>
          <button>
            <img src='division.png' alt="Division" />
          </button>
          <button>
            <img src='minus.png' alt="Minus" />
          </button>
        </div>
        <div className={styles.digits_operators_container}>
          <div className={styles.digits}>
            {digits_creator(setDisplayValue)}
            <button onClick={() => handleDigitClick(setDisplayValue, '0')}>0</button>
            <button className={styles.dot}>
              <img src='dot.png' alt="Dot" />
            </button>
            <button onClick={() => setDisplayValue('')}>AC</button>
          </div>
          <div className={styles.other_operators}>
            <button>
              <img src='multiply.png' alt="Multiply" />
            </button>
            <button>
              <img src='plus-sign.png' alt="Plus Sign" />
            </button>
            <button className={styles.equal_button}>
              <img src='equal.png' alt="Equal" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
