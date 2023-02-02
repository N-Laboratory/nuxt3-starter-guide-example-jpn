import { localize, setLocale } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import AllRules from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { vi } from 'vitest'
import flushPromises from 'flush-promises'
import { RouteLocationNormalized, NavigationGuard } from 'vue-router'

// defineNuxtRouteMiddlewareのスタブ化
interface RedirectMiddleware {
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized
  ): ReturnType<NavigationGuard>;
}
const stubMiddleWare = (middleware: RedirectMiddleware) => middleware
vi.stubGlobal('defineNuxtRouteMiddleware', stubMiddleWare)

// vee-validateセットアップ
configure({
  generateMessage: localize({
    en,
    // エラーメッセージの日本語化
    ja
  })
})

Object.keys(AllRules).forEach((rule) => {
  // すべてのバリデーションルール読み込み
  defineRule(rule, AllRules[rule])
})

// エラーメッセージの日本語化
setLocale('ja')

// fireEvent実行後に以下の関数を呼ぶこと (fireEventでHTMLを操作した際に、操作結果をHTMLに反映させるため)
export const waitPerfectly = async () => {
  await flushPromises()
  vi.runAllTimers()
  await flushPromises()
}
