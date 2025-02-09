import { Bot } from '../../../../../shared';
import { Margin } from './margiin.interface';
import { ISVG } from './svg.interface';

export interface IAxisAndGrid extends ISVG {
  x: d3.ScaleTime<number, number>;
  y: d3.ScaleLinear<number, number>;
  width: number;
  height: number;
  margin: Margin;
  selectedPeriod: keyof Bot;
  chartText: string;
}
