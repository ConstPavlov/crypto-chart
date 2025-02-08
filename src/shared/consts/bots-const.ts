import {
  orangeBot,
  grayBot,
  blueBot,
  greenBot,
  yellowBot,
  redBot,
} from '../../shared/images/img-bots';
import { TBotInfo } from '../interfaces/bot-info.interface';
export const botsInfo: TBotInfo[] = [
  {
    id: 1,
    img: orangeBot,
    text: 'ATTACK',
    name: 'orange_bot',
  },
  {
    id: 2,
    img: grayBot,
    text: `PLACE BOT HERE`,
    name: 'white_bot',
  },
  {
    id: 3,
    img: blueBot,
    text: 'BALANCE',
    name: 'blue_bot',
  },
  {
    id: 4,
    img: greenBot,
    text: 'DEFENCE',
    name: 'green_bot',
  },
  {
    id: 5,
    img: yellowBot,
    text: 'MEGABOT',
    name: 'yellow_bot',
  },
  {
    id: 6,
    img: redBot,
    text: 'ATTACK',
    name: 'red_bot',
  },
];
