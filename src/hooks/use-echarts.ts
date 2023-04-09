import type { Ref } from 'vue'
import { onMounted, onUnmounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { debounce } from '@/utils/index'

export interface useEchartsConfigDTO {
  options?: echarts.ComposeOption<never>,
  use?: any[],
}

/**
 * @param {HTMLElement} chartRef echarts canvas节点
 * @param {object} config
 * @param {useEchartsConfigDTO} config.options echarts option配置项
 * @param {function} callback 渲染回调函数
 * @returns {object} object
 * @returns {echarts.ECharts} object.echartInstance echarts实例
 */
export default (
  chartRef: Ref<HTMLElement | null>,
  config: useEchartsConfigDTO,
  callback?: () => void,
) => {
  // 基础组件
  echarts.use([
    TooltipComponent,
    GridComponent,
    LegendComponent,
    UniversalTransition,
    CanvasRenderer,
    ...(config?.use || [])
  ])

  // echarts实例
  let echartInstance: echarts.ECharts;
  // 渲染echarts
  const render = (_option = config.options) => {
    if (_option) {
      echartInstance?.setOption(_option);
      nextTick(() => {
        callback?.();
      });
    }
  }
  // 初始化echarts
  const init = () => {
    nextTick(() => {
      if (chartRef.value) {
        echartInstance = echarts.init(chartRef.value)
        render()
      } else {
        throw new Error('请检查 echart ref')
      }
    })
  }
  // 更新echarts
  const update = () => {
    render()
  }

  // 窗口响应
  const windowResize = debounce(() => {
    echartInstance?.resize()
    console.log('resize');
  }, 300)

  const onResize = () => {
    window.addEventListener('resize', windowResize)
  }

  // 移除resize监听
  const unResize = () => {
    window.removeEventListener('resize', windowResize)
  }

  onMounted(() => {
    init()
    onResize()
  })

  onUnmounted(() => {
    unResize()
  })

  // 监听配置项变更
  watch(
    () => config.options,
    () => update(),
    { deep: true }
  )

  const getEchartInstance = () => echartInstance;

  return {
    getEchartInstance
  }
}
