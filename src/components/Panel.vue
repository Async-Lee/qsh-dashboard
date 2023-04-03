<template>
  <div class="panel" :style="{
    'background-color': `rgba(255,255,255, ${opacity})`
  }">
    <div class="panel-header">
      <span v-if="title" class="panel-title">{{ title }}</span>
      <span v-if="desc" class="panel-desc">{{ desc }}</span>
    </div>
    <div class="panel-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  /** 板块标题 */
  title: {
    type: String as PropType<string>,
    default: ''
  },
  /** 描述说明 */
  desc: {
    type: String as PropType<string>,
    default: ''
  },
  /** 背景透明度 */
  opacity: {
    type: Number as PropType<number>,
    default: .4
  }
});
</script>

<style scoped lang="scss">
.panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: vh(20) vw(20);
  box-shadow: inset 1px 1px 0px 0px rgba(255, 255, 255, 0.6), inset -1px -1px 0px 0px rgba(255, 255, 255, 0.6), 0px 4px 10px 0px rgba(0, 0, 0, 0.03);
  border-radius: vw(10);

  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: vh(20);
  }

  &-title {
    font-weight: bold;
    font-size: $font-size-l;
    line-height: vw(20);
  }

  &-desc {
    font-size: $font-size-s;
    color: $color-label;
    line-height: vw(20);
  }

  &-content {
    flex: 1;
    width: 100%;
    height: 0;
  }
}
</style>