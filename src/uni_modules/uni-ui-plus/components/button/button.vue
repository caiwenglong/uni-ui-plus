<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, defineComponent, useAttrs } from 'vue'
import { PREFIX } from '../_constants'
import WdButton from 'wot-design-uni/components/wd-button/wd-button.vue'
import { buttonProps } from 'wot-design-uni/components/wd-button/types'
const props = defineProps(buttonProps)
const attrs = useAttrs()

// 合并 props 与 attrs，优先使用显式 props
const mergedProps = computed(() => ({ ...attrs, ...props } as Record<string, any>))
console.log('attrs:', attrs)
console.log('props:', props)
console.log('mergedProps:', mergedProps.value)
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
  <WdButton v-bind="mergedProps">
    插槽789
    <slot></slot>
  </WdButton>
</template>

<style lang="scss">
@import './index';
</style>
