<template>
  <view class="ck-block-title">
    <view class="block-title-icon"></view>
    <text v-if="hasDefaultSlot">
      <slot></slot>
    </text>
    <text v-else>
      {{ title }}
    </text>
  </view>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

const hasDefaultSlot = !!useSlots.default
</script>

<style lang="scss" scoped>
.ck-block-title {
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 12rpx;
}

.block-title-icon {
  width: 6rpx;
  height: 25rpx;
  background-color: $uni-color-primary;
  display: inline-block;
  margin-right: 16rpx;
}
</style>
