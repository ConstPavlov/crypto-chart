import React from 'react';
import styles from './SideBar.module.scss';
import { Link, useLocation } from 'react-router-dom';
// import dashboardIcon from '../../assets/Tool_bar/1/shape_1.png';
// import megabotIcon from '../../assets/Tool_bar/2/shape_2.png';
import { GiChart } from 'react-icons/gi';
import { CiCircleList } from 'react-icons/ci';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { SlSettings } from 'react-icons/sl';
import { CiDollar } from 'react-icons/ci';
import classNames from 'classnames';

const SideBar = () => {
  const location = useLocation();
  const [namePage, setNamePagge] = React.useState('/');
  React.useEffect(() => {
    const name = location.pathname;
    setNamePagge(name);
  }, [location.pathname]);
  console.log(location);
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__inner}>
        <Link
          to="/dashboard"
          className={classNames(
            styles.link,
            namePage === '/dashboard' && styles.active_tool,
          )}
        >
          <div className={classNames(styles.sidebar__item)}>
            <CiCircleList className={styles.ico} />
          </div>
          <div className={styles.title}>Dashboard</div>
        </Link>

        <Link
          to="/megabot"
          className={classNames(
            styles.link,
            namePage === '/megabot' && styles.active_tool,
          )}
        >
          <div className={styles.sidebar__item}>
            <GiChart className={styles.ico} />
          </div>
          <div className={styles.title}>Megabot</div>
        </Link>
        <Link
          to="/invest"
          className={classNames(
            styles.link,
            namePage === '/invest' && styles.active_tool,
          )}
        >
          <div className={styles.sidebar__item}>
            <HiOutlineShoppingCart className={styles.ico} />
          </div>
          <div className={styles.title}>Bot market</div>
        </Link>
        <Link
          to="/team"
          className={classNames(
            styles.link,
            namePage === '/team' && styles.active_tool,
          )}
        >
          <div className={styles.sidebar__item}>
            <CiDollar className={styles.ico} />
          </div>
          <div className={styles.title}>Coin prices</div>
        </Link>
        <Link
          to="/profile"
          className={classNames(
            styles.link,
            namePage === '/profile' && styles.active_tool,
          )}
        >
          <div className={styles.sidebar__item}>
            <SlSettings className={styles.ico} />
          </div>
          <div className={styles.title}>Profile</div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
