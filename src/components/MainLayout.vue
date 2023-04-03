<template>
  <div class="main-layout">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main-layout {
  flex: 1;
  width: 100%;
  height: 0;
}
</style>