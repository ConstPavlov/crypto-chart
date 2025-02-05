import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import { Bot } from '../../shared';
import { generateData } from '../../helpers/generateBotData';
import { updateYPeriod } from '../../helpers/updateYPeriod';
import { calcPreviousCosts } from '../../helpers/calcPreviousCosts';

interface ChartProps {
  gladias: Bot[];
  selectedPeriod: keyof Bot; // Период, например, '24h', '7d', '30d', etc.
  selectedGladias: string; // Имя выбранного гладиаса
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const Chart: React.FC<ChartProps> = ({
  gladias,
  selectedPeriod,
  selectedGladias,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 30, left: 50 },
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!gladias.length) return;

    // const svg = d3.select(svgRef.current);
    // svg.selectAll('*').remove();

    const selectedGladi = gladias.find(item => item.name === selectedGladias);
    const widthChart = width ? width : 750;
    const heightChart = height ? height : 300;

    if (!selectedGladi) return;

    const [startDate, endDate] = updateYPeriod(selectedPeriod);

    // const costData = generateData(
    //   startDate,
    //   endDate,
    //   selectedGladi,
    //   selectedPeriod,
    // );

    const costData = calcPreviousCosts(selectedGladi, selectedPeriod);
    const midIdx = Math.floor(costData.length / 2);
    const midValue = costData[midIdx];
    // x
    const x = d3
      .scaleTime()
      .domain([costData[0].date, costData[costData.length - 1].date])
      .range([margin.left, widthChart - margin.right]);
    // y
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(costData, d => d.cost) ?? 100])
      .nice()
      .range([heightChart - margin.bottom, margin.top]);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Градиент
    const defs = svg.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('gradientTransform', 'rotate(-10)');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#0093ff')
      .attr('stop-opacity', 0.8);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#0093ff')
      .attr('stop-opacity', 0);

    // Сетка
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${heightChart - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickSize(-heightChart + margin.top + margin.bottom)
          .tickFormat('' as any),
      )
      .selectAll('line')
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', '2,2');

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickSize(-widthChart + margin.left + margin.right)
          .tickFormat('' as any),
      )
      .selectAll('line')
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', '2,2');

    // Область
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
      .attr('stroke', '#0093ff')
      .attr('stroke-width', 2)
      .attr('d', area);

    const tickFormatFunction = (date: Date | d3.NumberValue): string => {
      if (date instanceof Date) {
        return selectedPeriod === '24h'
          ? d3.timeFormat('%H:%M')(date) // Формат времени для 24h
          : d3.timeFormat('%b %d')(date); // Формат даты для остальных периодов
      }
      return '';
    };

    svg
      .append('g')
      .attr('transform', `translate(0,${heightChart - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(
            selectedPeriod === '24h'
              ? d3.timeHour.every(4) // Для 24h — тики каждые 3 часа
              : selectedPeriod === '7d'
              ? d3.timeDay.every(1) // Для 7d — тики каждый день
              : selectedPeriod === '30d'
              ? d3.timeDay.every(3) // Для 30d — тики каждые 5 дней
              : d3.timeMonth.every(1),
          )
          .tickFormat(tickFormatFunction), // Используем функцию с правильной сигнатурой
      );

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append('circle')
      .attr('cx', x(midValue.date)) // Позиция по X
      .attr('cy', y(midValue.cost)) // Позиция по Y
      .attr('r', 5) // Радиус кружка
      .attr('fill', 'white'); // Белый цвет
    // .attr('stroke', '#0093ff') // Синяя обводка
    // .attr('stroke-width', 2); // Толщина обводки
  }, [gladias, selectedPeriod, selectedGladias, width, height, margin]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default Chart;
