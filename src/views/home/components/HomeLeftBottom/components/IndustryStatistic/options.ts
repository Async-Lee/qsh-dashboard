import type * as echarts from 'echarts/core';
import type { TooltipComponentOption, GridComponentOption, LegendComponentOption } from 'echarts/components';
import type { PieSeriesOption } from 'echarts/charts';
import { vw, vh } from '@/utils/index';

type EChartsOption = echarts.ComposeOption<TooltipComponentOption | GridComponentOption | LegendComponentOption | PieSeriesOption>;

const seriesData = [
  { value: 40, name: '黄金珠宝', rate: 25 },
  { value: 30, name: '金融投资', rate: 25 },
  { value: 19, name: '房地产', rate: 18 },
  { value: 10, name: '物业管理', rate: 10 },
  { value: 5, name: '其他', rate: 6 }
];

const color = [
  '#0098fa',
  '#fdcc00',
  '#0cd9b5',
  '#3b72ad',
  '#f27629',
  // 默认
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc'
];

const options: EChartsOption = {
  color,
  tooltip: {
    trigger: 'item',
    textStyle: {
      fontSize: vw(14),
      color: '#666',
    },
    formatter: (params: any) => {
      const { name = '',  value = '' } = params?.data || {};
      if (!name && !value) return '';
      return `${name}：${value}家`;
    }
  },
  grid: {
    left: vw(20),
    right: vw(20),
    top: vh(16),
    bottom: 0,
    containLabel: true,
  },
  legend: {
    selectedMode: false,
    top: 'center',
    left: vw(190),
    icon: 'rect',
    itemGap: vw(20),
    itemWidth: vw(10),
    itemHeight: vw(10),
    formatter: (name: string) => {
      const item = seriesData.find(_ => _.name === name)
      if (item) {
        return `{label|${name}}{value|${item.rate}%}`;
      }
      return '';
    },
    textStyle: {
      color: '#333',
      rich: {
        label: {
          width: vw(50),
          fontSize: vw(14),
          lineHeight: vw(20),
        },
        value: {
          width: vw(34),
          fontSize: vw(14),
          lineHeight: vw(20),
          align: 'right',
        }
      }
    }
  },
  series: {
    name: '会员企业行业分布',
    type: 'pie',
    radius: [vw(36), vw(86)],
    center: [vw(90), 'center'],
    roseType: 'area',
    label: {
      show: false,
      position: 'center'
    },
    emphasis: {
      label: {
        show: true,
        formatter: (params: any) => {
          const { name = '', value = 0 } = params?.data || {};
          return `{label|${name}}\n{value|${value}}`;
        },
        rich: {
          label: {
            color: '#666',
            fontSize: vw(12),
            lineHeight: vw(20)
          },
          value: {
            color: '#333',
            fontSize: vw(16),
            fontWeight: 'bold',
            lineHeight: vw(24)
          }
        }
      }
    },
    labelLine: {
      show: false
    },
    data: seriesData,
  }
};


export default options;
