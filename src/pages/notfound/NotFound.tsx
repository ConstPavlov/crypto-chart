import React from 'react';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404</h1>
      <div className={styles.text}>This Page Doesn't exist</div>
    </div>
  );
};

export default NotFound;
