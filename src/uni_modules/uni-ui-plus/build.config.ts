import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'rollup',
      input: './src/index',
      outDir: './dist'
    }
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true
  },
  externals: ['vue', 'wot-design-uni', '@uni-helper/vite-plugin-uni-components', '@dcloudio/uni-ui']
})
