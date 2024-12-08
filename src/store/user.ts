// nuxt.config.tsのautoImportsにdefineStoreを追加している場合はこのimport文は不要です。
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // ユーザーの定義・初期化
    user: { email: '', password: '' },
  }),
  actions: {
    // ユーザー情報の更新
    setUserInfo(email: string, password: string) {
      this.user.email = email
      this.user.password = password
    },
  },
})
