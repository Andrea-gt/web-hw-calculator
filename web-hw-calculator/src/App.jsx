import React, { useState } from 'react'
import styles from './App.module.css'

const digits_creator = (handleDigitClick) => {
  const digits = [];
  for (let i = 1; i < 10; i++) {
    digits.push(
      <button key={i} onClick={() => handleDigitClick(i)}>
        {i}
      </button>
    )
  }
  return digits
}

function App() {
  const [displayValue, setDisplayValue] = useState('');
  const [operator, setOperator] = useState('');
  const [operand, setOperand] = useState('');

  const handleDigitClick = (digit) => {
    if (displayValue.length < 9 && !(digit === 0 && displayValue === '0')) {
      setDisplayValue(prevValue => prevValue + digit.toString());
    }
  }

  const handleOperatorClick = (operator) => {
    setOperator(operator);
    setOperand(displayValue);
    setDisplayValue('');
  }

  const calculateResult = () => {
    const operand1 = parseInt(operand);
    const operand2 = parseInt(displayValue);
    let result = 0;

    switch (operator) {
      case '+':
        result = operand1 + operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case '*':
        result = operand1 * operand2;
        break;
      default:
        break;
    }

    setDisplayValue(result.toString());
    setOperator('');
    setOperand('');
  }

  return (
    <>
      <div className={styles.calculator_container}>
        <div className={styles.display}>
          {displayValue}
        </div>
        <div className={styles.operators}>
          <button onClick={() => handleOperatorClick('+')}><img src='plus-sub.png' alt="plus-sub"/></button>
          <button><img src='percentage.png' alt="percentage"/></button>
          <button><img src='division.png' alt="division"/></button>
          <button onClick={() => handleOperatorClick('-')}><img src='minus.png' alt="minus"/></button>
        </div>
        <div className={styles.digits_operators_container}>
          <div className={styles.digits}>
            {digits_creator(handleDigitClick)}
            <button onClick={() => handleDigitClick(0)}>0</button>
            <button className={styles.dot}><img src='dot.png' alt="dot"/></button>
            <button onClick={() => setDisplayValue('')}>AC</button>
          </div>
          <div className={styles.other_operators}>
            <button onClick={() => handleOperatorClick('*')}><img src='multiply.png' alt="multiply"/></button>
            <button onClick={() => handleOperatorClick('+')}><img src='plus-sign.png' alt="plus-sign"/></button>
            <button className={styles.equal_button} onClick={calculateResult}><img src='equal.png' alt="equal"/></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
