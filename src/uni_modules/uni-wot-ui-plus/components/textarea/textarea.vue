<template>
  <view class="ck-textarea">
    <wd-textarea
      type="textarea"
      show-word-limit
      v-model="inputValue"
      border
      :label="label"
      :label-width="labelWidth"
      :maxlength="maxlength"
      :disabled="disabled"
      :placeholder="disabled ? '' : placeholder"
      :prop="field"
      :rules="rules"
      :required="required"
      :customClass="customClass"
      clearable
    />
  </view>
</template>

<script setup>
import { computed } from 'vue'
import wdTextarea from 'wot-design-uni/components/wd-textarea/wd-textarea.vue'
const props = defineProps({
  /** 双向绑定的值 */
  modelValue: {
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

  /** 文本宽度 */
  labelWidth: {
    type: String,
    default: ''
  },

  /** 验证规则 */
  pattern: {
    type: Object,
    default: () => {}
  },

  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },

  /** 是否必填 */
  required: {
    type: Boolean,
    default: false
  },

  /** 最大长度 */
  maxlength: {
    type: Number,
    default: 300
  },

  /** 提示语 */
  placeholder: {
    type: String,
    default: ''
  },
  /** 提示语 */
  customClass: {
    type: String,
    default: ''
  },
  /** 提示语 */
  height: {
    type: String,
    default: '120px'
  }
})
const emit = defineEmits(['update:modelValue'])

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
  if (props.pattern?.required) {
    rules.push({ required: true, message: '请填写' + props.label })
  }
  return rules
})
</script>

<style lang="scss" scoped>
.ck-textarea {
  :deep(.wd-textarea) {
    height: calc(100% - 20px);
    box-sizing: border-box;

    .wd-textarea__value,
    .wd-textarea__inner {
      height: 100%;
    }
  }
}
</style>
