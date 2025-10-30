<template>
  <view>
    <wd-input
      :label="label"
      :label-width="labelWidth"
      :prop="field"
      :clearable="clearable"
      :size="size"
      :disabled="disabled"
      v-model="inputValue"
      :rules="rules"
      :required="required"
      :suffix-icon="suffixIcon"
      :no-border="noBorder"
      @input="handleInputChange"
      @clicksuffixicon="handleSuffixIconChange"
      :placeholder="disabled ? '' : placeholder"
    ></wd-input>

    <wd-action-sheet v-model="showActionSheet" :actions="actions" @select="selectActionSheet" />
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import WdInput from 'wot-design-uni/components/wd-input/wd-input.vue'
import { isFunction, isArray } from '../_utils'

const props = defineProps({
  /** 双向绑定的值 */
  modelValue: {
    type: [String, Number],
    default: ''
  },

  // 获取下拉列表
  selectOptionsFn: {
    type: Function,
    default: undefined
  },

  /** 字段名 */
  field: {
    type: String,
    default: ''
  },

  /** 文本名称 */
  label: {
    type: String,
    default: ''
  },

  optionName: {
    type: String,
    default: 'label'
  },

  /** 文本宽度 */
  labelWidth: {
    type: String,
    default: ''
  },

  /** 验证规则 */
  pattern: {},

  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否显示清空按钮 */
  clearable: {
    type: Boolean,
    default: false
  },
  /** 是否显示清空按钮 */
  size: {
    type: String,
    default: 'small'
  },

  /** 是否禁用 */
  noBorder: {
    type: Boolean,
    default: false
  },

  /** 前置 */
  prefix: {
    type: String,
    default: ''
  },

  /** 后置 */
  suffix: {
    type: String,
    default: ''
  },
  /** 后置图标*/
  suffixIcon: {
    type: String,
    default: 'list'
  },

  /** 币种 */
  currencyCode: {
    type: String,
    default: ''
  },

  /** 提示语 */
  placeholder: {
    type: String,
    default: ''
  },

  /** 数据来源字段 */
  dataField: {
    type: String,
    default: 'data'
  },

  /** 数据来源字段 */
  optionList: {
    type: Array,
    default: () => []
  },

  /** 是否必填 */
  required: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const showActionSheet = ref(false)

const actions = ref<any[]>([])

/** 得到装箱绑定的值 */
let inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

/** 组装校验规则 */
const rules = computed(() => {
  let rules = []
  if (props.required) {
    rules.push({ required: true, message: '请填写' + props.label })
  }
  return rules
})

onMounted(async () => {
  handleSetActions(props.optionList)
})

const handleSetActions = (optionList: any[]) => {
  optionList.forEach((item) => {
    item.name = item[props.optionName]
  })
  actions.value = optionList
}

const handleInputChange = (val: any) => {
  emit('update:modelValue', val.value)
}

const handleSuffixIconChange = async () => {
  if (isFunction(props.selectOptionsFn)) {
    const data = await props.selectOptionsFn()
    const optionList = isArray(data) ? data : (!!data && data[props.dataField]) || []
    handleSetActions(optionList)
  }
  showActionSheet.value = true
}

const selectActionSheet = ({ item }) => {
  inputValue.value = item.name
}
</script>
