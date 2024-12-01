import { afterEach, describe, expect, test, vi } from 'vitest'
import type { RouteRecordNormalized, RouteLocationNormalized } from 'vue-router'
import redirect from '~/middleware/redirect.global'

vi.useFakeTimers()

const navigateToFn = vi.fn()
vi.stubGlobal('navigateTo', navigateToFn)

describe('RedirectMiddleware', () => {
  const routeRecordNormalized: RouteRecordNormalized = {
    path: '/',
    redirect: '',
    name: 'index',
    components: undefined,
    children: [],
    meta: { requiredAuth: true },
    props: { props: true },
    beforeEnter: [],
    leaveGuards: '' as any,
    updateGuards: '' as any,
    enterCallbacks: '' as any,
    instances: '' as any,
    aliasOf: undefined,
    mods: {},
  }

  afterEach(() => {
    navigateToFn.mockReset()
  })

  test('[/]にアクセスがあった場合、 [formScript]にリダイレクトされること', async () => {
    // Arrange
    const route: RouteLocationNormalized = {
      matched: [routeRecordNormalized],
      fullPath: '',
      query: { uid: 'foo' },
      hash: '',
      redirectedFrom: undefined,
      path: '/',
      name: 'index',
      meta: { requiredAuth: true },
      params: '' as any
    }

    // Act
    await redirect(route, route)

    // Assert
    expect(navigateToFn).toHaveBeenCalledWith('formScript')
  })

  test('[myPage]にアクセスがあった場合、 [formScript]にリダイレクトされること', async () => {
    // Arrange
    const route: RouteLocationNormalized = {
      matched: [routeRecordNormalized],
      fullPath: '',
      query: { uid: 'foo' },
      hash: '',
      redirectedFrom: undefined,
      path: '/myPage',
      name: 'myPage',
      meta: { requiredAuth: true },
      params: '' as any
    }

    // Act
    await redirect(route, route)

    // Assert
    expect(navigateToFn).toHaveBeenCalledWith('formScript')
  })

  test('[formInline]にアクセスがあった場合、 [formScript]にリダイレクトされないこと', async () => {
    // Arrange
    const route: RouteLocationNormalized = {
      matched: [routeRecordNormalized],
      fullPath: '',
      query: { uid: 'foo' },
      hash: '',
      redirectedFrom: undefined,
      path: '/formInline',
      name: 'formInline',
      meta: { requiredAuth: true },
      params: '' as any
    }

    // Act
    await redirect(route, route)

    // Assert
    expect(navigateToFn).not.toHaveBeenCalledWith('formScript')
  })
})
