<script lang="ts" setup>
import { computed, defineComponent, useAttrs, ref } from 'vue'
import { PREFIX } from '../_constants'
import WdButton from 'wot-design-uni/components/wd-button/wd-button.vue'
import { buttonProps } from 'wot-design-uni/components/wd-button/types'
const props = defineProps(buttonProps)
const attrs = useAttrs()

// 合并 props 与 attrs，优先使用显式 props
const mergedProps = computed(() => ({ ...attrs, ...props } as Record<string, any>))
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
    <slot></slot>
  </WdButton>
</template>

<style lang="scss">
@import './index';
</style>
