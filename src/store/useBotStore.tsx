import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Bot } from '../shared';
import { IBotName } from '../shared/interfaces/bot.interface';

interface IBotStateData {
  bots: Bot[];
  currentBot: Bot | null;
  currentBotName: IBotName;
  currentPeriod: keyof Bot;
}
interface IBotState extends IBotStateData {
  setBots: (arg: Bot[]) => void;
  setCurrentBot: (arg: IBotName) => void;
  setCurrentBotName: (arg: IBotName) => void;
  setCurrentPeriod: (arg: keyof Bot) => void;
}
const initialBotState: IBotStateData = {
  bots: [],
  currentBot: null,
  currentBotName: 'orange_bot',
  currentPeriod: 'all_time',
};

export const useBotStore = create<IBotState>()(
  persist(
    (set, get) => ({
      ...initialBotState,
      setBots: (array: Bot[]) => set({ bots: array }),
      setCurrentBot: (botName: IBotName) => {
        const { bots } = get();
        const bot = bots.find(item => item.name === botName);
        set({ currentBot: bot });
      },

      setCurrentBotName: (name: IBotName) => set({ currentBotName: name }),

      setCurrentPeriod: (period: keyof Bot) => set({ currentPeriod: period }),
    }),
    {
      name: 'bots-storage',
    },
  ),
);
