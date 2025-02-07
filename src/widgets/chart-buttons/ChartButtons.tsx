import React from 'react';
import styles from './ChartButtons.module.scss';

const ChartButtons = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tool}>
        <h3 className={styles.title}>Time Range:</h3>
        <div className={styles.buttons}>
          <div className={styles.btn}>24h</div>
          <div className={styles.btn}>7 days</div>
          <div className={styles.btn}>30 days</div>
          <div className={styles.btn}>All time</div>
        </div>
      </div>
    </div>
  );
};

export default ChartButtons;
