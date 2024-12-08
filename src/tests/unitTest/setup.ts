import { localize, setLocale } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import { defineRule, configure } from 'vee-validate'
import { vi } from 'vitest'
import type { RouteLocationNormalized, NavigationGuard } from 'vue-router'
import { all } from '@vee-validate/rules'

// defineNuxtRouteMiddlewareのスタブ化
interface RedirectMiddleware {
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized
  ): ReturnType<NavigationGuard>
}
const stubMiddleWare = (middleware: RedirectMiddleware) => middleware
vi.stubGlobal('defineNuxtRouteMiddleware', stubMiddleWare)

// vee-validateセットアップ
configure({
  generateMessage: localize({
    en,
    // エラーメッセージの日本語化
    ja,
  }),
})

Object.entries(all).forEach(([name, rule]) => {
  // すべてのルールをインポート
  defineRule(name, rule)
})

// エラーメッセージの日本語化
setLocale('ja')
