import moment from 'moment';
import * as d3 from 'd3';
import { Bot } from '../shared';

export const generateData = (
  startDate: Date,
  endDate: Date,
  gladi: Bot,
  selectedPeriod: keyof Bot,
) => {
  const dates = d3.timeDays(startDate, endDate);

  return dates.map(date => ({
    date,
    value: gladi[selectedPeriod],
    cost: gladi.cost,
  }));
};
