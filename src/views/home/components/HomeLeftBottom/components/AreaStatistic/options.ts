import type * as echarts from 'echarts/core';
import type { TooltipComponentOption, GridComponentOption } from 'echarts/components';
import type { BarSeriesOption } from 'echarts/charts';
import { vw, vh } from '@/utils/index';

type EChartsOption = echarts.ComposeOption<TooltipComponentOption | GridComponentOption | BarSeriesOption>;

// const xAxisData = [
//   '深圳市 罗湖区',
//   '深圳市 福田区',
//   '深圳市 南山区',
//   '深圳市 宝安区',
//   '深圳市 龙岗区',
//   '深圳市 盐田区',
//   '深圳市 龙华区',
//   '深圳市 坪山区',
//   '深圳市 光明区',
//   '深圳市 大鹏新区',
//   '其他'
// ];

// const seriesData = [17, 15, 12, 8, 14, 22, 26, 19, 12, 14, 3];

const color = '#5ba0ff';

export const getOptions = (xAxisData: string[], seriesData: number[]): EChartsOption => ({
  color,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    textStyle: {
      fontSize: vw(14),
      color: '#666',
    },
    formatter: (params) => {
      if (Array.isArray(params)) {
        const { name = '', data: value = '' } = params?.[0] || {};
        if (!name && !value) return '';
        return `${name.replace(',', '')}：${value}人`;
      }
      return '';
    }
  },
  grid: {
    left: 0,
    right: 0,
    top: vh(20),
    bottom: vh(10),
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: xAxisData,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      margin: vw(4),
      fontSize: vw(14),
      color: '#666',
      interval: 0,
      lineHeight: vw(18),
      formatter: (value: string) => {
        const arr = value?.split(',') || [];
        return arr.join('\n');
      }
    },
  },
  yAxis: {
    type: 'value',
    interval: 10,
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(0, 0, 0, .1)'
      }
    },
    axisLabel: {
      fontSize: vw(14),
      color: '#666',
      formatter: (value: string | number) => {
        if (String(value) === '0') return '';
        return String(value);
      }
    }
  },
  series: {
    name: '会员地区统计',
    type: 'bar',
    barWidth: vw(28),
    data: seriesData,
    barMinHeight: vw(30),
    label: {
      show: true,
      position: 'insideTop',
      distance: vh(6),
      color: '#fff',
      fontSize: vw(14)
    },
    itemStyle: {
      borderRadius: [vw(14), vw(14), 0, 0]
    }
  }
});
