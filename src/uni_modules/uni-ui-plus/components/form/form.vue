<template>
  <view v-if="formData" :class="[{ 'ck-form-with-footer': showFooter }, 'ck-form-wrapper']">
    <wd-form ref="refForm" :model="formData">
      <wd-cell-group border>
        <wd-row>
          <wd-col v-for="(formItem, i) in formItems" :key="(formItem?.label ?? '') + i" :span="formItem?.span">
            <template v-if="formItem?.type === enumFormItemType.line">
              <wd-gap bg-color="#f8f8f8" height="16rpx"></wd-gap>
            </template>

            <!-- 自定义组件 -->
            <template v-if="formItem.custom">
              <slot name="custom" :formItem="formItem" :formData="formData"></slot>
              <slot name="nextCustom" :formItem="formItem" :formData="formData"></slot>
              <slot name="otherCustom" :formItem="formItem" :formData="formData"></slot>
            </template>

            <!-- 输入框 -->
            <template v-if="!formItem?.type || formItem?.type === enumFormItemType.input">
              <UpInput
                v-model="formData[formItem?.field]"
                :currency-code="formData[formItem?.currencyCode]"
                :disabled="formItem?.disabled || disabled"
                v-bind="formItem"
              ></UpInput>
            </template>

            <!-- 选择框 -->
            <template v-if="formItem?.type === enumFormItemType.select">
              <UpSelect
                v-model="formData[formItem?.field]"
                :disabled="formItem?.disabled || disabled"
                v-bind="formItem"
                :formValue="formData"
                :selectOptionsFn="formItem.selectOptionsFn"
                :columns="formItem.columns"
              ></UpSelect>
            </template>
          </wd-col>
        </wd-row>
      </wd-cell-group>
      <view class="footer-btn-wrapper">
        <slot name="formFooter"></slot>

        <view class="btn-wrapper" v-if="showFooter">
          <wd-button custom-class="ck-button" type="primary" size="large" @click="handleSubmit" block>保存</wd-button>
        </view>
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
import { forEach } from 'lodash-es'
import { onMounted, defineComponent, ref, computed, watch } from 'vue'
import { PREFIX } from '../_constants'
import { useTranslate } from '../composables-fn/useTranslate'
import { enumFormItemType } from './form'
import DynamicSlot from './DynamicSlot.vue'
const { translate } = useTranslate()

const props = defineProps({
  // 表单配置项
  formItems: {
    type: Array as () => any[],
    default: () => []
  },

  // 绑定的的值
  modelValue: {
    type: Object,
    default: () => {}
  },

  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },

  // 是否显示操作按钮
  showFooter: {
    type: Boolean,
    default: false
  },

  labelWidth: {
    type: String,
    default: '80rpx'
  }
})
const emit = defineEmits(['update:modelValue', 'submitForm'])
const refForm = ref()

const formData = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

watch(
  () => props.formItems,
  (val) => {
    if (val && val.length) {
      forEach(val, (item: any, index: number) => {
        // 如果没有type，那么默认type为 input
        if (!item.type) {
          item.type = enumFormItemType.input
        }

        let placeholderPrefix // placeholder前缀
        let trigger // 触发事件
        if (item.type === enumFormItemType.input || item.type === enumFormItemType.textarea) {
          placeholderPrefix = translate('pleaseInput')
          trigger = 'blur'
        }
        if (item.type === enumFormItemType.select) {
          placeholderPrefix = translate('pleaseSelect')
          trigger = 'change'
        }
        if (!item.placeholder) {
          item['placeholder'] = placeholderPrefix + item.label // 设置 placeholder
        }
      })
    }
  },
  {
    immediate: true
  }
)

onMounted(() => {})

/**
 * 验证表单
 */
const handleValidateForm = (): Promise<{ valid: boolean }> => {
  return new Promise((resolve, reject) => {
    refForm.value
      .validate()
      .then((valid: boolean) => {
        resolve({ valid })
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

/**
 * 重置表单
 */
const handleResetForm = () => {
  refForm.value.reset()
}

/**
 * 导出方法供父级使用
 */
defineExpose({
  handleValidateForm,
  handleResetForm
})

const handleSubmit = async () => {
  let { valid } = await handleValidateForm()
  if (!valid) return
  emit('submitForm', props.modelValue)
}

/**
 * 跳转到指定页面
 */
function handleGoPage(url: string, flag?: string) {
  uni.navigateTo({
    url: url
  })
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-form`

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

<style lang="scss" scoped>
.ck-form-wrapper {
  &.ck-form-with-footer {
    padding-bottom: calc(constant(safe-area-inset-bottom) + 60px);
    padding-bottom: calc(env(safe-area-inset-bottom) + 60px);
  }

  :deep(.is-disabled) {
    .is-required {
      padding-left: 0 !important;

      &:after {
        display: none;
      }
    }

    .wd-col-picker__value,
    .wd-input__value,
    .wd-input__inner,
    .wd-picker__value {
      text-align: right;
      color: $uni-text-color !important;
      margin-right: 0;

      &.wd-picker__placeholder {
        color: #bfbfbf !important;
      }
    }

    .wd-textarea__value,
    .wd-textarea__value .wd-textarea__inner,
    .uni-textarea-textarea,
    .uni-input-input:disabled {
      color: $uni-text-color !important;
    }

    .wd-input__value,
    .wd-input__placeholder {
      text-align: right;
    }
  }

  :deep(.form-gap) {
    position: absolute;
    width: calc(100% + 40rpx);
    margin-left: -20rpx;
  }
}
</style>
