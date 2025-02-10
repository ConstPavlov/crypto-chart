import * as d3 from 'd3';
export const gradient = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
) => {
  const defs = svg.append('defs');
  const gradient = defs
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('gradientTransform', 'rotate(70)');

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
};
