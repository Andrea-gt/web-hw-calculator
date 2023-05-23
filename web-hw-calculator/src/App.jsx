import React from 'react'
import styles from './App.module.css'

function App() {
  return (
    <>
      <div className={styles.calculator_container}>
        <div className={styles.display}>
          Display
        </div>
        <div className={styles.operators}>
          <button><img src='plus-sub.png'/></button>
          <button><img src='percentage.png'/></button>
          <button><img src='division.png'/></button>
          <button><img src='minus.png'/></button>
        </div>
        <div className={styles.digits_operators_container}>
          <div className={styles.digits}>Digits</div>
          <div className={styles.other_operators}>
            <button><img src='multiply.png'/></button>
            <button><img src='plus-sign.png'/></button>
            <button className={styles.equal_button}><img src='equal.png'/></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
