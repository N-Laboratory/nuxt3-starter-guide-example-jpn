import { beforeEach, describe, expect, test } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../../../store/user'

const initialUser = {
  email: '',
  password: ''
}
const updatedUser = {
  email: 'new email',
  password: 'new password'
}

describe('Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('storeのユーザー情報が初期化されていること', () => {
    // Arrange
    const store = useUserStore()

    // Assert
    expect(store.user).toEqual(initialUser)
  })

  test('setUserInfoを呼び出した場合, storeのユーザー情報が更新されること', () => {
    // Arrange
    const store = useUserStore()

    // Act
    store.setUserInfo(updatedUser.email, updatedUser.password)

    // Assert
    expect(store.user).toEqual(updatedUser)
  })
})
