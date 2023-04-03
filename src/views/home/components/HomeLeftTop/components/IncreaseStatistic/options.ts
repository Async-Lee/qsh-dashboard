import type * as echarts from 'echarts/core';
import type { GridComponentOption } from 'echarts/components';
import type { LineSeriesOption } from 'echarts/charts';
import { vw, vh } from '@/utils/index';

type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>;

const xAxisData = ['22-09', '22-10', '22-11', '22-12', '23-01', '23-02'];
const seriesData = [53, 76, 88, 128, 132, 157];

const color = '#0098fa';

const options: EChartsOption = {
  color,
  // tooltip: {},
  grid: {
    left: vw(24),
    right: vw(24),
    top: vh(20),
    bottom: vh(10),
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisPointer: {
      show: true,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    splitLine: {
      show: true,
      interval: 0,
      lineStyle: {
        color: 'rgba(0, 0, 0, .1)',
        type: 'dashed',
      }
    },
    axisLabel: {
      fontSize: vw(14),
      color: '#666',
      margin: vh(5)
    },
    data: xAxisData,
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  series: {
    name: '近半年会员增长趋势',
    data: seriesData,
    type: 'line',
    smooth: true,
    symbol: 'circle',
    label: {
      show: true,
      fontSize: vw(14),
      color: '#333'
    },
    itemStyle: {
      color: 'transparent',
    },
    emphasis: {
      scale: 2.2,
      label: {
        fontSize: vw(20),
      },
      itemStyle: {
        color,
        borderWidth: 0,
      }
    },
    lineStyle: {
      width: vw(2),
      cap: 'round',
      color
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: .12, color: 'rgba(0,94,255,0.36)'
        }, {
          offset: .62, color: 'rgba(0,94,255,0.16)'
        }, {
          offset: .83, color: 'rgba(0,94,255,0)'
        }]
      }
    }
  }
};

export default options;