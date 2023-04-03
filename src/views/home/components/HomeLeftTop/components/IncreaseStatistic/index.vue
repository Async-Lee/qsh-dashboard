<template>
  <!-- 近半年会员增长趋势 -->
  <div class="increase-statistic">
    <Panel title="近半年会员增长趋势" desc="单位：人">
      <div class="chart" ref="chartRef"></div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Panel from '@/components/Panel.vue';
import { LineChart } from 'echarts/charts';
import useEcharts from '@/hooks/use-echarts';
import type { useEchartsConfigDTO } from '@/hooks/use-echarts';
import options from './options';

const chartRef = ref<HTMLElement | null>(null);
const conifg: useEchartsConfigDTO = reactive({
  use: [LineChart],
  options
});

useEcharts(chartRef, conifg);
</script>

<style scoped lang="scss">
.increase-statistic {
  flex: 1;
  width: vw(460);
  height: vh(300);
  margin-top: $spacing-vertical;

  :deep(.panel-header) {
    margin-bottom: 0;
  }
}
</style>