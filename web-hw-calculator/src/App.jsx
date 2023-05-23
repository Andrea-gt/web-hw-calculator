import React, { useState } from 'react';
import styles from './App.module.css';

const digits_creator = (handleDigitClick) => {
  const digits = [];
  for (let i = 1; i < 10; i++) {
    digits.push(
      <button key={i} onClick={() => handleDigitClick(i)}>
        {i}
      </button>
    );
  }
  return digits;
};

function App() {
  const [displayValue, setDisplayValue] = useState('');
  const [operator, setOperator] = useState('');
  const [operand, setOperand] = useState('');
  const [hasDecimal, setHasDecimal] = useState(false);

  const handleDigitClick = (digit) => {
    if (
      displayValue.length < 9 &&
      !(digit === 0 && displayValue === '0') &&
      displayValue !== 'ERROR'
    ) {
      if (displayValue === '0') {
        setDisplayValue(digit.toString());
      } else {
        setDisplayValue((prevValue) => prevValue + digit.toString());
      }
    }
  };


  const handleOperatorClick = (operator) => {
    if (operator === '+/-') {
      setDisplayValue((prevValue) => {
        if (prevValue.startsWith('-')) {
          return prevValue.substring(1); 
        } else {
          return '-' + prevValue; 
        }
      });
      return;
    }

    setOperator(operator);
    setOperand(displayValue);
    setDisplayValue('');
    setHasDecimal(false);
  };

  const handleDecimalClick = () => {
    if (!hasDecimal && displayValue !== 'ERROR') {
      setDisplayValue((prevValue) => prevValue + '.');
      setHasDecimal(true);
    }
  };

  const calculateResult = () => {
    const operand1 = parseFloat(operand);
    const operand2 = parseFloat(displayValue);
    let result = 0;

    switch (operator) {
      case '+':
        result = operand1 + operand2;
        if (result > 999999999) {
          result = 'ERROR';
        }
        break;
      case '-':
        result = operand1 - operand2;
        if (result < 0) {
          result = 'ERROR';
        }
        break;
      case '*':
        result = operand1 * operand2;
        if (result > 999999999) {
          result = 'ERROR';
        }
        break;
      case '%':
        result = operand1 % operand2;
        break;
      case '/':
        result = operand1 / operand2;
        break;
      default:
        break;
    }

    console.log(result);
    if (isNaN(result)) {
      result = 0;
    }

    const resultString = result.toString();

    if (resultString.length > 9) {
      setDisplayValue(resultString.slice(0, 9));
    } else {
      setDisplayValue(resultString);
    }

    setOperator('');
    setOperand('');
    setHasDecimal(false);
  };

  return (
    <>
      <div className={styles.calculator_container}>
        <div className={styles.display}>{displayValue}</div>
        <div className={styles.operators}>
          <button onClick={() => handleOperatorClick('+/-')}>
            <img src="plus-sub.png" alt="plus-minus" />
          </button>
          <button onClick={() => handleOperatorClick('%')}>
            <img src="percentage.png" alt="percentage" />
          </button>
          <button onClick={() => handleOperatorClick('/')}>
            <img src="division.png" alt="division" />
          </button>
          <button onClick={() => handleOperatorClick('-')}>
            <img src="minus.png" alt="minus" />
          </button>
        </div>
        <div className={styles.digits_operators_container}>
          <div className={styles.digits}>
            {digits_creator(handleDigitClick)}
            <button onClick={() => handleDigitClick(0)}>
              {displayValue === '0' ? 0 : '0'}
            </button>
            <button className={styles.dot} onClick={handleDecimalClick}>
              <img src="dot.png" alt="dot" />
            </button>
            <button onClick={() => setDisplayValue('')}>AC</button>
          </div>
          <div className={styles.other_operators}>
            <button onClick={() => handleOperatorClick('*')}>
              <img src="multiply.png" alt="multiply" />
            </button>
            <button onClick={() => handleOperatorClick('+')}>
              <img src="plus-sign.png" alt="plus-sign" />
            </button>
            <button className={styles.equal_button} onClick={calculateResult}>
              <img src="equal.png" alt="equal" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
