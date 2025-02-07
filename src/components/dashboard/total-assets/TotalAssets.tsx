import React from 'react';
import iconAmount from '../../../assets/balance/amount-ico.png';
import styles from './TotalAssets.module.scss';

const TotalAssets: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.totalAssets}>
        <h3 className={styles.title}>TRADING CAPITAL</h3>
        <div className={styles.basicBlock}>
          <div className={styles.right}>1.00865 BTC</div>
          <div className={styles.left}>
            <div className={styles.balance}>
              BALANCE
              <span>10 850</span>
              <img src={iconAmount} alt="icon decor" />
            </div>
            <div className={styles.balance}>
              ON HOLD
              <span>24 000</span>
              <img src={iconAmount} alt="icon decor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAssets;
