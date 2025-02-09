import { ISVG } from './svg.interface';

export interface IDrawArea extends ISVG {
  costData: CostData[];
  x: d3.ScaleTime<number, number>;
  y: d3.ScaleLinear<number, number>;
}
