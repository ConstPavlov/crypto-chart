import React from 'react';
import Chart from '../../components/chart/Chart';
import styles from './Dashboard.module.scss';
import jsonFile from '../../data.json';
import { Bot } from '../../shared';

const Dashboard = () => {
  const [period, setPeriod] = React.useState<keyof Bot>('30d');
  const [currentBot, setCurrentBot] = React.useState<string>('blue_bot');
  const [bots, setBots] = React.useState<Bot[]>([]);

  React.useEffect(() => {
    const arrayBotsFromJson = JSON.parse(JSON.stringify(jsonFile));
    setBots(arrayBotsFromJson.bots);
  }, []);
  console.log(bots, 'is bots');

  return (
    <div className={styles.wrapper}>
      <h1>Dashboard</h1>

      {bots && bots.length > 0 ? (
        <Chart
          gladias={bots}
          width={750}
          height={300}
          selectedPeriod={period}
          selectedGladias={currentBot}
        />
      ) : (
        'Loading...'
      )}

      <div></div>
    </div>
  );
};

export default Dashboard;
