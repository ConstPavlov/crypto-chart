import { Bot } from '../../../shared';

export interface ChartProps {
  currentBot: Bot;
  selectedPeriod: keyof Bot;
  selectedGladias: string;
  margin?: { top: number; right: number; bottom: number; left: number };
}
