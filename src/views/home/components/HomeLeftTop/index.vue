<template>
  <div class="home-left-top">
    <div class="box">
      <MemberStatistic />
      <IncreaseStatistic />
    </div>
    <EnterpriseMap />
  </div>
</template>

<script setup lang="ts">
import MemberStatistic from './components/MemberStatistic/index.vue';
import IncreaseStatistic from './components/IncreaseStatistic/index.vue';
import EnterpriseMap from './components/EnterpriseMap/index.vue';
</script>

<style scoped lang="scss">
.home-left-top {
  flex: 1;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 0;
  margin-bottom: $spacing-vertical;

  .box {
    display: flex;
    flex-direction: column;
  }
}
</style>