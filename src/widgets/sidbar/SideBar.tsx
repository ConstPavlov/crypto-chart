import React from 'react';
import styles from './SideBar.module.scss';
import { FaHome } from 'react-icons/fa';
import { GiMining } from 'react-icons/gi';
import { RiTeamFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__inner}>
        <Link to="/">
          <div className={styles.sidebar__item}>
            <FaHome className={styles.ico} />
          </div>
          <div className={styles.title}>Home</div>
        </Link>

        <Link to="/pool">
          <div className={styles.sidebar__item}>
            <GiMining className={styles.ico} />
          </div>
          <div className={styles.title}>Mining Pool</div>
        </Link>
        <Link to="/invest">
          <div className={styles.sidebar__item}>
            <FaHome className={styles.ico} />
          </div>
          <div className={styles.title}>Invest</div>
        </Link>
        <Link to="/team">
          <div className={styles.sidebar__item}>
            <RiTeamFill className={styles.ico} />
          </div>
          <div className={styles.title}>Invite</div>
        </Link>
        <Link to="/profile">
          <div className={styles.sidebar__item}>
            <FaUser className={styles.ico} />
          </div>
          <div className={styles.title}>Me</div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
