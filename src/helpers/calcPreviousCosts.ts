import { Bot } from '../shared';
import { updateYPeriod } from './updateYPeriod';
import * as d3 from 'd3';

export const calcPreviousCosts = (selectBot: Bot, period: keyof Bot) => {
  const percentageChanges = {
    '24h': selectBot['24h'],
    '7d': selectBot['7d'],
    '30d': selectBot['30d'],
    '60d': selectBot['60d'],
    '90d': selectBot['90d'],
    all_time: selectBot['all_time'],
  };

  const costBot = selectBot.cost;

  const [startDate, endDate] = updateYPeriod(period);
  const dates =
    period === '24h' || period === '7d'
      ? d3.timeHours(startDate, endDate) // Генерируем список часов
      : d3.timeDays(startDate, endDate);

  console.log(dates);
  const previousData = dates.map((date, idx) => {
    const timeAgo = dates.length - 1 - idx;

    let cost = costBot;

    if (period === '24h') {
      cost = costBot / (1 + percentageChanges['24h'] / 100) ** timeAgo;
    } else if (timeAgo >= 1) {
      cost = costBot / (1 + percentageChanges['24h'] / 100);
    }
    if (timeAgo >= 7) {
      cost = costBot / (1 + percentageChanges['7d'] / 100);
    }
    if (timeAgo >= 30) {
      cost = costBot / (1 + percentageChanges['30d'] / 100);
    }
    if (timeAgo >= 60) {
      cost = costBot / (1 + percentageChanges['60d'] / 100);
    }
    if (timeAgo >= 90) {
      cost = costBot / (1 + percentageChanges['90d'] / 100);
    }
    if (timeAgo >= dates.length - 1) {
      cost = costBot / (1 + percentageChanges['all_time'] / 100);
    }

    const fluctuation = (Math.random() - 0.5) * 0.15 * cost; // ±5% колебания
    cost += fluctuation;

    return {
      date,
      cost,
    };
  });

  return previousData;
};

////
//
//
//
//
//
//
//
//
