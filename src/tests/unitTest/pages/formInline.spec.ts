import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { waitPerfectly } from '../setup'
import Form from '~/pages/formInline.vue'

vi.useFakeTimers()

const mockPush = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

describe('Form', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('画面初期状態の確認', () => {
    test('ページが描画されていること', () => {
      // Arrange
      const { container } = render(Form)

      // textContentは前後に空白を付与したテキストを返却するのでtrimで空白を除去する必要があります
      const title = container.querySelector('[data-testid="page-title"]')?.textContent?.trim()

      // Assert
      expect(title).toBe('Login')
    })

    test('送信ボタンが非活性であること', async () => {
      // Arrange
      const { container } = render(Form)

      // render直後はHTMLButtonElement.disabledが常にfalseを返すため、flushPromisesを呼び出して正常な値に更新する必要があります。
      await waitPerfectly()
      const isDisabled = (container.querySelector('[data-testid="submit-btn"]') as HTMLButtonElement).disabled

      // Assert
      expect(isDisabled).toBeTruthy()
    })
  })

  describe('vee-validateの動作確認', () => {
    test.each([
      ['email'],
      ['password']
    ])(
      '%sが入力必須の項目であること',
      async (
        inputName
      ) => {
        // Arrange
        const { container } = render(Form)
        const inputElement = container.querySelector(`[data-testid="input-${inputName}"]`) as HTMLInputElement

        // Act
        await fireEvent.update(inputElement, '')
        await fireEvent.blur(inputElement)
        await waitPerfectly()
        const errorMsg = container.querySelector(`[data-testid="${inputName}-error-msg"]`)?.textContent

        // Assert
        expect(errorMsg).toBe(`${inputName}は必須項目です`)
      })

    test('emailの入力は有効なメールアドレス形式であること', async () => {
      // Arrange
      const { container } = render(Form)
      const inputElement = container.querySelector('[data-testid="input-email"]') as HTMLInputElement
      // Act
      await fireEvent.update(inputElement, 'abc')
      await fireEvent.blur(inputElement)
      await waitPerfectly()
      const errorMsgInputInvalidValue = container.querySelector('[data-testid="email-error-msg"]')?.textContent

      await fireEvent.update(inputElement, 'abc@abc.com')
      await fireEvent.blur(inputElement)
      await waitPerfectly()
      const errorMsgInputValidValue = container.querySelector('[data-testid="email-error-msg"]')?.textContent

      // Assert
      expect(errorMsgInputInvalidValue).toBe('emailは有効なメールアドレスではありません')
      expect(errorMsgInputValidValue).toBeFalsy()
    })

    test('すべての項目へ有効な値を入力した場合は、送信ボタンが活性になること', async () => {
      // Arrange
      const { container } = render(Form)
      // You have to call flushPromises after render() called because HTMLButtonElement.disabled always return false in the initial state.
      await waitPerfectly()

      // Act
      const emailInputElement = container.querySelector('[data-testid="input-email"]') as HTMLInputElement
      await fireEvent.update(emailInputElement, 'abc@abc.com')
      await waitPerfectly()

      const passwordInputElement = container.querySelector('[data-testid="input-password"]') as HTMLInputElement
      await fireEvent.update(passwordInputElement, '123')
      await waitPerfectly()

      const submitElement = container.querySelector('[data-testid="submit-btn"]') as HTMLButtonElement
      const form = container.querySelector('[data-testid=validation-form"]') as HTMLFormElement
      form.dispatchEvent(new Event('submit'))
      await waitPerfectly()

      // Assert
      expect(submitElement.disabled).toBeFalsy()
    })

    test('送信ボタンを押下した場合は、送信処理が実行されること', async () => {
      const submitFn = vi.fn()

      // Arrange
      const { container } = render(Form, { global: { mocks: { submit: submitFn } } })

      const emailInputElement = container.querySelector('[data-testid="input-email"]') as HTMLInputElement
      await fireEvent.update(emailInputElement, 'abc@abc.com')
      await fireEvent.blur(emailInputElement)
      await waitPerfectly()

      const passwordInputElement = container.querySelector('[data-testid="input-password"]') as HTMLInputElement
      await fireEvent.update(passwordInputElement, '123')
      await fireEvent.blur(passwordInputElement)
      await waitPerfectly()

      // Act
      const form = container.querySelector('[data-testid=validation-form"]') as HTMLFormElement
      // useFormではなくFormコンポーネントを使用している場合は、submitボタンを押下してもイベントが発火しないのでsubmitイベントを手動で発火させる
      form.dispatchEvent(new Event('submit'))
      await waitPerfectly()

      // Assert
      expect(submitFn).toHaveBeenCalledOnce()
      expect(mockPush).toHaveBeenCalledWith('/myPage')
    })
  })
})
