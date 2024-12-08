import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { launch } from 'puppeteer'
import type { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer'

// ブラウザの起動オプションの設定。使用できるパラメータに関しての詳細は以下を参照ください。
// https://pptr.dev/api/puppeteer.browserlaunchargumentoptions
const options: PuppeteerLaunchOptions = {
  headless: false,
  slowMo: 75,
  defaultViewport: {
    width: 1280,
    height: 1024,
  },
  devtools: true,
  args: ['--window-size=1680,1024'],
}

describe('Index', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await launch(options)
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  describe('画面初期状態の確認', () => {
    test('1-送信ボタンが非活性であること', async () => {
      try {
        // Act
        await page.goto('http://localhost:3000/formInline')
        const isDisabled = await page.$eval(
          '[data-testid="submit-btn"]',
          element => (element as HTMLButtonElement).disabled,
        )

        // スクリーンショットの撮影
        await page.screenshot({
          path: './src/tests/e2eTest/evidence/pages/formInline/test-01.png',
          fullPage: true,
        })

        // Assert
        expect(isDisabled).toBeTruthy()
      }
      catch (e) {
        console.error(e)
        expect(e).toBeUndefined()
      }
    }, 60000)
  })

  describe('フォームのバリデーションチェック', () => {
    test.each([
      [
        '2',
        'email',
      ],
      [
        '3',
        'password',
      ],
    ])(
      '%s:%sが入力必須の項目であること',
      async (
        testNo,
        inputName,
      ) => {
        try {
          // Act
          await page.goto('http://localhost:3000/formInline')
          await page.type(`input[name="${inputName}"]`, '')
          await page.keyboard.press('Tab')

          await page.screenshot({
            path: `./src/tests/e2eTest/evidence/pages/formInline/test-0${testNo}.png`,
            fullPage: true,
          })

          const errorMsg = await page.$eval(
            `[data-testid="${inputName}-error-msg"]`,
            element => element.textContent,
          )

          // Assert
          expect(errorMsg).toBe(`${inputName}は必須項目です`)
        }
        catch (e) {
          console.error(e)
          expect(e).toBeUndefined()
        }
      },
      60000,
    )

    test('4-emailの入力は有効なメールアドレス形式であること', async () => {
      try {
        // Act
        await page.goto('http://localhost:3000/formInline')
        await page.type('input[name="email"]', 'test')
        await page.keyboard.press('Tab')

        await page.screenshot({
          path: './src/tests/e2eTest/evidence/pages/formInline/test-04.png',
          fullPage: true,
        })

        const errorMsg = await page.$eval(
          '[data-testid="email-error-msg"]',
          element => element.textContent,
        )

        // Assert
        expect(errorMsg).toBe('emailは有効なメールアドレスではありません')
      }
      catch (e) {
        console.error(e)
        expect(e).toBeUndefined()
      }
    }, 60000)

    test('5-送信ボタンを押下した場合、myPageへ遷移すること', async () => {
      try {
        // Arrange
        await page.goto('http://localhost:3000/formInline')
        await page.type('input[name="email"]', 'test@test.com')
        await page.type('input[name="password"]', 'test')
        await page.keyboard.press('Tab')
        const isDisabled = await page.$eval(
          '[data-testid="submit-btn"]',
          element => (element as HTMLButtonElement).disabled,
        )

        // Act
        await page.click('[data-testid="submit-btn"]')

        await page.screenshot({
          path: './src/tests/e2eTest/evidence/pages/formInline/test-05.png',
          fullPage: true,
        })

        const pageTitle = await page.$eval(
          '[data-testid="page-title"]',
          element => element.textContent?.trim(),
        )
        const email = await page.$eval(
          '[data-testid="page-email"]',
          element => element.textContent,
        )
        const password = await page.$eval(
          '[data-testid="page-password"]',
          element => element.textContent,
        )

        // Assert
        expect(isDisabled).toBe(false)
        expect(pageTitle).toBe('MyPage')
        expect(email).toBe('test@test.com')
        expect(password).toBe('test')
      }
      catch (e) {
        console.error(e)
        expect(e).toBeUndefined()
      }
    }, 60000)
  })
})
