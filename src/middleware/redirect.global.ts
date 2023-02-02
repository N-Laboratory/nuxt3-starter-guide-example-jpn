export default defineNuxtRouteMiddleware((to, from) => {
  // 「/」または「myPage」にアクセスがあった場合
  if (to.path === '/' || (to.path === '/myPage' && from.path === '/myPage')) {
    // formScript.vueへリダイレクト
    return navigateTo('formScript')
  }
})
