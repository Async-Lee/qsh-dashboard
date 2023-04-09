<template>
  <!-- 会员风采 -->
  <Panel title="会员风采" :opacity=".3" v-loading="loading" element-loading-text="loading..."
    element-loading-background="rgba(0, 0, 0, .5)">
    <!-- wheel -->
    <Vue3SeamlessScroll v-model="autoScroll" class="member-list-scroll" :list="memberList" hover :step=".4">
      <div class="member-list">
        <div v-for="item, index in memberList" :key="index" class="member-item">
          <div class="member-item-avatar" :style="{
            'background-image': `url(${item.avatar})`
          }" />
          <div class="member-item-info">
            <div class="member-item-qsh">
              <span class="member-item-name">{{ item.memberName }}</span>
              <span class="member-item-position">{{ item.job }}</span>
            </div>
            <div class="member-item-enterprise">
              <span class="member-item-name">{{ item.enterpriseName }}</span>
              <span class="member-item-position">{{ item.memberJob }}</span>
            </div>
          </div>
        </div>
      </div>
    </Vue3SeamlessScroll>
  </Panel>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Panel from '@/components/Panel.vue';
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { getMemberList } from '@/api';

const autoScroll = ref(false);

const params = ref({
  page: {
    pageNum: 1,
    pageSize: 20,
  },
});

const currentPageNum = computed(() => params.value?.page?.pageNum || 1);

const memberList = ref<any[]>([]);

const loading = ref(false);

const init = async () => {
  loading.value = true;
  const res = await getMemberList(params.value).finally(() => loading.value = false);

  const list = res?.list || [];
  memberList.value = currentPageNum.value === 1 ? list : memberList.value.concat(list);

  if (res.pageNum < res.totalPage) {
    setTimeout(() => {
      params.value.page.pageNum += 1;
      init();
    }, 3000);
  }

  if (!autoScroll.value) {
    setTimeout(() => {
      autoScroll.value = true;
    }, 1500);
  }
};

onMounted(() => {
  params.value.page.pageNum = 1;
  init();
});
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
      border-radius: 50%;
      margin-right: vw(20);
      background: transparent center/cover no-repeat;
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
      line-height: vw(28);
    }

    &-name {
      margin-right: vw(10);
    }
  }
}
</style>