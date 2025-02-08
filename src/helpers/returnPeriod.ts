import { Bot } from '../shared';

export const returnPeriod = (per: string): keyof Bot => {
  if (per === '24h') {
    return '24h';
  }
  if (per === '7 days') {
    return '7d';
  }
  if (per === '30 days') {
    return '30d';
  }
  if (per === 'All time') {
    return 'all_time';
  }
  return 'all_time';
};
