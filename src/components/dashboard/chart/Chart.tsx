import React from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import { Bot } from '../../../shared';
import { generateData } from '../../../helpers/generateBotData';
import { calcPreviousCosts } from '../../../helpers/calcPreviousCosts';
import styles from './Chart.module.scss';
import classNames from 'classnames';
import { ChartProps } from './chart.interface';
import { axisAndGrid } from './parts/axisAndGrid';
import { gradient } from './parts/gradient';
import { drawArea } from './parts/drawArea';
import { drawPoint } from './parts/drawPoint';

const Chart: React.FC<ChartProps> = ({
  currentBot,
  selectedPeriod,
  selectedGladias,
  margin = { top: 20, right: 0, bottom: 30, left: 0 },
}) => {
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = React.useState({
    width: 750,
    height: 375,
  });

  React.useEffect(() => {
    if (!currentBot) return;

    const { width, height } = dimensions;

    const costData = calcPreviousCosts(currentBot, selectedPeriod);
    const midIdx = Math.floor(costData.length / 2);
    const midValue = costData[midIdx];
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
    const chartText = styles.chartText;
    svg.selectAll('*').remove();
    axisAndGrid({
      svg,
      x,
      y,
      width,
      height,
      margin,
      selectedPeriod,
      chartText,
    });
    gradient(svg);
    drawArea({ svg, costData, x, y });
    drawPoint({ svg, midValue, x, y });
  }, [currentBot, selectedPeriod, selectedGladias, margin]);

  return (
    <div className={styles.container}>
      <span
        className={classNames(styles.percent, {
          [styles.percent_minus]: currentBot[selectedPeriod] < 0,
        })}
      >
        {`${currentBot[selectedPeriod]}%`}
      </span>
      <svg
        ref={svgRef}
        className={styles.chart}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height + 50}`}
      />
    </div>
  );
};

export default Chart;
