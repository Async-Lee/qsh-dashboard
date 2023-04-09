<template>
  <!-- 会员统计 -->
  <div class="member-statistic">
    <Panel title="会员统计" :opacity=".3">
      <div class="member-statistic-content">
        <div v-for="item, index in data" :key="index" class="member-statistic--card">
          <div class="member-statistic--card-left">
            <div class="member-statistic--card-label">{{ item.label }}</div>
            <div class="member-statistic--card-count">
              <span class="member-statistic--card-value">{{ item.value }}</span>人
              <span v-if="Number(item?.newRatio) > 0" class="member-statistic--card-rate">
                <span class="member-statistic--card-rate-icon" :style="{
                  'background-image': `url(${ICON_MEMBER_UP})`,
                }" />{{ item.newRatio }}%
              </span>
            </div>
          </div>
          <div class="member-statistic--card-right" :style="{
            'background-image': `url(${item.icon})`
          }" />
        </div>
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Panel from '@/components/Panel.vue';
import ICON_MEMBER_UP from '@image/icon-member-month-up.png';
// import ICON_MEMBER_DOWN from '@image/icon-member-month-down.png';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard';

const data = computed(() => {
  const { dashboardData } = storeToRefs(useDashboardStore());
  const { membershipStatistics } = dashboardData.value || {};
  const {
    totalMember,
    addedThisMonth,
    addedThisMonthChain,
    totalMaleMember,
    totalFemaleMember,
  } = membershipStatistics || {};

  return [{
    label: '会员总数',
    value: totalMember || 0,
    icon: new URL('@image/icon-member-number.png', import.meta.url).href,
  }, {
    label: '本月新增',
    value: addedThisMonth || 0,
    icon: new URL('@image/icon-member-month.png', import.meta.url).href,
    newRatio: Number(addedThisMonthChain) || 0,
  }, {
    label: '男性会员',
    value: totalMaleMember || 0,
    icon: new URL('@image/icon-member-man.png', import.meta.url).href
  }, {
    label: '女性会员',
    value: totalFemaleMember || 0,
    icon: new URL('@image/icon-member-woman.png', import.meta.url).href
  }];
});

</script>

<style scoped lang="scss">
.member-statistic {
  flex: 1;
  width: vw(460);
  height: vh(300);

  &-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 100%;
  }

  &--card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: vw(200);
    height: vh(100);
    padding: vh(20) vw(20);
    color: $color-assist;
    background-color: #fff;
    border-radius: vw(10);

    &:nth-child(n+3) {
      align-self: flex-end;
    }

    &-label {
      line-height: vw(22);
    }

    &-count {
      font-size: $font-size-s;
      line-height: vw(20);
    }

    &-value {
      position: relative;
      top: vh(2);
      margin: vh(2) vw(10) 0 0;
      font-size: vw(26);
      font-weight: bold;
      line-height: vw(36);
    }

    &-rate {
      margin-left: vw(10);
      font-size: $font-size-s;
      line-height: vw(20);
    }

    &-rate-icon {
      position: relative;
      top: vh(2);
      display: inline-block;
      width: vh(16);
      height: vh(16);
      background: transparent center/contain no-repeat;
    }

    &-right {
      width: vw(40);
      height: vw(40);
      background: transparent center/contain no-repeat;
    }
  }
}
</style>