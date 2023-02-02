import { beforeEach, describe, expect, test} from 'vitest'
import { render } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import MyPage from '~/pages/myPage.vue'

describe('Mypage', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('ページが描画されていること', () => {
    // Arrange
    const { container } = render(MyPage)

    // textContentは前後に空白を付与したテキストを返却するのでtrimで空白を除去する必要があります
    const title = container.querySelector('[data-testid="page-title"]')?.textContent?.trim()

    // Assert
    expect(title).toBe('MyPage')
  })

  test('emailとpasswordがstoreのユーザ情報の値で設定されていること.', () => {
    // Arrange
    const { container } = render(MyPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: { user: { email: 'Initial email', password: 'Initial password' } }
            }
          })
        ]
      }
    })

    const email = container.querySelector('[data-testid="page-email"]')?.textContent
    const password = container.querySelector('[data-testid="page-password"]')?.textContent

    // Assert
    expect(email).toBe('Initial email')
    expect(password).toBe('Initial password')
  })
})
