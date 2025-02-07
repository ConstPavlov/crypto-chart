import React from 'react';
import styles from './Bots.module.scss';
// import orangeSvg from '../../assets/Bots/orange-bot.svg';
import {
  orangeBot,
  grayBot,
  blueBot,
  greenBot,
  yellowBot,
  redBot,
} from '../../shared/images/img-bots';
import { botsInfo } from '../../shared/consts/bots-const';

const Bots = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bots}>
        {botsInfo.map(bot => (
          <div className={styles.bot} key={bot.id}>
            <div className={styles.content}>
              <div className={styles.icon}>
                <img className={styles.img} src={bot.img} alt="bot image" />
              </div>
              <span className={styles.text}>{bot.text}</span>
              <span className={styles.percent}>{}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bots;
