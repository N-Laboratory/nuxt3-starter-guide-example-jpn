import { type Preview, setup } from '@storybook/vue3'
import type { App } from 'vue'
import { createPinia } from 'pinia'
import { localize, setLocale } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import { all } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { createMemoryHistory, createRouter } from 'vue-router'
import Form from '../src/pages/formScript.vue'
import MyPage from '../src/pages/myPage.vue'

// MSWの有効化
initialize({
  onUnhandledRequest: 'bypass',
})

configure({
  generateMessage: localize({
    // エラーメッセージの日本語化
    ja,
  }),
})

// すべてのルールをインポート
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule)
})

// エラーメッセージの日本語化
setLocale('ja')

const routes = [
  {
    path: '/',
    name: 'Form',
    component: Form,
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage,
  },
]
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
const pinia = createPinia()

setup((app: App) => {
  app.use(pinia)
  app.use(router)
})

const preview: Preview = {
  // MSWローダーの設定
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
