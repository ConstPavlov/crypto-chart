import React from 'react';

import styles from './TopBoard.module.scss';

export const Header: React.FC = React.memo(() => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img src="/src/assets/Title_bar/menu_icon.png" alt="" />
        </div>
      </div>
    </div>
  );
});
