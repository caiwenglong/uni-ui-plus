<script lang="ts" setup>
import { computed, defineComponent, useAttrs, ref } from 'vue'
import { PREFIX } from '../_constants'
import WdButton from 'wot-design-uni/components/wd-button/wd-button.vue'
import { buttonProps } from 'wot-design-uni/components/wd-button/types'
const props = defineProps({
  ...buttonProps,
  /** 自定义类名 */
  className: {
    type: String,
    default: ''
  }
})
const attrs = useAttrs()

const emit = defineEmits<{
  (e: 'click', val: any): void
}>()

// 合并 props 与 attrs，优先使用显式 props
const mergedProps = computed(() => ({ ...attrs, ...props } as Record<string, any>))

const handleBtnClick = (val: any) => {
  emit('click', val)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-button`

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
  <WdButton
    :type="type"
    :disabled="disabled"
    :plain="plain"
    :hairline="hairline"
    :loading="loading"
    :loadingColor="loadingColor"
    :round="round"
    :block="block"
    :size="size"
    :icon="icon"
    :custom-class="className"
    @click="handleBtnClick"
  >
    <slot></slot>
  </WdButton>
</template>

<style lang="scss">
@import './index';
</style>
