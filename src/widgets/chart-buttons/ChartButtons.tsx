import classNames from 'classnames';
import React from 'react';
import { returnPeriod } from '../../helpers/returnPeriod';
import { useBotStore } from '../../store/useBotStore';
import styles from './ChartButtons.module.scss';

export const btnNames: string[] = ['24h', '7 days', '30 days', 'All time'];
const ChartButtons: React.FC = () => {
  const { currentPeriod, setCurrentPeriod } = useBotStore();
  const handleClickBtn = (period: string) => {
    const newPeriod = returnPeriod(period);
    if (currentPeriod !== newPeriod) {
      setCurrentPeriod(newPeriod);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tool}>
        <div className={styles.title}>Time Range:</div>
        <div className={styles.buttons}>
          {btnNames.map((btn: string) => (
            <div
              key={btn}
              className={classNames(styles.btn, {
                [styles.btn_active]: currentPeriod === returnPeriod(btn),
              })}
              onClick={() => handleClickBtn(btn)}
            >
              {btn}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartButtons;
