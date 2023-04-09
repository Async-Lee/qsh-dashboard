<template>
  <!-- 会员地区统计 -->
  <div class="area-statistic">
    <Panel title="会员地区统计" desc="单位：人">
      <div class="chart" ref="chartRef"></div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import Panel from '@/components/Panel.vue';
import { BarChart } from 'echarts/charts';
import useEcharts from '@/hooks/use-echarts';
import type { useEchartsConfigDTO } from '@/hooks/use-echarts';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard';
import { getOptions } from './options';

const chartRef = ref<HTMLElement | null>(null);

const { dashboardData } = storeToRefs(useDashboardStore());

const config: useEchartsConfigDTO = reactive({
  use: [BarChart],
});

/** 更新渲染 数据 */
const updateRenderChart = () => {
  const { areaList = [] } = dashboardData.value || {};
  if (areaList?.length) {
    const xAxisData = areaList?.map(({ key }: any) => key);
    const seriesData = areaList?.map(({ value }: any) => Number(value) || 0);
    const options = getOptions(xAxisData, seriesData);
    config.options = options;
  }
};

watch(() => dashboardData.value, () => {
  updateRenderChart();
}, { immediate: true, deep: true });

useEcharts(chartRef, config);
</script>

<style scoped lang="scss">
.area-statistic {
  width: vw(880);
  height: 100%;
}
</style>