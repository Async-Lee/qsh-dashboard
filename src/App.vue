<template>
  <HeaderLayout />
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderLayout from './components/HeaderLayout.vue';
import MainLayout from './components/MainLayout.vue';
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: $spacing-vertical $spacing;
  color: $color-primary;
  font-size: $font-size-m;
  background: transparent url('@image/global-bg.png') center/cover no-repeat;
  // font-family: PingFang SC-Regular, sans-serif;
}
</style>
