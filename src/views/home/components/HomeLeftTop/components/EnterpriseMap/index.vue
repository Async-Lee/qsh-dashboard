<template>
  <!-- 企业分布地图 -->
  <div class="enterprise-map">
    <div id="map" class="enterprise-map-container" v-loading="loading" element-loading-text="loading..."
      element-loading-background="rgba(0, 0, 0, .5)" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import useAMap from '@/hooks/use-amap';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard';

const { dashboardData } = storeToRefs(useDashboardStore());

const { initAMap, setMarker } = useAMap();

const getData = () => {
  const { enterpriseAddressList = [] } = dashboardData.value || {};
  if (enterpriseAddressList?.length) {
    const enterpriseData = enterpriseAddressList.map((item: any) => {
      const {
        latitude = 0,
        longitude = 0,
        enterpriseName = '',
        provinceName,
        cityName,
        areaName,
        detailAddress,
      } = item || {};

      const enterpriseAddress = [
        provinceName || '',
        cityName || '',
        areaName || '',
        detailAddress || '',
      ].join('');

      return ({
        lat: Number(latitude) || 0,
        lng: Number(longitude) || 0,
        enterpriseName: enterpriseName || '',
        enterpriseAddress,
        isDefault: false,
      })
    });

    // TODO 默认展示第一条有经纬度数据的企业
    const firstItem = enterpriseData.find((({ lat, lng }: any) => lat && lng));
    if (firstItem) {
      firstItem.isDefault = true;
    }

    setMarker(enterpriseData);
  }
};

const loading = ref(false);

const init = async () => {
  loading.value = true
  initAMap('map').then(() => {
    getData();
    loading.value = false;
  }).catch(() => {
    loading.value = false;
  });
};

watch(() => dashboardData.value, () => {
  init();
}, { immediate: true, deep: true });

</script>

<style scoped lang="scss">
.enterprise-map {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: vw(880);
  height: 100%;
  // height: vh(630);
  overflow: hidden;
  box-shadow: 0 vw(4) vw(10) 0 rgba(0, 0, 0, .03);
  border-radius: vw(10);

  &-container {
    width: 100%;
    height: 100%;
  }
}
</style>