export default defineNuxtRouteMiddleware((to, from) => {
  // 「/」にアクセスがあった場合
  if (to.path === '/') {
    // formScript.vueへリダイレクト
    return navigateTo('formScript')
  }
})
