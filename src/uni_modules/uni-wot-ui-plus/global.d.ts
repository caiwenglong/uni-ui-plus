declare module 'vue' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    // 基础组件
    UpAutocomplete: typeof import('./components/autocomplete/autocomplete.vue')['default']
    UpBlockTitle: typeof import('./components/blockTitle/blockTitle.vue')['default']
    UpButton: typeof import('./components/button/button.vue')['default']
    UpCalendar: typeof import('./components/calendar/calendar.vue')['default']
    UpDatetimePicker: typeof import('./components/datetimePicker/datetimePicker.vue')['default']
    UpForm: typeof import('./components/form/form.vue')['default']
    UpInput: typeof import('./components/input/input.vue')['default']
    UpMultiSelect: typeof import('./components/multiSelect/multiSelect.vue')['default']
    UpSelect: typeof import('./components/select/select.vue')['default']
    UpWdSelectPicker: typeof import('./components/select/wd-select-picker/wd-select-picker.vue')['default']
    UpTextarea: typeof import('./components/textarea/textarea.vue')['default']
    // 可以根据需要添加更多组件
  }
}

export {}
