<template>
  <!-- 企业分布地图 -->
  <div class="enterprise-map">
    <div id="map" class="enterprise-map-container" v-loading="loading"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useAMap from '@/hooks/use-amap';

const { initAMap, setMarker } = useAMap();

const getData = () => {
  // TODO 数据
  const data = [
    { lng: 114.13116, lat: 22.54836, enterpriseName: '深圳金雅福控股集团有限公司', enterpriseAddress: '中国广东深圳市罗湖区深南东路4003号世界金融中心大厦A座29楼', isDefault: true },
    { lng: 113.817125, lat: 22.640507, enterpriseName: '宝安虹桥机场', enterpriseAddress: '中国广东深圳市宝安区' },
    { lng: 114.046465, lat: 22.614522, enterpriseName: '深圳北', enterpriseAddress: '中国广东深圳市龙华区深圳北站' },
    { lng: 117.752102, lat: 24.498662, enterpriseName: '漳州欢迎您', enterpriseAddress: '中国福建漳州市' },
  ];
  setMarker(data);
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

onMounted(() => {
  init();
});
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