import { describe, expect, test } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import Index from '~/pages/index.vue'

describe('Index', () => {
  test('Indexページにタイトルが表示されていること', () => {
    // Arrange
    const { container } = render(Index)

    // textContentは前後に空白を付与したテキストを返却するのでtrimで空白を除去する必要があります
    const title = container.querySelector('[data-testid="page-title"]')?.textContent?.trim()

    // Assert
    expect(title).toBe('Pages/index.vue')
  })

  test('Input value should emit', async () => {
    // Arrange
    const { container } = render(Index)
    const input = container.querySelector('[data-testid="text-input"]') as HTMLInputElement

    // Act
    await fireEvent.update(input, 'Test')

    // Assert
    expect(input.value).toBe('Test')
  })
})
