import { beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import userEvent from '@testing-library/user-event'
import Form from '~/pages/formScript.vue'

const mockPush = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('Form', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('画面初期状態の確認', () => {
    test('ページが描画されていること', () => {
      // Arrange
      render(Form)
      const title = screen.getByRole('heading', { level: 1 })?.textContent?.trim()

      // Assert
      expect(title).toBe('Login')
    })

    test('送信ボタンが非活性であること', async () => {
      // Arrange
      render(Form)

      await waitFor(async () => {
        // Assert
        const isDisabled = (await screen.findByRole('button') as HTMLButtonElement).disabled
        expect(isDisabled).toBe(true)
      })
    })
  })

  describe('vee-validateの動作確認', () => {
    test.each([
      ['email'],
      ['password'],
    ])(
      '%sが入力必須の項目であること',
      async (
        inputName,
      ) => {
        // Arrange
        const user = userEvent.setup()
        render(Form)
        const inputElement = screen.getByPlaceholderText(inputName)

        // Act
        await user.type(inputElement, 'test')
        await user.clear(inputElement)

        // Assert
        expect(await screen.findByText(`${inputName}は必須項目です`)).toBeTruthy()
      })

    test('emailの入力は有効なメールアドレス形式であること', async () => {
      // Arrange
      const user = userEvent.setup()
      render(Form)
      const email = screen.getByPlaceholderText('email')

      // Act
      await user.type(email, 'test')
      const errorMsgWithInvalidValue = await screen.findByText('emailは有効なメールアドレスではありません')
      await user.type(email, 'abc@abc.com')

      // Assert
      expect(errorMsgWithInvalidValue).toBeTruthy()
      await waitFor(() => {
        const errorMsgWithValidValue = screen.queryByText('emailは有効なメールアドレスではありません')
        expect(errorMsgWithValidValue).toBeNull()
      })
    })

    test('すべての項目へ有効な値を入力した場合は、送信ボタンが活性になること', async () => {
      // Arrange
      const user = userEvent.setup()
      render(Form)

      // Act
      await user.type(screen.getByPlaceholderText('email'), 'abc@abc.com')
      await user.type(screen.getByPlaceholderText('password'), '123')

      await waitFor(() => {
        // Assert
        const isDisabled = (screen.getByRole('button') as HTMLButtonElement).disabled
        expect(isDisabled).toBe(false)
      })
    })

    test('送信ボタンを押下した場合は、送信処理が実行されること', async () => {
      // Arrange
      const user = userEvent.setup()
      render(Form)
      await user.type(screen.getByPlaceholderText('email'), 'abc@abc.com')
      await user.type(screen.getByPlaceholderText('password'), '123')

      // Act
      await user.click(screen.getByRole('button'))

      // Assert
      await waitFor(() => {
        // Assert
        expect(mockPush).toHaveBeenCalledWith('/myPage')
      })
    })
  })
})
