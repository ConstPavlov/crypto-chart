import React from 'react';

import menuIcon from '../../assets/Title_bar/menu_icon.svg';
import refreshIcon from '../../assets/Title_bar/refresh.svg';
import decorPng from '../../assets/bg/bg_2.png';
import { usePageStore } from '../../store/usePageStore';
import styles from './Header.module.scss';
import { namePageChecker } from '../../helpers/namePageChecker';

export const Header: React.FC = React.memo(() => {
  const { namePage, setNamePage } = usePageStore();
  const title = namePageChecker(namePage);
  return (
    <div className={styles.wrapper}>
      <div className={styles.decor}>
        <img src={decorPng} alt="decor image" />
      </div>
      <div className={styles.header}>
        <div className={styles.tools}>
          <div className={styles.item}>
            <img className={styles.icon} src={menuIcon} alt="menu icon" />
          </div>
          <div className={styles.item}>
            <span className={styles.text}>{title}</span>
          </div>
          <div className={styles.item}>
            <img className={styles.icon} src={refreshIcon} alt="refresh icon" />
          </div>
        </div>
      </div>
    </div>
  );
});
