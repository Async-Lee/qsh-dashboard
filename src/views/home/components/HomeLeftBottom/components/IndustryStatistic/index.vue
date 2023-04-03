<template>
  <!-- 会员企业行业分布 -->
  <div class="industry-statistic">
    <Panel title="会员企业行业分布">
      <div class="chart" ref="chartRef"></div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import Panel from '@/components/Panel.vue';
import { PieChart } from 'echarts/charts';
import useEcharts from '@/hooks/use-echarts';
import type { useEchartsConfigDTO } from '@/hooks/use-echarts';
import options from './options';
const chartRef = ref<HTMLElement | null>(null);
const conifg: useEchartsConfigDTO = reactive({
  use: [PieChart],
  options
});

const { getEchartInstance } = useEcharts(chartRef, conifg);

const setHighlight = () => {
  nextTick(() => {
    const echartInstance = getEchartInstance();

    // TODO 找最高数据
    let index = 0;

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
  });
};

onMounted(() => {
  setHighlight();
});
</script>

<style scoped lang="scss">
.industry-statistic {
  width: vw(460);
  height: 100%;
}
</style>