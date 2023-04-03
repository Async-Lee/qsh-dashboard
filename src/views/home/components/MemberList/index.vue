<template>
  <!-- 会员风采 -->
  <Panel title="会员风采" :opacity=".3">
    <Vue3SeamlessScroll v-model="autoScroll" class="member-list-scroll" :list="list" hover wheel :step=".4">
      <div class="member-list">
        <div v-for="item, index in list" :key="index" class="member-item">
          <div class="member-item-avatar" :style="{
            'background-image': `url(${item.avatar})`
          }" />
          <div class="member-item-info">
            <div class="member-item-qsh">
              <span class="member-item-name">{{ item.userName }}</span>
              <span class="member-item-position">{{ item.position }}</span>
            </div>
            <div class="member-item-enterprise">
              <span class="member-item-name">{{ item.enterpriseName }}</span>
              <span class="member-item-position">{{ item.enterprisePosition }}</span>
            </div>
          </div>
        </div>
      </div>
    </Vue3SeamlessScroll>
  </Panel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Panel from '@/components/Panel.vue';
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

const data = ref([
  {
    avatar: '',
    userName: '黄仕坤',
    position: '会长',
    enterpriseName: '深圳金雅福控股集团有限公司',
    enterprisePosition: '董事长'
  }, {
    avatar: '',
    userName: '魏荧',
    position: '执行会长',
    enterpriseName: '深圳金雅福控股集团有限公司',
    enterprisePosition: '总经理'
  }
]);

const list = ref([
  ...data.value,
  ...data.value,
  ...data.value,
  ...data.value,
  ...data.value,
  ...data.value,
  ...data.value,
  ...data.value,
  ...data.value,
  ...data.value,
  ...data.value
]);

const autoScroll = ref(false);
setTimeout(() => {
  autoScroll.value = true;
}, 1500);

</script>

<style scoped lang="scss">
.member-list-scroll {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.member-list {
  width: 100%;
  height: 100%;
  // overflow: auto;
  // -webkit-overflow-scrolling: touch;
  // -ms-overflow-style: none;
  // overflow: -moz-scrollbars-none;

  // &::-webkit-scrollbar {
  //   width: 0;
  // }

  .member-item {
    display: flex;
    align-items: center;
    width: 100%;
    background: #fff;
    border-radius: vw(10);
    padding: vh(20) vw(15);
    margin-bottom: vh(20);

    &-avatar {
      width: vw(50);
      height: vw(50);
      background: transparent center/contain no-repeat;
    }

    &-info {
      flex: 1;
      width: 0;
      height: 100%;
    }

    &-qsh {
      color: $color-primary;
      font-size: $font-size-m;
      font-weight: bold;
      line-height: vw(20);
    }

    &-enterprise {
      margin-top: vh(10);
      color: $color-label;
      font-size: $font-size-s;
      line-height: vw(20);
    }

    &-position {
      margin-left: vw(10);
    }
  }
}
</style>