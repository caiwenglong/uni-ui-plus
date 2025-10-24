<script lang="ts" setup>
import { computed, defineComponent, useAttrs, ref, watch, onMounted } from 'vue'
import { PREFIX } from '../_constants'
import WdSelectPicker from 'wot-design-uni/components/wd-select-picker/wd-select-picker.vue'
import { selectPickerProps } from 'wot-design-uni/components/wd-select-picker/types'
import { isDef } from 'wot-design-uni/components/common/util'
import { isFunction } from 'lodash-es'

const props = defineProps({
  ...selectPickerProps,
  //   传入的数据源
  optionList: {
    type: Array,
    default: () => []
  },

  // 是否是通过调用方法获取options
  isApiOptions: {
    type: Boolean,
    default: true
  },

  // 获取下拉列表数据的方法
  selectOptionsFn: {
    type: Function,
    default: undefined
  },

  // 表单数据
  formValue: {
    type: Object,
    default: () => ({})
  },

  // 字段文字字段名称
  textFieldName: {
    type: String,
    default: ''
  },

  // 字段值字段名称
  field: {
    type: String,
    default: ''
  },

  // 标题名称
  label: {
    type: String,
    default: ''
  },

  // 标题宽度
  labelWidth: {
    type: String,
    default: ''
  },

  // event bus名称
  busName: {
    type: String,
    default: 'busSelect'
  }
})
const attrs = useAttrs()
const emit = defineEmits(['update:modelValue'])

// 合并 props 与 attrs，优先使用显式 props
const mergedProps = computed(() => ({ ...attrs, ...props } as Record<string, any>))
// eslint-disable-next-line vue/no-setup-props-destructure
// const { selectOptionsFn } = props

const selectValue = ref<string | number>('') // 输入框的值
const selectOptions = ref<any[]>([]) // 最终传给 picker 的 columns（扁平数组或按需封装）
const optionsByApi = ref<any[]>([])

// 取有效的 labelKey / valueKey（兼容多种命名）
const effectiveLabelKey = computed(() => {
  const m = mergedProps.value || {}
  return m.labelKey || (props as any).labelKey || 'label'
})
const effectiveValueKey = computed(() => {
  const m = mergedProps.value || {}
  return m.valueField || (props as any).valueKey || 'value'
})

// 加载选项的函数，优先使用 selectOptionsFn（来自 props 或 attrs），否则使用 optionList / columns
async function loadOptions() {
  const fn = (props as any).selectOptionsFn || (attrs as any).selectOptionsFn
  const optList = (props as any).optionList || (attrs as any).optionList
  const incomingColumns = (props as any).columns || (attrs as any).columns

  if (isFunction(fn)) {
    try {
      const res = await fn()
      if (Array.isArray(res) || Array.isArray(res.data)) {
        const data = Array.isArray(res) ? res : res.data
        optionsByApi.value = data.map((item: any) => {
          return {
            ...item,
            label: item[effectiveLabelKey.value] ?? item.label,
            value: item[effectiveValueKey.value] ?? item.value
          }
        })
        // 如果目标组件需要嵌套列（columns 是数组的数组），可在这里做 wrap： [optionsByApi.value]
        selectOptions.value = optionsByApi.value
      } else {
        selectOptions.value = []
      }
    } catch (e) {
      console.warn('selectOptionsFn 执行错误：', e)
      selectOptions.value = []
    }
  } else if (Array.isArray(optList) && optList.length) {
    selectOptions.value = optList.map((item: any) => ({
      ...item,
      label: item[effectiveLabelKey.value] ?? item.label,
      value: item[effectiveValueKey.value] ?? item.value
    }))
  } else if (Array.isArray(incomingColumns) && incomingColumns.length) {
    selectOptions.value = incomingColumns
  } else {
    selectOptions.value = []
  }
}

// onMounted(async () => {
//   await loadOptions()
// })

watch(
  () => [
    (props as any).optionList,
    (props as any).selectOptionsFn,
    (props as any).columns,
    (attrs as any).optionList,
    (attrs as any).selectOptionsFn,
    (attrs as any).columns
  ],
  async () => {
    await loadOptions()
  },
  { immediate: true }
)

watch(
  () => props.modelValue,
  (newValue) => {
    selectValue.value = isDef(newValue) ? String(newValue) : ''
  },
  { immediate: true }
)

watch(
  () => props.columns,
  (newValue) => {
    // 可用于调试
    // console.log('props.columns changed:', newValue)
  },
  { immediate: true }
)

/**
 * 选择确认事件
 * @param event
 */
const handleConfirm = (event: any) => {
  uni.$emit(props.busName, event)
}

/**
 * 选择确认事件
 * @param event
 */
const handleChange = (event: any) => {
  console.log(event)

  emit('update:modelValue', event)
}

const handleOpen = () => {
  uni.$emit('eBusSelectComponent', true)
}

const handleClose = () => {
  uni.$emit('eBusSelectComponent', false)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-select`

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
  <view class="up-select">
    <wd-select-picker
      :label="label"
      :label-width="labelWidth"
      :label-key="effectiveLabelKey"
      :value-key="effectiveValueKey"
      :prop="field"
      :columns="selectOptions"
      @open="handleOpen"
      @close="handleClose"
      @confirm="handleConfirm"
      @change="handleChange"
      v-model="selectValue"
    ></wd-select-picker>
  </view>
</template>
