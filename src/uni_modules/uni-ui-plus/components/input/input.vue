<script lang="ts" setup>
import { computed, defineComponent, useAttrs, ref, watch } from 'vue'
import { PREFIX } from '../_constants'
import WdInput from 'wot-design-uni/components/wd-input/wd-input.vue'
import { inputProps } from 'wot-design-uni/components/wd-input/types'
import { isDef } from 'wot-design-uni/components/common/util'
const props = defineProps({
  ...inputProps,
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  }
})
const attrs = useAttrs()
const emit = defineEmits(['update:modelValue', 'input', 'blur'])

// 合并 props 与 attrs，优先使用显式 props
const mergedProps = computed(() => ({ ...attrs, ...props } as Record<string, any>))

const inputValue = ref<string | number>('') // 输入框的值

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = isDef(newValue) ? String(newValue) : ''
  },
  { immediate: true }
)

/**
 * 处理输入事件
 * @param val 输入框的值
 */
function handleInput(val: any) {
  emit('update:modelValue', val.value)
  emit('input', val.value)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-input`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared'
    // #endif
  }
})
</script>

<template>
  <view class="up-input">
    <WdInput v-bind="mergedProps" @input="handleInput" v-model="inputValue">
      <template #prefix v-if="!!prefix">
        {{ prefix }}
      </template>
      <template #suffix v-if="!!suffix">
        {{ suffix }}
      </template>
    </WdInput>
  </view>
</template>

<style lang="scss"></style>
