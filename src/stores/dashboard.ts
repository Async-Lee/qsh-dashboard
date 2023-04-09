import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', () => {
  /** 首页看板数据 */
  const dashboardData = ref<QSH.ScreenDisplayReturn>();
  /** 设置看板数据 */
  const setDashboardData = (data: QSH.ScreenDisplayReturn) => {
    dashboardData.value = data;
  };

  /** 基础url配置 */
  const baseUrlConfig = ref({});
  /** 设置基础url配置 */
  const setBaseUrlConfig = (config: any) => {
    baseUrlConfig.value = config;
  };

  return {
    /** 首页看板数据 */
    dashboardData,
    /** 设置看板数据 */
    setDashboardData,
    /** 基础url配置 */
    baseUrlConfig,
    /** 设置基础url配置 */
    setBaseUrlConfig,
  };
});
