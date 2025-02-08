import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import { Bot } from '../../../shared';
import { generateData } from '../../../helpers/generateBotData';
import { updateYPeriod } from '../../../helpers/updateYPeriod';
import { calcPreviousCosts } from '../../../helpers/calcPreviousCosts';
import styles from './Chart.module.scss';
import classNames from 'classnames';

interface ChartProps {
  currentBot: Bot;
  selectedPeriod: keyof Bot;
  selectedGladias: string;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const Chart: React.FC<ChartProps> = ({
  currentBot,
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
        const isMobile = width <= 600;
        const heightFactor = isMobile ? 0.6 : 0.5;
        setDimensions({
          width,
          height: width * heightFactor,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!currentBot) return;

    const { width, height } = dimensions;

    const costData = calcPreviousCosts(currentBot, selectedPeriod);
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

    // Убираем линии выше оси X (если они выходят за пределы графика)
    // gridLines
    //   .filter(function () {
    //     const y2 = d3.select(this).attr('y2');
    //     return y2 ? parseFloat(y2) < margin.top : false; // Вернется false, если y2 не определено
    //   })
    //   .remove();

    // svg
    //   .append('defs')
    //   .append('clipPath')
    //   .attr('id', 'grid-clip')
    //   .append('rect')
    //   .attr('x', margin.left)
    //   .attr('y', margin.top)
    //   .attr('width', width - margin.left - margin.right)
    //   .attr('height', height - margin.top - margin.bottom);
    // Убираем линии и оси X,Y
    // svg.selectAll('.grid line').attr('clip-path', 'url(#grid-clip)');
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
    // .attr('stroke-dasharray', '2,2')
    // .attr('clip-path', 'url(#grid-clip)')
    // .filter((_, i, nodes) => i !== nodes.length);

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
          : d3.timeFormat('%b %d')(date);
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

    xAxisGroup.selectAll('text').attr('class', styles.chartText);

    // .style('fill', 'white')
    // .style('font-size', '17px');
    // .attr('class', styles.chartText);
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

    // делаю заливку под кривую область
    svg
      .append('path')
      .datum(costData)
      .attr('fill', 'url(#gradient')
      .attr('d', area);

    // обозначаю stroke только у кривой
    const line = d3
      .line<{ date: Date; cost: number }>()
      .x(d => x(d.date))
      .y(d => y(d.cost));
    svg
      .append('path')
      .datum(costData)
      .attr('fill', 'url(#gradient)')
      .attr('stroke', '#0093ff')
      .attr('stroke-width', 2)
      .attr('d', line);
    // .attr('clip-path', 'url(#clip)');

    svg
      .append('circle')
      .attr('cx', x(midValue.date))
      .attr('cy', y(midValue.cost))
      .attr('r', 5)
      .attr('fill', 'white');
  }, [currentBot, selectedPeriod, selectedGladias, margin]);

  return (
    <div ref={containerRef} className={styles.container}>
      <span
        className={classNames(styles.percent, {
          [styles.percent_minus]: currentBot[selectedPeriod] < 0,
        })}
      >{`${currentBot[selectedPeriod]}%`}</span>
      <svg
        preserveAspectRatio="xMinYMin meet"
        ref={svgRef}
        className={styles.chart}
        viewBox={`0 0 ${dimensions.width || 750} ${
          dimensions.height + 50 || 375
        }`}
      />
    </div>
  );
};

export default Chart;
