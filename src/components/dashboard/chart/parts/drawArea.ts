import * as d3 from 'd3';
import { IDrawArea } from './interfaces/dwaw-are.interface';
export const drawArea = ({ svg, costData, x, y }: IDrawArea) => {
  const area = d3
    .area<{ date: Date; cost: number }>()
    .x(d => x(d.date))
    .y0(y(0))
    .y1(d => y(d.cost))
    .curve(d3.curveBasis);

  svg
    .append('path')
    .datum(costData)
    .attr('fill', 'url(#gradient)')
    .attr('d', area);

  const line = d3
    .line<{ date: Date; cost: number }>()
    .x(d => x(d.date))
    .y(d => y(d.cost));

  svg
    .append('path')
    .datum(costData)
    .attr('stroke', '#0093ff')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('d', line);
};
