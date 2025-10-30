export function useForm(): {
  handleSetFormItems: (formItems: any[]) => any[]
  handleResetForm: (formItems: any[]) => void
  handleValidateForm: (ckForm: any) => Promise<boolean>
  handleInitForm: (items: any[]) => any
} {
  /**
   * 设置表单项（排序和过滤隐藏项）
   * @param formItems 表单项数组
   * @returns 排序并过滤后的表单项数组
   */
  const handleSetFormItems = (formItems: any[]) => {
    // 使用原生 JavaScript 替代 lodash-es �?orderBy
    formItems = formItems.slice().sort((a, b) => {
      if (a.sort < b.sort) return -1
      if (a.sort > b.sort) return 1
      return 0
    })
    return formItems.filter((item) => {
      return !item.isHide
    })
  }

  /**
   * 初始化表单数据
   * @param formItems 表单项数组
   * @returns 初始化的表单数据对象
   */
  const handleInitForm = (formItems: any[]) => {
    const form: any = {}
    formItems?.forEach((item) => {
      if (item.defaultValue || item.defaultValue === 0) {
        form[item.field] = item.defaultValue
      } else {
        form[item.field] = ''
      }
    })
    return form
  }

  /**
   * 验证表单
   * @param ckForm 表单实例
   * @returns 验证结果Promise
   */
  const handleValidateForm = async (ckForm: any) => {
    const result = await ckForm.handleValidateForm()
    return result.valid
  }

  /**
   * 重置表单
   * @param ckForm 表单实例
   */
  const handleResetForm = (ckForm: any) => {
    ckForm.handleResetForm()
  }

  return {
    handleSetFormItems,
    handleInitForm,
    handleValidateForm,
    handleResetForm
  }
}
