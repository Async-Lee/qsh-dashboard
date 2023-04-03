<template>
  <!-- 会员地区统计 -->
  <div class="area-statistic">
    <Panel title="会员地区统计" desc="单位：人">
      <div class="chart" ref="chartRef"></div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Panel from '@/components/Panel.vue';
import { BarChart } from 'echarts/charts';
import useEcharts from '@/hooks/use-echarts';
import type { useEchartsConfigDTO } from '@/hooks/use-echarts';
import options from './options';

const chartRef = ref<HTMLElement | null>(null);
const conifg: useEchartsConfigDTO = reactive({
  use: [BarChart],
  options
});

useEcharts(chartRef, conifg);
</script>

<style scoped lang="scss">
.area-statistic {
  width: vw(880);
  height: 100%;
}
</style>