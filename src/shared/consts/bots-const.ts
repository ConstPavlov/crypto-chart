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
  },
  {
    id: 2,
    img: grayBot,
    text: `PLACE BOT HERE`,
  },
  {
    id: 3,
    img: blueBot,
    text: 'BALANCE',
  },
  {
    id: 4,
    img: greenBot,
    text: 'DEFENCE',
  },
  {
    id: 5,
    img: yellowBot,
    text: 'MEGABOT',
  },
  {
    id: 6,
    img: redBot,
    text: 'ATTACK',
  },
];
