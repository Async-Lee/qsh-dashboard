<template>
  <div class="header-layout">
    <div class="header-layout-title" />
    <div class="header-layout-today">
      <span class="header-layout-date">{{ dateText }}</span>
      <span class="header-layout-time">{{ timeText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const paddingZero = (n: number) => {
  if (String(n).length < 2) {
    return `0${n}`;
  }
  return n;
};

const today = ref(new Date());
// 日期
const month = computed(() => paddingZero(today.value.getMonth() + 1));
const date = computed(() => paddingZero(today.value.getDate()));
// 时间
const hours = computed(() => paddingZero(today.value.getHours()));
const minutes = computed(() => paddingZero(today.value.getMinutes()));
const seconds = computed(() => paddingZero(today.value.getSeconds()));

const dateText = computed(() => `${month.value}/${date.value}`);
const timeText = computed(() => `${hours.value}:${minutes.value}:${seconds.value}`);

// 更新今天日期时间
const updateToday = () => {
  today.value = new Date();
  setTimeout(() => {
    updateToday();
  }, 1000);
};

updateToday();
</script>

<style scoped lang="scss">
.header-layout {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: $spacing;

  &-title {
    width: vw(522);
    height: vw(40);
    background: transparent url('@image/header-title.png') left center/contain no-repeat;
  }

  &-today {
    display: flex;
    align-items: center;
  }

  &-date {
    line-height: vw(22);
    letter-spacing: vw(1);
  }

  &-time {
    margin-left: vw(20);
    font-size: vw(22);
    font-weight: bold;
    color: #333;
    line-height: vw(32);
    letter-spacing: vw(2);
  }
}
</style>
