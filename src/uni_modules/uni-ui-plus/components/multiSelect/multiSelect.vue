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
      :filterable="filterable"
      @confirm="handleConfirm"
      :type="type"
      :use-default-slot="useDefaultSlot"
    >
      <slot></slot>
    </wd-select-picker>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import wdSelectPicker from 'wot-design-uni/components/wd-select-picker/wd-select-picker.vue'
const props = defineProps({
  /** 双向绑定的值 */
  modelValue: {
    type: String,
    default: ''
  },

  /** 双向绑定的值 */
  options: {
    type: Array,
    default: () => []
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
  filterable: {
    type: Boolean,
    default: true
  },

  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },

  /** 字典名称 */
  dictName: {
    type: String,
    default: ''
  },

  /** 值对应的字段 */
  valueField: {
    type: String,
    default: 'value'
  },

  /** 文本对应的字段 */
  labelField: {
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

  /** 类型，单线还是多选 */
  type: {
    type: String,
    default: 'checkbox'
  },

  /** 是否开启插槽 */
  useDefaultSlot: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'handleConfirm'])

/** 得到装箱绑定的值 */
let inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

/** 获取下拉选择框的下拉选项 */
const selectOptions = computed(() => {
  return []
})

/** 值对应的字段 */
const valueKey = computed(() => {
  return props.valueField
})

/** 文本对应的字段 */
const labelKey = computed(() => {
  return props.labelField
})

/** 组装校验规则 */
const rules = computed(() => {
  let rules = []
  if (props.pattern?.required) {
    rules.push({ required: true, message: '选择' + props.label })
  }
  return rules
})

/**
 * 选择确认事件
 * @param event
 */
const handleConfirm = (event) => {
  emit('handleConfirm', event)
  uni.$emit(props.busName, event)
}
</script>

<style></style>
