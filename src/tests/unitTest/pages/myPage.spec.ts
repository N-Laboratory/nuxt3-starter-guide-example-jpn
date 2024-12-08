import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import MyPage from '~/pages/myPage.vue'

describe('Mypage', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('ページが描画されていること', () => {
    // Arrange
    render(MyPage)
    const title = screen.getByRole('heading', { level: 1 })?.textContent?.trim()

    // Assert
    expect(title).toBe('MyPage')
  })

  test('emailとpasswordがstoreのユーザ情報の値で設定されていること', () => {
    // Arrange
    render(MyPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: { user: { email: 'Initial email', password: 'Initial password' } },
            },
          }),
        ],
      },
    })

    const email = screen.getByText('Email:', { exact: false }).textContent?.trim()
    const password = screen.getByText('Password:', { exact: false }).textContent?.trim()

    // Assert
    expect(email).toBe('Email: Initial email')
    expect(password).toBe('Password: Initial password')
  })
})
