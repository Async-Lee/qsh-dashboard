<template>
  <div class="view home">
    <div class="home-left">
      <HomeLeftTop />
      <HomeLeftBottom />
    </div>
    <div class="home-right">
      <MemberList />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeLeftTop from './components/HomeLeftTop/index.vue';
import HomeLeftBottom from './components/HomeLeftBottom/index.vue';
import MemberList from './components/MemberList/index.vue';
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