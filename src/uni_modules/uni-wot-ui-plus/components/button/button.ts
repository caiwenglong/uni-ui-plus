import type {
  ButtonLang,
  ButtonOnAddgroupappEvent,
  ButtonOnAgreeprivacyauthorizationEvent,
  ButtonOnChooseaddressEvent,
  ButtonOnChooseavatarEvent,
  ButtonOnChooseinvoicetitleEvent,
  ButtonOnErrorEvent,
  ButtonOnGetphonenumberEvent,
  ButtonOnLaunchappEvent,
  ButtonOnLoginEvent,
  ButtonOnOpensettingEvent,
  ButtonOnSubscribeEvent,
  ButtonOpenType
} from '@uni-helper/uni-app-types'
import type { ExtractPropTypes } from 'vue'
// import type { buttonProps } from 'wot-design-uni/components/wd-button/types.ts'

/**
 * 简化为通用的 wot-button 适配 props 与 emits
 * 若你有 wot-button 的类型定义，可替换 WotButtonEvent 为具体类型
 */
type WotButtonEvent = Record<string, any>

export const buttonProps = {
  // 常见 wot-button 属性（根据需要增减）
  type: { type: String, default: 'success' },
  size: { type: String, default: 'mini' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  plain: { type: Boolean, default: false },
  hairline: { type: Boolean, default: false },
  color: { type: String }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonEmits = {
  // wot-button 常见事件
  click: (evt?: WotButtonEvent) => evt === undefined || evt instanceof Object,
  longpress: (evt?: WotButtonEvent) => evt === undefined || evt instanceof Object,
  // 保留原有 uni-app 兼容事件
  getphonenumber: (evt: WotButtonEvent) => evt instanceof Object,
  getuserinfo: (evt: any) => evt instanceof Object,
  error: (evt: any) => evt instanceof Object,
  opensetting: (evt: any) => evt instanceof Object,
  launchapp: (evt: any) => evt instanceof Object,
  contact: (evt: any) => evt instanceof Object,
  chooseavatar: (evt: any) => evt instanceof Object,
  agreeprivacyauthorization: (evt: any) => evt instanceof Object,
  addgroupapp: (evt: any) => evt instanceof Object,
  chooseaddress: (evt: any) => evt instanceof Object,
  chooseinvoicetitle: (evt: any) => evt instanceof Object,
  subscribe: (evt: any) => evt instanceof Object,
  login: (evt: any) => evt instanceof Object,
  im: (evt: any) => evt instanceof Object
}

export type ButtonEmits = typeof buttonEmits
