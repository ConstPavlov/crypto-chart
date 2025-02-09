import { ISVG } from './svg.interface';

export interface IDrawPoint extends ISVG {
  midValue: CostData;
  x: d3.ScaleTime<number, number>;
  y: d3.ScaleLinear<number, number>;
}
