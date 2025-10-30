<template>
  <view>
    <wd-select-picker
      :label="label"
      :label-width="labelWidth"
      :prop="field"
      v-model="inputValue"
      :columns="selectOptions"
      :value-key="valueKey"
      :label-key="labelKey"
      :rules="rules"
      :disabled="disabled"
      :placeholder="disabled ? '' : placeholder"
      :type="selectType"
      :filterable="filterable"
      :required="required"
      :show-confirm="false"
      :isVirtual="isVirtual"
      @open="handleOpen"
      @close="handleClose"
      @confirm="handleConfirm"
      @change="handleChange"
      @filterSearch="handleChangeFilterSearch"
    ></wd-select-picker>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, onMounted } from 'vue'
import wdSelectPicker from './wd-select-picker/wd-select-picker.vue'
import { isFunction, isArray } from 'lodash-es'

const props = defineProps({
  /** 双向绑定的值 */
  modelValue: {
    type: [String, Number, Array],
    default: ''
  },

  /** 双向绑定的值 */
  optionList: {
    type: Array,
    default: () => []
  },

  // 获取下拉列表
  selectOptionsFn: {
    type: Function,
    default: undefined
  },

  // 表单数据
  formValue: {
    type: Object,
    default: () => {}
  },

  /** 字段文本名 */
  textFiledName: {
    type: String,
    default: ''
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

  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },

  /** 值对应的字段 */
  valueKey: {
    type: String,
    default: 'value'
  },

  /** 文本对应的字段 */
  labelKey: {
    type: String,
    default: 'label'
  },

  /** 文本宽度 */
  labelWidth: {
    type: String,
    default: ''
  },

  /** event bus名称 */
  busName: {
    type: String,
    default: 'busSelect'
  },

  /** 下拉框标识 */
  flag: {
    type: String,
    default: ''
  },

  /** 验证规则 */
  pattern: {},

  /** 提示语 */
  placeholder: {
    type: String,
    default: ''
  },

  /** 提示语 */
  dataField: {
    type: String,
    default: 'data'
  },

  /**
   * type 默认值为 checkbox， 为默认值时，value 值类型为 Array 类型
   * 设置 type 值为 radio ，开启单选类型，value 值类型为 String Number 或 Boolean。
   */
  selectType: {
    type: String,
    default: 'radio'
  },

  filterable: {
    type: Boolean,
    default: true
  },

  required: {
    type: Boolean,
    default: false
  },

  isVirtual: {
    type: Boolean,
    default: false
  },

  // 是否是通过调用方法获取options
  isApiOptions: {
    type: Boolean,
    default: true
  },

  // 额外参数
  extra: {
    type: Object,
    default: () => {}
  },

  hideItems: {
    type: Array,
    default: () => []
  }
})
const { selectOptionsFn } = props
const { labelKey, valueKey, textFiledName, formValue, filterable, isVirtual, isApiOptions, optionList, selectType, extra } = toRefs(props)
const emit = defineEmits(['update:modelValue'])

// 获取数据源
const optionsByApi = ref<any[]>([])
const showOptions = ref<any[]>([])
onMounted(async () => {
  if (isFunction(selectOptionsFn)) {
    const data = await selectOptionsFn()
    optionsByApi.value = isArray(data) ? data : (!!data && data[props.dataField]) || []
    isVirtual.value && (showOptions.value = optionsByApi.value?.slice(0, 20)) // 初始只取20条
  }
  if (isVirtual.value && !isApiOptions.value) {
    showOptions.value = optionList.value?.slice(0, 20) // 初始只取20条
  }

  if (isVirtual.value && props.modelValue) {
    showOptions.value = handleGetOptionsByValue(props.modelValue)
  }
})

/** 得到装箱绑定的值 */
let inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    !!textFiledName.value && handleGetLabel(newValue)

    // 如果是多选，必填时，如果没选择，则设置为null，否则返回[] ,必填校验将会失效
    emit('update:modelValue', props.required && props.selectType === 'checkbox' && !newValue.length ? null : newValue)
  }
})

/** 获取下拉选择框的下拉选项 */
const selectOptions = computed(() => {
  if (isApiOptions.value) {
    return isVirtual.value ? showOptions.value : optionsByApi.value
  }

  return isVirtual.value ? showOptions.value : optionList.value
})

/** 组装校验规则 */
const rules = computed(() => {
  let rules = []
  if (props.required) {
    rules.push({ required: true, message: '选择' + props.label })
  }
  return rules
})

/** 所有的下列选项 */
const allOptions = computed(() => {
  return isApiOptions.value ? optionsByApi.value : optionList.value
})

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
const handleChange = (event: any) => {}
/**
 * 处理搜索过滤
 * @param {string} value 搜索关键词
 */
const handleChangeFilterSearch = (value: any) => {
  // 清空搜索时重置为前100条
  if (!value.trim()) {
    showOptions.value = isApiOptions.value ? optionsByApi.value?.slice(0, 100) : optionList.value?.slice(0, 100)
    return
  }

  // 执行过滤（不直接修改 selectOptions）
  showOptions.value = handleGetOptionsByLabel(value.trim())
}
/**
 * 根据文本获取数据
 * @param {string} label 搜索关键词
 */
const handleGetOptionsByLabel = (label: any) => {
  return allOptions.value.filter((item) => item[labelKey.value].includes(label))
}

/**
 * 根据值获取数据
 * @param {string} value 搜索关键词
 */
const handleGetOptionsByValue = (value: any) => {
  return allOptions.value.filter((item) => item[valueKey.value] === value)
}

/**
 * 根据value获取label
 * @param value
 */
const handleGetLabel = (value: any) => {
  if (value) {
    formValue.value[textFiledName.value] = selectOptions.value.find((item) => item[props.valueKey] === value)[labelKey.value]
  }
}

const handleOpen = () => {
  uni.$emit('eBusSelectComponent', true)
}

const handleClose = () => {
  uni.$emit('eBusSelectComponent', false)
}
</script>

<style></style>
