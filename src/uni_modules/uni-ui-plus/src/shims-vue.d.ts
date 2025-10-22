// ...existing code...
declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, any, any>
  export default component
}
// ...existing code...
