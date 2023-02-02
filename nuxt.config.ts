// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  typescript: {
    shim: false, // shimsファイル生成の無効化（VSCodeでVolarを使う場合はfalseにする）
    strict: true, // 型チェックを厳格化
    typeCheck: true // nuxt devまたはnuxt build時に型チェックを実行
  },
  modules: [
    ['@pinia/nuxt',
      {
        autoImports: [
          // defineStoreの自動インポート
          'defineStore'
        ]
        // vuexも併用する場合は以下を追加
        // disableVuex: false ,
      }
    ]
  ]
})
