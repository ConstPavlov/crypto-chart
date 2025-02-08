import { Bot } from '../shared';
import { TBotInfo } from '../shared/interfaces/bot-info.interface';

export const findBot = (
  arr: Bot[],
  bot: TBotInfo,
  currentPeriod: keyof Bot,
): string => {
  const founded = arr.find(b => b.name === bot.name);
  const percent = founded ? founded[currentPeriod] : 0;

  let signWithPercend = '0';
  if (percent < 0) {
    signWithPercend = percent + '';
  }
  if (percent > 0) {
    signWithPercend = '+' + percent;
  }
  return signWithPercend;
};
