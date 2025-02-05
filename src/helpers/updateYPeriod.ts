import moment from 'moment';
import { Bot } from '../shared';

export const updateYPeriod = (selectedPeriod: keyof Bot): [Date, Date] => {
  const now = moment().toDate();
  let startDate;

  switch (selectedPeriod) {
    case '24h':
      startDate = moment().subtract(24, 'hours').toDate();
      break;
    case '7d':
      startDate = moment().subtract(7, 'days').toDate();
      break;
    case '30d':
      startDate = moment().subtract(30, 'days').toDate();
      break;
    case 'all_time':
      startDate = moment('2024-09-01').toDate();
      break;
    default:
      startDate = moment('2024-09-01').toDate();
  }
  return [startDate, now];
};
