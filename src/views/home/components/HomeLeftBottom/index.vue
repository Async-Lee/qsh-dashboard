<template>
  <div class="home-left-bottom">
    <AreaStatistic />
    <IndustryStatistic />
  </div>
</template>

<script setup lang="ts">
import AreaStatistic from './components/AreaStatistic/index.vue';
import IndustryStatistic from './components/IndustryStatistic/index.vue';

</script>

<style scoped lang="scss">
.home-left-bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: vh(290);
}
</style>