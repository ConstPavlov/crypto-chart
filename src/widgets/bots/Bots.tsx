import React from 'react';
import styles from './Bots.module.scss';
// import orangeSvg from '../../assets/Bots/orange-bot.svg';
import snake1 from '../../assets/Bots/arrows/snake1.png';
import snake2 from '../../assets/Bots/arrows/snake2.png';
import snake3 from '../../assets/Bots/arrows/snake4.png';
import snake4 from '../../assets/Bots/arrows/snake3.png';
import { botsInfo } from '../../shared/consts/bots-const';
import classNames from 'classnames';
import { useBotStore } from '../../store/useBotStore';
import { IBotName } from '../../shared/interfaces/bot.interface';
import { TBotInfo } from '../../shared/interfaces/bot-info.interface';
import { findBot } from '../../helpers/findBot';

const Bots: React.FC = () => {
  const {
    bots,
    currentBot,
    currentBotName,
    currentPeriod,
    setCurrentBot,
    setCurrentBotName,
  } = useBotStore();
  const handleClickBot = (name: IBotName) => {
    if (name !== currentBotName) {
      setCurrentBot(name);
      setCurrentBotName(name);
    }
  };
  React.useEffect(() => {}, [currentBot, currentBotName]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.bots}>
        {botsInfo.map((bot: TBotInfo) => (
          <div
            className={classNames(styles.bot, {
              [styles.bot_active]: bot.name === currentBotName,
            })}
            key={bot.id}
            onClick={(event: any) => handleClickBot(bot.name)}
          >
            {bot.name === 'yellow_bot' && (
              <div className={classNames(styles.snake_decor, styles.right_top)}>
                <img src={snake1} alt="snake decor" />
              </div>
            )}
            {bot.name === 'yellow_bot' && (
              <div className={classNames(styles.snake_decor, styles.left_top)}>
                <img src={snake2} alt="snake decor" />
              </div>
            )}
            {bot.name === 'yellow_bot' && (
              <div
                className={classNames(styles.snake_decor, styles.left_bottom)}
              >
                <img src={snake3} alt="snake decor" />
              </div>
            )}
            {bot.name === 'yellow_bot' && (
              <div
                className={classNames(styles.snake_decor, styles.right_bottom)}
              >
                <img src={snake4} alt="snake decor" />
              </div>
            )}
            <div className={styles.content}>
              <div className={styles.icon}>
                <img className={styles.img} src={bot.img} alt="bot image" />
              </div>
              <div className={styles.text_content}>
                <span
                  className={classNames(
                    styles.text,
                    bot.name === 'white_bot' && styles.grayText,
                  )}
                >
                  {bot.text}
                </span>
                <span
                  className={classNames(styles.percent, {
                    [styles.percent_minus]:
                      Number(findBot(bots, bot, currentPeriod)) < 0,
                  })}
                >
                  {bot.name !== 'white_bot' && bots
                    ? `${findBot(bots, bot, currentPeriod)}%`
                    : ''}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bots;
