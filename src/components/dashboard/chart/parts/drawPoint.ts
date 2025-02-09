import { IDrawPoint } from './interfaces/draw-point.interface';

export const drawPoint = ({ svg, midValue, x, y }: IDrawPoint) => {
  svg
    .append('circle')
    .attr('cx', x(midValue.date))
    .attr('cy', y(midValue.cost))
    .attr('r', 5)
    .attr('fill', 'white');
};
