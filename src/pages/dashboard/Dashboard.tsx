import React from 'react';
import Chart from '../../components/dashboard/chart/Chart';
import styles from './Dashboard.module.scss';
import jsonFile from '../../data.json';
import { Bot } from '../../shared';
import Bots from '../../widgets/bots/Bots';
import TotalAssets from '../../components/dashboard/total-assets/TotalAssets';
import ChartButtons from '../../widgets/chart-buttons/ChartButtons';
import { useBotStore } from '../../store/useBotStore';
import { devtools } from 'zustand/middleware';

const Dashboard = () => {
  const {
    bots,
    setBots,
    currentBot,
    currentBotName,
    currentPeriod,
    setCurrentBot,
    setCurrentBotName,
  } = useBotStore();

  React.useEffect(() => {
    const arrayBotsFromJson = JSON.parse(JSON.stringify(jsonFile));
    setBots(arrayBotsFromJson.bots);
  }, []);

  return (
    <div className={styles.wrapper}>
      <TotalAssets />
      {bots && bots.length > 0 && currentBot ? (
        <Chart
          currentBot={currentBot}
          selectedPeriod={currentPeriod}
          selectedGladias={currentBotName}
        />
      ) : (
        'Please Select a bot...'
      )}
      <Bots />

      <ChartButtons />
    </div>
  );
};

export default Dashboard;
