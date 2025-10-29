<!--
    @description: 日历选择器
    @time: 2025-07-16 09:50:21
-->
<template>
  <view>
    <wd-calendar v-model="model" :label="label" :type="type" :show-confirm="false" @confirm="handleConfirm" />
  </view>
</template>

<script setup>
import wdCalendar from 'wot-design-uni/components/wd-calendar/wd-calendar.vue'
const props = defineProps({
  /** 文本名称 */
  label: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    default: 'date'
  }
})

const model = defineModel()

const handleConfirm = (event) => {}
</script>

<style lang="scss" scoped></style>
