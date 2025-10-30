<template>
  <wd-calendar v-model="modelValue" label="日期选择" />
</template>

<script setup>
import { computed, toRefs } from 'vue'
import wdCalendar from 'wot-design-uni/components/wd-calendar/wd-calendar.vue'
import dayjs from 'wot-design-uni/dayjs'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  rules: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: '时间'
  },
  placeholder: {
    type: String,
    default: '请选择时间'
  },
  minDate: {
    type: String,
    default: ''
  }
})
const { modelValue, rules, label, placeholder, minDate } = toRefs(props)

const emit = defineEmits(['modelValue'])

const startTime = computed({
  get() {
    return modelValue.value ? dayjs(modelValue.value).valueOf() : ''
  },
  set(value) {
    emit('update:modelValue', value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '')
  }
})

const minDateComputed = computed(() => {
  return minDate.value || new Date().getTime()
})
</script>

<style scoped></style>
