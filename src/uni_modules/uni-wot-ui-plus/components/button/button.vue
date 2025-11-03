<script lang="ts" setup>
import { computed, defineComponent, useAttrs } from 'vue'
import { PREFIX } from '../_constants'
import WdButton from 'wot-design-uni/components/wd-button/wd-button.vue'
import { buttonProps } from 'wot-design-uni/components/wd-button/types'
// 导入国际化相关函数
import { Locale } from '../../locale'

const props = defineProps({
  ...buttonProps,
  /** 自定义类名 */
  customClass: {
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

// 获取国际化文本的函数
const getLocaleText = (key: string) => {
  const messages = Locale.messages()
  // 使用可选链操作符安全地访问嵌套属性
  return key.split('.').reduce((obj: any, k) => obj?.[k], messages) || key
}

// 获取按钮默认文本
const getDefaultButtonText = () => {
  if (props.loading) {
    return getLocaleText('button.loading')
  }
  return getLocaleText('button.default')
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
    :custom-class="customClass"
    @click="handleBtnClick"
  >
    <slot>
      <!-- 如果没有插槽内容，显示默认的国际化文本 -->
      {{ getDefaultButtonText() }}
    </slot>
  </WdButton>
</template>

<style lang="scss">
@import './index';
</style>
