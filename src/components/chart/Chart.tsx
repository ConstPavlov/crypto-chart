import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import { Bot } from '../../shared';
import { generateData } from '../../helpers/generateBotData';
import { updateYPeriod } from '../../helpers/updateYPeriod';
import { calcPreviousCosts } from '../../helpers/calcPreviousCosts';
import { style } from 'd3';
import styles from './Chart.module.scss';

interface ChartProps {
  gladias: Bot[];
  selectedPeriod: keyof Bot;
  selectedGladias: string;
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
  margin = { top: 20, right: 0, bottom: 30, left: 0 },
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = React.useState({
    width: 750,
    height: 375,
  });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width,
          height: width * 0.5, // Соотношение 2:1
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!gladias.length) return;

    const selectedGladi = gladias.find(item => item.name === selectedGladias);

    if (!selectedGladi) return;

    const [startDate, endDate] = updateYPeriod(selectedPeriod);
    const { width, height } = dimensions;

    const costData = calcPreviousCosts(selectedGladi, selectedPeriod);
    const midIdx = Math.floor(costData.length / 2);
    const midValue = costData[midIdx];
    // x
    // console.log(costData);
    const x = d3
      .scaleTime()
      .domain([costData[0].date, costData[costData.length - 1].date])
      .range([margin.left, width - margin.right]);
    // y
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(costData, d => d.cost) ?? 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Создаем clipPath для обрезки линий сетки
    svg.select('#clip').remove();
    svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'grid-clip')
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom);

    // Сетка для оси X (вертикальные линии)
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickSize(-height + margin.top + 50)
          .tickFormat('' as any),
      )
      .selectAll('line')
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', '2,2')
      .selectAll('.domain')
      .attr('stroke', 'none');
    // .attr('clip-path', 'url(#grid-clip)'); // Обрезаем линии по clipPath
    // .filter((_, i, nodes) => i !== nodes.length - 1);

    svg.selectAll('.grid line').attr('clip-path', 'url(#grid-clip)');
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
      .attr('stroke-width', 0.5)
      // .attr('stroke-dasharray', '2,2')
      // .attr('clip-path', 'url(#grid-clip)')
      .filter((_, i, nodes) => i !== nodes.length);

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
          : d3.timeFormat('%b %d')(date);
      }
      return '';
    };

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(
            selectedPeriod === '24h'
              ? d3.timeHour.every(4)
              : selectedPeriod === '7d'
              ? d3.timeDay.every(1)
              : selectedPeriod === '30d'
              ? d3.timeDay.every(4)
              : d3.timeMonth.every(2),
          )
          .tickFormat(tickFormatFunction),
      )
      .selectAll('path')
      .attr('stroke', 'none')
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-0.8em')
      .attr('dy', '0.15em')
      .attr('transform', 'rotate(-45)');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickSize(0)
          .tickFormat('' as any),
      )
      .selectAll('path')
      .attr('stroke', 'none');

    // Градиент
    const defs = svg.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('gradientTransform', 'rotate(70)');

    ///////
    ///////
    gradient
      .append('stop')
      .attr('offset', '10%')
      .attr('stop-color', '#0093ff')
      .attr('stop-opacity', 0.4);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#0093ff')
      .attr('stop-opacity', 0);
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
      .attr('d', area)
      .attr('clip-path', 'url(#clip)');

    svg
      .append('circle')
      .attr('cx', x(midValue.date))
      .attr('cy', y(midValue.cost))
      .attr('r', 5)
      .attr('fill', 'white');
  }, [gladias, selectedPeriod, selectedGladias, margin]);

  return (
    <div ref={containerRef} className={styles.container}>
      <svg
        ref={svgRef}
        className={styles.chart}
        viewBox={`0 0 ${containerRef.current?.clientWidth || 750} ${
          (containerRef.current && containerRef.current?.clientWidth * 0.5) ||
          375
        }`}
      />
    </div>
  );
};

export default Chart;
