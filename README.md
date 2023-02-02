<h1 align="center">Nuxt 3 Starter Guide</h1>
<p align="center">
  <img src="https://img.shields.io/badge/-Typescript-00bfff.svg?logo=typescript&style=flat">
  <img src="https://img.shields.io/badge/-Nuxt.js-008000.svg?logo=nuxt.js&style=flat">
  <img src="https://img.shields.io/badge/-Node.js-lightyellow.svg?logo=node.js&style=flat">
  <img src="https://img.shields.io/badge/-ESLint-4B32C3.svg?logo=eslint&style=flat">
  <img src="https://img.shields.io/badge/-Vitest-FF8800.svg?logo=vitest&style=flat">
  <img src="https://img.shields.io/badge/-Puppeteer-lightyellow.svg?logo=puppeteer&style=flat">
  <img src="https://img.shields.io/badge/-SonarQube-white.svg?logo=sonarqube&style=flat">
  <img src="https://img.shields.io/badge/-Windows-0078D6.svg?logo=windows&style=flat">
  <img src="https://img.shields.io/badge/-Mac-grey.svg?logo=macos&style=flat">
  <img src="https://img.shields.io/badge/-Linux-black.svg?logo=linux&style=flat">
  <img src="https://img.shields.io/badge/-VSCode-007ACC.svg?logo=visualstudiocode&style=flat">
  <a href="https://twitter.com/NL4boratory" target="_blank">
    <img alt="Twitter: N-LAB" src="https://img.shields.io/twitter/follow/NL4boratory.svg?style=social" />
  </a>
  <a href="https://github.com/N-Laboratory" target="_blank">
    <img src="https://img.shields.io/badge/-FollowMyAccount-grey.svg?logo=github&style=flat">
  </a>
</p>


Nuxt3のテンプレートプロジェクトとして最低限必要な機能を実装し、要点を解説しています。
ユニットテスト、E2Eテスト、SonarQubeも取り扱っています。

このプロジェクトでは以下の機能を実装しています。
* Vitest (unit test)
* EsLint
* VeeValidate
* Navigation guard
* Pinia
* Puppeteer (E2E test)
* SonarQube

## Contents

1. [Create New Project](#create-new-project)
1. [Typescript Setup](#typescript-setup)
1. [EsLint Setup with Typescript](#eslint-setup-with-typescript)
1. [Vitest Setup](#vitest-setup)
1. [VeeValidate Setup](#veevalidate-setup)
1. [VeeValidate Testing](#veevalidate-testing)
1. [Navigation guard](#navigation-guard)
1. [Pinia Setup](#pinia-setup)
1. [Pinia Testing](#pinia-testing)
1. [Data Fetching](#data-fetching)
1. [E2E Testing By Puppeteer](#e2e-testing-by-puppeteer)
1. [Analyzing source code by SonarQube](#analyzing-source-code-by-sonarqube)

## Create [New Project](https://nuxt.com/docs/getting-started/installation#new-project)
Nuxt3のプロジェクトを新規作成するには以下のコマンドを実行します。
```bash
npx nuxi init <project-name>
```

ソースディレクトリを変更する場合はnuxt.config.tsに以下を追加します。

※このプロジェクトではソースディレクトリをsrcに変更しています。
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: 'src/'
});
```

### Install
```bash
npm install
```
### Usage
```bash
npm run dev
```
起動後は以下のURLより、アプリの動作確認が可能です。

http://localhost:3000

## [Typescript](https://nuxt.com/docs/guide/concepts/typescript) Setup
```bash
# Typescriptインストール
npm install --save-dev typescript vue-tsc @types/node
```
nuxt.config.tsにtypescriptを追加します。
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    shim: false,    // shimsファイル生成の無効化（VSCodeでVolarを使う場合はfalseにする）
    strict: true,   // 型チェックを厳格化
    typeCheck: true // nuxt devまたはnuxt build時に型チェックを実行
  },
});
```

## [EsLint](https://github.com/nuxt/eslint-config) Setup with Typescript
```bash
# ESlintインストール
npm install --save-dev @nuxtjs/eslint-config-typescript eslint
```
プロジェクトのルート配下に.eslintrcを新規作成して、以下を追加します。
```json
{
  "extends": [
    "@nuxtjs/eslint-config-typescript"
  ]
}
```

package.jsonのscriptsに以下の2項目を追加します。
```json
{
  "scripts": {
    "lint": "eslint --ext \".js,.ts,.vue\" --ignore-path .gitignore .",
    "lint:fix": "npm run lint -- --fix"
  }
}
```

以下のコマンドでESLintを実行します。
```bash
# ESLintの実行
npm run lint

# ESLintの実行 + 自動修正
npm run lint:fix
```

## [Vitest](https://vitest.dev/) Setup

```bash
# vitestインストール
npm install --save-dev vitest @testing-library/vue happy-dom
```

プロジェクトのルート配下にvitest.config.tsを新規作成し、以下を追加します。

```ts
// vitest.config.ts
import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  }
})
```

package.jsonに以下を追加します。
```json
{
  "config": {
    "path": "./src/tests/unitTest/pages/index.spec.ts"
  },
  "scripts": {
    "test:all": "vitest",
    "test:linux": "vitest $npm_package_config_path",
    "test:win": "vitest %npm_package_config_path%"
  },
}
```

### 自動インポート設定

Nuxtで自動インポートされるrefなどの関数がvitestでは自動インポートされないため、以下のプラグインを使用してインポートします。
```bash
# unplugin-auto-importのインストール
# https://github.com/antfu/unplugin-auto-import
npm install --save-dev unplugin-auto-import
```
vitest.config.tsにpluginsを追加します。
pluginsのAutoImportのimportsにインポートしたいライブラリを記述します。

```ts
// vitest.config.ts
export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      // インポートするライブラリにはプリセットが用意されています
      // https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
      imports: ['vue', 'pinia', 'vue-router']
    })
  ],
})
```
以下のように設定することでプリセットにないライブラリをインポートすることもできます。
```ts
// vitest.config.ts
AutoImport({
  imports: [
    {
      "nuxt/app": [
        "foo"
      ]
    }
  ]
})
```

### カバレッジの取得
テストのカバレッジを取得するには追加で以下をインストールします。
```bash
npm install --save-dev @vitest/coverage-c8 vitest-sonar-reporter
```
vitest.config.tsのtestに以下の項目を追加します。
```ts
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'c8',
      include: ['src/**/*.{vue,js,ts}'],    // src配下の特定の拡張子のファイルのみをテスト対象に設定
      all: true,                            // 未テストのコードもカバレッジの対象にする
      reporter: ['html', 'clover', 'text']
    },
    root: '.',
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml'           // SonarQubeでテスト結果を解析するためのレポートを出力する
  }
});
```
package.jsonのscriptsを以下のように修正 (--coverageを追加) します。
```json
{
  "scripts": {
    "test:all": "vitest --coverage",
    "test:linux": "vitest --coverage $npm_package_config_path",
    "test:win": "vitest --coverage %npm_package_config_path%"
  },
}
```

pagesディレクトリに以下のindex.vueファイルを追加します。
```ts
<template>
  <h1 data-testid="page-title">
    Pages/index.vue
  </h1>
</template>
```

上記のindex.vueのテストコードは以下のようになります。
```ts
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
```


テストを実行するには以下のコマンドを実行します。
```bash
# テストの全件実行
npm run test:all
```

任意のテストファイルのみ実行したい場合は、package.jsonのconfig:pathにテストしたいファイルのパスを記載して以下のコマンドを実行します。
```json
{
  "config": {
    "path": "./src/tests/unitTest/pages/index.spec.ts"
  },
}
```
```bash
# 任意のテストファイルのテスト実行（Linux/Macの場合）
npm run test:linux

# 任意のテストファイルのテスト実行（Windowsの場合）
npm run test:win
```

## [VeeValidate](https://vee-validate.logaretm.com/v4/) Setup
```bash
# VeeValidateインストール
npm install --save-dev vee-validate @vee-validate/i18n @vee-validate/rules
```
pluginsフォルダにvee-validate-plugin.tsを新規作成し、以下を追加します。
```ts
// vee-validate-plugin.ts
import { localize, setLocale } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import AllRules from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  configure({
    generateMessage: localize({
      en,
      // エラーメッセージの日本語化
      ja
    })
  })

  Object.keys(AllRules).forEach((rule) => {
    // すべてのルールをインポート
    defineRule(rule, AllRules[rule])
  })

  // エラーメッセージの日本語化
  setLocale('ja')
})
```

### フォームのバリデーション
vee-validate4ではバリデーションの実装方法として以下の2通りが存在します。
* script setup内で実装
* html内で実装

#### script setup内の実装方法
script setup内で実装する場合は、useForm・useFieldを用いてチェック対象のフィールド指定・バリデーションルールの定義を行います。
```ts
<script lang="ts" setup>
import { useForm, useField } from 'vee-validate'

// フォームの定義。使用できるパラメータは以下を参照
// https://vee-validate.logaretm.com/v4/api/use-form/#api-reference
const { handleSubmit, errors, isSubmitting, meta } = useForm({
  // バリデーションルールの指定
  validationSchema: {
    email: 'required|email'
  }
})

// バリデーション対象の項目を指定
const { value: email } = useField('email')

// Submitボタン押下時に呼び出される関数
const foo = () => {
  console.log(email.value)
}

// Submitボタン押下時に呼び出される関数。Submitボタン押下時に各項目のバリデーションチェックも同時に行う場合はこちらを使用
const foo = handleSubmit(() => {
  console.log(email.value)
})
</script>

<template>
  <!-- バリデーション対象の項目 -->
  <input v-model="email" type="text" name="email">

  <!-- バリデーションエラーメッセージの表示 -->
  <span v-if="errors.email">{{ errors.email }}</span>

  <!-- meta.validは全項目で有効な値を入力された場合にtrueを返し、無効な値を入力または初期状態はfalseを返す -->
  <button type="button" :disabled="!meta.valid" @click="foo">Submit</button>

  <!-- isSubmittingは送信処理の実行中はtrueを返し、処理が完了または未処理時はfalseを返す。二重送信対策に有効 -->
  <button type="button" :disabled="isSubmitting" @click="foo">Submit</button>
</template>
```

#### html内の実装方法
html内で実装する場合は、Form・Fieldコンポーネントを用いてチェック対象のフィールド指定・バリデーションルールの定義を行います。
```ts
<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate'

// Submitボタン押下時に呼び出される関数
const foo = (values: Record<string, any>) => {
  console.log(values.email)
}
</script>

<template>
  <!-- フォームの定義。使用できるパラメータは以下を参照 -->
  <!-- https://vee-validate.logaretm.com/v4/api/use-form/#api-reference -->
  <Form v-slot="{ meta, isSubmitting }" data-testid="validation-form" @submit="foo">
    <!-- バリデーション対象の項目 -->
    <Field rules="required|email" name="email" as="input" type="text" />

    <!-- バリデーションエラーメッセージの表示 -->
    <ErrorMessage name="email" />

    <!-- meta.validは全項目で有効な値を入力された場合にtrueを返し、無効な値を入力または初期状態はfalseを返す -->
    <button :disabled="!meta.valid">Submit</button>

    <!-- isSubmittingは送信処理の実行中はtrueを返し、処理が完了または未処理時はfalseを返す。二重送信対策に有効 -->
    <button :disabled="isSubmitting">Submit</button>
  </Form>
</template>
```

## VeeValidate [Testing](https://vee-validate.logaretm.com/v4/guide/testing) 
```bash
# flush-promisesのインストール
npm install --save-dev flush-promises
```

前項目の[VeeValidate Setup](#veevalidate-setup)で作成したvee-validate-plugin.tsはvee-validateの設定ファイルですが、
Nuxtが起動時に読み込まれます。vitest実行時はNuxtが起動しないので、vee-validateを利用しているvueファイルのテストを実行するとvitest上でエラーが発生します。

vitest.config.tsのsetupFilesにvee-validateの設定ファイルを指定することにより、vitest実行時にそのファイルの中身が実行されて上記事象を回避することができます。
```ts
// vitest.config.ts
export default defineConfig({
  test: {
    // テスト実行時に以下で指定したファイルが読み込まれる
    setupFiles: './src/tests/unitTest/setup.ts'
  }
})
```

src/tests/unitTest配下にsetup.tsを新規作成し、以下を追加します。
```ts
// setup.ts
import { localize, setLocale } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import AllRules from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { vi } from 'vitest'
import flushPromises from 'flush-promises'

// vee-validateセットアップ
configure({
  generateMessage: localize({
    en,
    // エラーメッセージの日本語化
    ja
  })
})

Object.keys(AllRules).forEach((rule) => {
  // すべてのバリデーションルール読み込み
  defineRule(rule, AllRules[rule])
})

// エラーメッセージの日本語化
setLocale('ja')

// fireEvent実行後に以下の関数を呼ぶこと (fireEventでHTMLを操作した際に、操作結果をHTMLに反映させるため)
export const waitPerfectly = async () => {
  await flushPromises()
  vi.runAllTimers()
  await flushPromises()
}
```

vee-validateを利用した入力フォームへのテストコードの一例としては以下のようになります。
以下ではinputタグで入力された値がemail形式であるかどうかをチェックしています。

vee-validateのテストに関して詳細な情報は以下を参照ください。

* https://vee-validate.logaretm.com/v4/guide/testing
* https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/validate-plugin.js

```ts
// form.vue
<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate'

const foo = (values: Record<string, any>) => {
  console.log(values.email)
}
</script>

<template>
  <Form v-slot="{ meta, isSubmitting }" data-testid="validation-form" @submit="foo">
    <Field rules="required|email" name="email" as="input" type="text" data-testid="input-email" />
    <ErrorMessage name="email"  data-testid="email-error-msg" />
    <button :disabled="isSubmitting">Submit</button>
  </Form>
</template>
```

```ts
// form.spec.ts
import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import { waitPerfectly } from '../setup'
import Form from '~/pages/form.vue'

vi.useFakeTimers()

test('Email入力欄への入力はemail形式であること', async () => {
  // Arrange
  const { container } = render(Form)
  // 入力項目の取得
  const inputElement = container.querySelector('[data-testid="input-email"]') as HTMLInputElement

  // Act
  // 入力項目へemail形式ではない値を入力
  await fireEvent.update(inputElement, 'abc')
  await fireEvent.blur(inputElement)
  // 入力した値をHTMLへ反映
  await waitPerfectly()
  // エラーメッセージの取得
  const errorMsg = container.querySelector('[data-testid="email-error-msg"]')?.textContent

  // Assert
  expect(errorMsg).toBe('emailは有効なメールアドレスではありません')
})
```

## [Navigation guard](https://nuxt.com/docs/guide/directory-structure/middleware)
特定のページへアクセスがあった場合に、指定したページへリダイレクトさせるにはmiddlewareディレクトリにリダイレクト処理を記述したファイルを作成します。
ファイルの名前は以下のように設定することで異なる機能を持ちます。
* xxxxx.ts (リダイレクト処理を有効にするには、有効にしたいvueファイルに以下を追加する)
```ts
// foo.vue
<script setup>
definePageMeta({
  middleware: ["xxxxx"]
})
</script>
```
* xxxxx.global.ts (全ページでリダイレクト処理が有効になる)

以下は一例として、「/」にアクセスがあった場合にログインページへリダイレクトする処理を実装しています。
詳細な実装方法は[こちら](https://nuxt.com/docs/guide/directory-structure/middleware)を参照ください。


```ts
// redirect.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // 「/」にアクセスがあった場合
  if (to.path === '/') {
    // login.vueへリダイレクト
    return navigateTo('login')
  }
})
```
テストの実装に関しては[こちら](https://github.com/N-Laboratory/nuxt3-starter-guide-jpn/commit/6a2aab8f50d285967abb1ff3560c1a63eed724bb)を参照ください。

## [Pinia](https://pinia.vuejs.org/ssr/nuxt.html) Setup
piniaのgithubのissueで[こちら](https://github.com/vuejs/pinia/issues/853)で言及されているとおり、
現在(2023年1月29日時点)piniaをインストールする際にnpmエラーが発生します。

エラーを回避するため公式ガイドの[こちら](https://pinia.vuejs.org/ssr/nuxt.html#installation)で紹介されている方法を実施します。
package.jsonのoverridesに以下を追加します。
```json
{
  "overrides": {
    "vue": "latest"
  }
}
```
package.jsonに上記を追加すれば以下のコマンドで問題なくpiniaのインストールができるようになります。
```bash
# piniaインストール
npm install pinia @pinia/nuxt
```
インストール時に以下のエラーが出る場合はpackage.jsonのoverridesのvueのバージョンを直接指定する必要があります。
```bash
npm ERR! Invalid comparator: latest
```

以下のようにpackage.jsonを修正後に再度上記コマンドを実行することで正しくpiniaがインストールされるようになります。
```json
{
  "overrides": {
    "vue": "3.2.45"
  }
}
```

nuxt.config.tsのmodulesに以下を追加します。
```ts
// nuxt.config.ts
export default defineNuxtConfig({
    modules: [
        ['@pinia/nuxt',
            {
                autoImports: [
                  // defineStoreの自動インポート
                  'defineStore'
                ]
                // vuexも併用する場合は以下を追加
                // disableVuex: false ,
            }
        ]
    ]
});
```
### Storeの実装
storeディレクトリにuser.tsを新規作成し、以下を追加します。
```ts
// user.ts
// nuxt.config.tsのautoImportsにdefineStoreを追加している場合はこのimport文は不要です。
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // ユーザーの定義・初期化
    user: { email: '', password: '' }
  }),
  actions: {
    // ユーザー情報の更新
    setUserInfo (email: string, password: string) {
      this.user.email = email
      this.user.password = password
    }
  }
})
```

vueファイルからstoreを参照するには次のようになります。
```ts
// store.vue
<script lang="ts" setup>
import { useUserStore } from '../store/user'

// storeの取得
const store = useUserStore()

// emailの取得
const email = store.user.email

// passwordの取得
const password = store.user.password

// ユーザー情報の更新
store.setUserInfo("new email", "new password")
</script>
```

## Pinia [Testing](https://pinia.vuejs.org/cookbook/testing.html)
```bash
# @pinia/testingインストール
npm install --save-dev @pinia/testing
```

vueファイルでpiniaを利用したstoreの参照をしている場合、テストコードを実行すると以下のエラーが発生します。
```bash
getActivePinia was called with no active Pinia. Did you forget to install pinia?
```
上記事象を回避するにはテストコードのbeforeEachに以下を追加します。
```ts
import { setActivePinia, createPinia } from 'pinia'

beforeEach(() => {
  setActivePinia(createPinia())
})
```

storeに初期値を設定した状態でテストを実行するには、createTestingPiniaのinitialStateに定義します。
実装の詳細は[こちら](https://pinia.vuejs.org/cookbook/testing.html#initial-state)を参照ください。
```ts
import { beforeEach, test } from 'vitest'
import { render } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import Foo from '~/pages/foo.vue'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('storeのユーザー情報に初期値が設定されていること.', () => {
  // Arrange
  const { container } = render(Foo, {
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
})
```
## [Data Fetching](https://nuxt.com/docs/getting-started/data-fetching)
Nuxt3ではNuxt2で利用していたaxiosを使わなくなり、Fetch APIまたはunjs/ohmyfetchを利用してAPI呼び出しを行います。実装の詳細に関しては[こちら](https://nuxt.com/docs/getting-started/data-fetching)を参照ください。
```ts
// api.vue
<script lang="ts" setup>
const { data: bar } = await useFetch('/api/v1/foo')
</script>

<template>
  Result: {{ bar }}
</template>
```

## E2E Testing By [Puppeteer](https://github.com/puppeteer/puppeteer)
```bash
# puppeteerインストール
npm install --save-dev puppeteer
```
以下は入力フォームのe2eテストのサンプルです。
入力項目（email, password）に値を入力した場合、送信ボタンが活性となり押下できることをテストしています。
```ts
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { launch, PuppeteerLaunchOptions } from 'puppeteer'
import type { Browser, Page } from 'puppeteer'

// ブラウザの起動オプションの設定。使用できるパラメータに関しての詳細は以下を参照ください。
// https://pptr.dev/api/puppeteer.browserlaunchargumentoptions
const options: PuppeteerLaunchOptions = {
  headless: false,
  slowMo: 75,
  defaultViewport: {
    width: 1280,
    height: 1024
  },
  devtools: true,
  args: ['--window-size=1680,1024']
}

describe('E2E', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await launch(options)
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

   test('1-入力フォームに有効な値を入力した場合、送信ボタンが押下できること', async () => {
      try {
        // Act
        // ページ遷移
        await page.goto('http://localhost:3000/foo')

        // emailの入力
        await page.type('input[name="email"]', 'foo@bar.com')

        // passwordの入力
        await page.type('input[name="password"]', 'foo')

        // 送信ボタンの表示状態の取得 非活性→true 活性→false
        const isDisabled = await page.$eval(
          '[data-testid="submit-btn"]',
          element => (element as HTMLButtonElement).disabled
        )

        // エビデンスの取得（スクリーンショットの撮影）
        await page.screenshot({
          path: './src/tests/e2eTest/evidence/pages/foo/test-01.png',
          fullPage: true
        })

        // Assert
        expect(isDisabled).toBeFalsy()
      } catch (e) {
        console.error(e)
        expect(e).toBeUndefined()
      }
    }, 60000)
})
```
E2Eテストを実行するには、package.jsonのconfig:pathにテストしたいファイルのパスを記載して以下のコマンドを実行します。
```json
{
  "config": {
    "path": "./src/tests/e2eTest/spec/foo.spec.ts"
  },
}
```
```bash
# アプリの起動
npm run dev

# E2Eテスト実行（Linux/Macの場合）
npm run test:linux

# E2Eテスト実行（Windowsの場合）
npm run test:win
```

## Analyzing source code by [SonarQube](https://docs.sonarqube.org/latest/)
```bash
npm install --save-dev sonarqube-scanner vitest-sonar-reporter
```

vitest.config.tsに以下を追加します。
* testのcoverageのreporterにlcovを追加
* testにreportersとoutputFileを追加
```ts
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      // lcovを指定することでSonarQubeがテストのカバレッジを参照するためのファイル（lcov.info）を生成する
      reporter: ['html', 'clover', 'text', 'lcov']
    },
    // テスト結果をSonarQubeの解析用に出力する
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
  }
})
```

プロジェクトのルート配下にsonar-project.propertiesを新規作成して、以下を追加します。
各プロパティの詳細に関しては[こちら](https://docs.sonarqube.org/9.6/project-administration/narrowing-the-focus/)を参照ください。
```properties
sonar.projectKey=nuxt3-starter-guide-jpn
sonar.projectName=nuxt3-starter-guide-jpn
sonar.sources=src
sonar.tests=src/tests/
sonar.test.inclusions=src/tests/**/*.spec.ts
sonar.exclusions=**/*plugins*/**, src/tests/**/*.spec.ts, src/tests/**/setup.ts
sonar.testExecutionReportPaths=test-report.xml
sonar.javascript.file.suffixes=.js,.jsx
sonar.typescript.file.suffixes=.ts,.tsx,.vue
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.login=sqp_XXXXXXXXXXXXXXXXXXXXXX
```

### SonarQubeプロジェクトの作成
以降の手順では、SonarQubeのインストールが完了していて、localhostの9000番で起動していることを前提とします。

SonarQubeプロジェクトの作成およびプロジェクトトークンの生成には以下の手順を実施します。

1. 次のURLにアクセスします。
http://localhost:9000/projects

1. Create Project > Manuallyを選択します。

1. Create a project画面でProject display nameとProject keyにnuxt3-starter-guide-jpnを設定してSet Upを押下します。

1. 「How do you want to analyze your repository?」と表示されるのでLocallyを押下します。

1. Provide a token欄のGenerate a project tokenを選択し、Generateを押下することでプロジェクトトークンが生成されます。

### コード解析の実施
sonar-project.propertiesのsonar.loginに上記で生成したSonarQubeのプロジェクトトークンを指定します。
トークンに関しての詳細は[こちら](https://docs.sonarqube.org/latest/user-guide/user-account/generating-and-using-tokens/)をご参照ください。
```properties
sonar.login=sqp_XXXXXXXXXXXXXXXXXXXXXX
```

package.jsonのscriptsに以下の項目を追加します。
```json
{
  "scripts": {
    "sonar": "sonar-scanner"
  },
}
```

SonarQubeのコード解析を実施するには以下のコマンドを実行します。
```bash
# テストの全件実行
npm run test:all

# SonarQubeのコード解析実行
npm run sonar
```
解析終了後は以下のURLより、結果を確認することができます。

http://localhost:9000/dashboard?id=nuxt3-starter-guide-jpn