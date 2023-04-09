<template>
  <!-- 会员企业行业分布 -->
  <div class="industry-statistic">
    <Panel title="会员企业行业分布">
      <div class="chart" ref="chartRef"></div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue';
import Panel from '@/components/Panel.vue';
import { PieChart } from 'echarts/charts';
import useEcharts from '@/hooks/use-echarts';
import type { useEchartsConfigDTO } from '@/hooks/use-echarts';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard';
import { getOptions } from './options';

const chartRef = ref<HTMLElement | null>(null);

const { dashboardData } = storeToRefs(useDashboardStore());

const config: useEchartsConfigDTO = reactive({
  use: [PieChart],
});
const configSeriesData = ref<any[]>([]);

/** 更新渲染 数据 */
const updateRenderChart = () => {
  const { distributionList = [] } = dashboardData.value || {};
  if (distributionList?.length) {
    const seriesData = distributionList?.map(({ industryName, proportion, amount }: any) => ({
      name: industryName,
      ratio: Number(proportion) || 0,
      value: Number(amount) || 0,
    }));

    configSeriesData.value = seriesData;

    const options = getOptions(seriesData);
    config.options = options;
  }
};

watch(() => dashboardData.value, () => {
  updateRenderChart();
}, { immediate: true, deep: true });

const { getEchartInstance } = useEcharts(chartRef, config, () => {
  setHighlight();
});

const setHighlight = () => {
  nextTick(() => {
    const echartInstance = getEchartInstance();
    const data = configSeriesData.value;

    if (data?.length) {
      const maxValue = Math.max(...(data.map(({ value }) => value)));
      let index = data.findIndex(({ value }) => value === maxValue);

      echartInstance?.dispatchAction({
        type: 'highlight',
        dataIndex: index,
      });

      echartInstance?.on("mouseover", function (e) {
        if (e.dataIndex !== index) {
          echartInstance?.dispatchAction({
            type: "downplay",
            dataIndex: index
          });
        }
      });

      echartInstance?.on("mouseout", function (e) {
        index = e.dataIndex;
        echartInstance?.dispatchAction({
          type: "highlight",
          dataIndex: e.dataIndex
        });
      });
    }
  });
};
</script>

<style scoped lang="scss">
.industry-statistic {
  width: vw(460);
  height: 100%;
}
</style>