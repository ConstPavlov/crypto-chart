export type IBotName =
  | 'orange_bot'
  | 'white_bot'
  | 'red_bot'
  | 'yellow_bot'
  | 'green_bot'
  | 'blue_bot';

export interface Bot {
  name: IBotName;
  cost: number;
  '24h': number;
  '7d': number;
  '30d': number;
  '60d': number;
  '90d': number;
  all_time: number;
}
