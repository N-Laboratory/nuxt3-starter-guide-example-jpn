import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/vue'
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
})
