import * as d3 from 'd3';
import { IAxisAndGrid } from './interfaces/axis-and-grid.interface';

export const axisAndGrid = ({
  svg,
  x,
  y,
  width,
  height,
  margin,
  selectedPeriod,
  chartText,
}: IAxisAndGrid) => {
  // Создаем clipPath для обрезки линий сетки
  svg.select('#clip').remove();

  // Сетка для оси X (вертикальные линии)
  svg
    .append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(
      d3
        .axisBottom(x)
        .tickSize(-height + margin.top * 2.5)
        .tickFormat('' as any),
    )
    .selectAll('line')
    .attr('stroke', '#1e3b5e')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', '2,2');

  svg.selectAll('.domain').remove();

  // Сетка для оси Y (горизонтальные линии)
  svg
    .append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(${margin.left},0)`)
    .call(
      d3
        .axisLeft(y)
        .tickSize(-width + margin.left + margin.right)
        .tickFormat('' as any),
    )
    .selectAll('line')
    .attr('stroke', '#e0e0e044')
    .attr('stroke-width', 0.5);

  // убирает рамку графика
  svg
    .selectAll('g')
    .filter((_, i, nodes) => {
      return d3.select(nodes[i]).attr('transform') === 'translate(0,0)';
    })
    .select('.domain')
    .remove();

  ///////////////////////////////////////////////

  const tickFormatFunction = (date: Date | d3.NumberValue): string => {
    if (date instanceof Date) {
      return selectedPeriod === '24h'
        ? d3.timeFormat('%H:%M')(date)
        : d3.timeFormat('%d.%m')(date);
    }
    return '';
  };

  // Меняем тики и стили
  const xAxis = d3
    .axisBottom(x)
    .ticks(
      selectedPeriod === '24h'
        ? d3.timeHour.every(4)
        : selectedPeriod === '7d'
        ? d3.timeDay.every(1)
        : selectedPeriod === '30d'
        ? d3.timeDay.every(4)
        : d3.timeMonth.every(3),
    )
    .tickFormat(tickFormatFunction);

  const xAxisGroup = svg
    .append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  xAxisGroup.selectAll('.tick line').remove(); // Убираем белые отметки
  xAxisGroup.select('.domain').remove(); // Убираем линию оси X

  xAxisGroup.selectAll('text').attr('class', chartText);
};
