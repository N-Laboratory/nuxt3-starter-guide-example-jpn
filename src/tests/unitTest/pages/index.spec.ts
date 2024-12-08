import { vi, describe, expect, test, afterEach } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { useFetch } from '@vueuse/core'
import userEvent from '@testing-library/user-event'
import Index from '~/pages/index.vue'

vi.useFakeTimers()

vi.mock('@vueuse/core', () => {
  return {
    useFetch: vi.fn(),
  }
})

describe('Index', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('Indexページにタイトルが表示されていること', () => {
    // Arrange
    render(Index)
    const title = screen.getByRole('heading', { level: 1 })?.textContent?.trim()

    // Assert
    expect(title).toBe('Pages/index.vue')
  })

  test('入力した値が画面に表示されること', async () => {
    // Arrange
    const user = userEvent.setup({ delay: null })
    render(Index)
    const input = screen.getByPlaceholderText('text')

    // Act
    await user.type(input, 'Test')

    // Act
    expect(await screen.findByText('Input value = Test')).toBeTruthy()
  })

  test('UUID取得ボタンを押下すると画面にUUIDが表示されること', async () => {
    // Arrange
    vi.mocked(useFetch).mockImplementation(
      vi.fn().mockReturnValue({
        json: vi.fn().mockReturnValue({
          data: ref({ uuid: 'Test uuid' }),
        }),
      }),
    )
    const user = userEvent.setup({ delay: null })
    render(Index)

    // Act
    await user.click(screen.getByRole('button'))

    // Assert
    expect(screen.getByText('UUID = Test uuid')).toBeTruthy()
  })
})
