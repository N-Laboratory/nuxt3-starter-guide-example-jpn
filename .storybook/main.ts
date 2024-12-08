import path from 'path'
import type { StorybookConfig } from '@storybook/vue3-vite'
import AutoImportFunctions from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'

const config: StorybookConfig = {
  viteFinal: async (config) => {
    if (config?.plugins) {
      // 以下を追加
      config.plugins.push(
        AutoImportFunctions ({ imports: [
          'vue',
          'vee-validate',
          'vue-router',
          'pinia',
        ], dts: '.storybook/auto-imports.d.ts' }),
      )
      // 以下を追加
      config.plugins.push(
        AutoImportComponents({
          // 自動インポートするコンポーネントが存在するディレクトリを指定
          dirs: ['src/components'],
          dts: '.storybook/components.d.ts',
        }),
      )
    }
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
        '~': path.resolve(__dirname, '../src'),
      }
    }
    return config
  },
  staticDirs: ['../public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
}
export default config
