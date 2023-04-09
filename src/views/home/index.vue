<template>
  <div class="view home">
    <template v-if="dashboardData">
      <div class="home-left">
        <HomeLeftTop />
        <HomeLeftBottom />
      </div>
      <div class="home-right">
        <MemberList />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import HomeLeftTop from './components/HomeLeftTop/index.vue';
import HomeLeftBottom from './components/HomeLeftBottom/index.vue';
import MemberList from './components/MemberList/index.vue';
import { getBaisicConfig, getScreenDisplayData } from '@/api';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard';
import { ElLoading } from 'element-plus'

const { dashboardData } = storeToRefs(useDashboardStore());

const init = async () => {
  const { setBaseUrlConfig, setDashboardData } = useDashboardStore();

  const loadingInstance = ElLoading.service({
    background: 'rgba(0, 0, 0, .5)',
    text: 'loading...'
  });

  await getBaisicConfig().then((res) => {
    const { baseUrl = {} } = res || {};
    setBaseUrlConfig(baseUrl || {});
  }).catch(error => {
    console.error(error);
  });

  const data = await getScreenDisplayData().finally(() => {
    loadingInstance.close();
  });
  setDashboardData(data);
};

onMounted(() => {
  init();
});

</script>

<style scoped lang="scss">
.home {
  display: flex;

  &-left {
    display: flex;
    flex-direction: column;
    width: vw(1400);
    height: 100%;
  }

  &-right {
    width: vw(460);
    height: 100%;
    margin-left: $spacing;
  }
}
</style>