// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/storybook', '@nuxt/eslint', ['@pinia/nuxt',
    {
      autoImports: [
        // defineStoreの自動インポート
        'defineStore',
      ],
      // vuexも併用する場合は以下を追加
      // disableVuex: false ,
    },
  ], '@nuxtjs/storybook'],
  components: [
    { path: '~/components/', pathPrefix: false },
  ],
  srcDir: 'src/',
  compatibilityDate: '2024-12-01',

  typescript: {
    typeCheck: true, // nuxt devまたはnuxt build時に型チェックを実行
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
      },
    },
  },
  storybook: {
    host: 'http://localhost',
    port: 6006,
  },
})
