<h1 align="center">Nuxt 3 Starter Guide</h1>
<p align="center">
  <img src="https://img.shields.io/badge/-Typescript-00bfff.svg?logo=typescript&style=flat">
  <img src="https://img.shields.io/badge/-Nuxt.js-008000.svg?logo=nuxt.js&style=flat">
  <img src="https://img.shields.io/badge/-Node.js-lightyellow.svg?logo=node.js&style=flat">
  <img src="https://img.shields.io/badge/-ESLint-4B32C3.svg?logo=eslint&style=flat">
  <img src="https://img.shields.io/badge/-Vitest-FF8800.svg?logo=vitest&style=flat">
  <img src="https://img.shields.io/badge/-Storybook-grey.svg?logo=storybook&style=flat">
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
Nuxt3のテンプレートプロジェクト。

最低限必要な機能を実装し、要点を解説しています。 ユニットテスト、E2Eテスト、SonarQubeも取り扱っています。

このプロジェクトでは以下の機能を実装しています。
* Vitest (unit test)
* EsLint (Flat Config and Stylistic)
* Migrate to Flat Config and Stylistic
* VeeValidate
* Navigation guard
* Pinia
* Storybook
* Puppeteer (E2E test)
* SonarQube
* TypeScript

## Contents

1. [プロジェクトの作成](#プロジェクトの作成)
1. [Typescript Setup](#typescriptの設定)
1. [EsLint Flat Configの設定](#eslint-flat-configの設定)
1. [ESLint Stylisticの設定](#eslint-stylisticの設定)
1. [Flat ConfigとStylisticへの移行](#flat-configとstylisticへの移行)
1. [Vitestの設定](#vitestの設定)
1. [VeeValidateの設定](#veevalidateの設定)
1. [VeeValidateのテスト実装](#veevalidateのテスト実装)
1. [Navigation guard](#navigation-guard)
1. [Piniaの設定](#piniaの設定)
1. [Pinia Testing](#pinia-testing)
1. [Data Fetching](#data-fetching)
1. [Storybookの設定](#storybookの設定)
1. [E2E Testing By Puppeteer](#e2e-testing-by-puppeteer)
1. [Analyzing source code by SonarQube](#analyzing-source-code-by-sonarqube)

## [プロジェクトの作成](https://nuxt.com/docs/getting-started/installation#new-project)
Nuxt3のプロジェクトを新規作成するには以下のコマンドを実行します。
```bash
npx nuxi@latest init <project-name>
```

ソースディレクトリを変更する場合はnuxt.config.tsに以下を追加します。

※このプロジェクトではソースディレクトリをsrcに変更しています。
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: 'src/'
});
```
必要なモジュールをインストールします。
```bash
npm install
```
Nuxtの起動
```bash
npm run dev
```
起動後は以下のURLより、アプリの動作確認が可能です。

http://localhost:3000

## [Typescriptの設定](https://nuxt.com/docs/guide/concepts/typescript)
```bash
npm install --save-dev vue-tsc typescript
```

nuxt.config.tsにtypescriptを追加します。
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // 設定できるプロパティは以下を参照ください
  // https://nuxt.com/docs/api/nuxt-config#typescript
  typescript: {
    // nuxt devまたはnuxt build時に型チェックを実行
    typeCheck: true
  },
});
```

## [EsLint Flat Configの設定](https://eslint.nuxt.com/packages/module)
以下のコマンドでESLintとNuxt ESLintをインストールします。Nuxt ESLint はAll-in-one ESLint integration for Nuxtと公式が記載しているとおり、NuxtにESLintを導入するためのオールインワンモジュールです。

```bash
npm install --save-dev @nuxt/eslint eslint
```

nuxt.config.tsのmodulesに@nuxt/eslintを追加します。
```ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ],
})
```

ルート配下にeslint.config.mjsを新規作成して以下の内容で保存します。
指定できるオプションの詳細は以下を参照ください。

https://eslint.org/docs/latest/use/configure/configuration-files
```js
// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    // lintの適用ファイルの指定.
    files: ['**/*.ts', '**/*.tsx'],
    // lintの適用対象外のファイルの指定。従来の--ignore-pathをここでは指定します。
    ignores: ["**/*.config.ts"],
    // lintのルールの設定
    rules: {
      'no-console': 'off'
    }
  },
  // 特定のファイルに異なるlintのルールを適用する場合は以下のように設定します。
  {
    files: ['**/*.vue',],
    rules: {
      'no-console': 'error'
    }
  }
)
```

lintの適用対象外のファイルには以下がデフォルトで設定されています。

https://github.com/nuxt/eslint/blob/main/packages/eslint-config/src/flat/configs/ignores.ts
```ts
import type { Linter } from 'eslint'

export default function ignores(): Linter.FlatConfig[] {
  return [
    {
      ignores: [
        '**/dist',
        '**/node_modules',
        '**/.nuxt',
        '**/.output',
        '**/.vercel',
        '**/.netlify',
      ],
    },
  ]
}
```
package.jsonのscriptsに以下のコマンドを追加します。
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
  }
}
```

以下のコマンドを実行し、lintチェックを行います。
```bash
# ESLintのチェック実施
npm run lint

# ESLintのチェックとコードの修正実施
npm run lint:fix
```

### VS CodeでFlat Configの有効化
VSCodeの拡張機能のESLintのバージョンが3.0.10以前の場合は.vscode/settings.jsonに以下を追加することでFlat Configを有効化します。3.0.10以上をインストールしている場合は以下の設定を行う必要はありません。
```json
{
  "eslint.experimental.useFlatConfig": true
}
```

## [ESLint Stylisticの設定](https://eslint.nuxt.com/packages/module#eslint-stylistic)
以下のコマンドでeslintをインストールします。すでにインストール済みの場合は不要です。
```bash
npm install --save-dev @nuxt/eslint eslint
```
NuxtはESLint Stylisticを統合しており、nuxt.config.tsで設定することができます。
```ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ],
  eslint: {
    config: {
      stylistic: true
    }
  }
})
```
以下のようにルールをカスタマイズすることもできます。設定できる項目は以下を参照ください。

https://eslint.style/guide/config-presets#configuration-factory
```ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ],
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
      },
    }
  }
})
```

### VSCodeで保存時に自動でフォーマットを行う設定
.vscode/setting.jsonに以下を追加します。
```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
}
```

## Flat ConfigとStylisticへの移行
ここではESLintの設定ファイルを従来のeslintrcやprettierからESLint flat configやESLint stylisticに移行を行います。
詳細は以下を参照してください。

https://eslint.org/docs/latest/use/configure/migration-guide


まず最初にNuxt ESLintをインストールします。
```bash
npm install --save-dev @nuxt/eslint eslint
```

### eslintrcからESLint flat configへの移行
@nuxtjs/eslint-config-typescriptを削除します。
```bash
npm uninstall @nuxtjs/eslint-config-typescript
```
package.jsonから@nuxtjs/eslint-config-typescriptの記述を削除します。
```diff
"devDependencies": {
- "@nuxtjs/eslint-config-typescript": "^12.1.0",
},
```

.eslintrcを削除します。
```diff
- {
-   "extends": [
-     "@nuxtjs/eslint-config-typescript"
-   ],
-   "rules": {
-     "no-console": "off"
-   }
- }
```

ルート配下にeslint.config.mjsファイルを新規作成して以下の内容で保存します。
```js
// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    // lintを適用するファイルを指定します。
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    // lintの適用対象外のファイルを指定します。--ignore-pathで指定していたファイルを指定します。
    ignores: ['**/*.log*', '.cache/**'],
    // 適用したいルールを記載します。
    rules: {
      'no-console': 'off',
    },
  },
)
```

package.jsonのスクリプトを以下の内容で修正します。
```diff
"scripts": {
- lint: "eslint --ext \".js,.ts,.vue\" --ignore-path .gitignore .",
+ lint: "eslint .",
},
```

### prettierからESLint stylisticへの移行
prettierとeslint-config-prettier、eslint-plugin-prettierを削除します。
```bash
npm uninstall prettier eslint-config-prettier eslint-plugin-prettier
```
package.jsonからprettierとeslint-config-prettier、eslint-plugin-prettierの記述を削除します。
```diff
"devDependencies": {
- "eslint-plugin-prettier": "^5.1.0",
- "eslint-config-prettier": "^8.3.0",
- "prettier": "^2.5.1",
},
```

.prettierrcファイルを削除します。
```diff
- {
-   "indent": 2,
-   "quotes": 'single',
-   "semi": false
- }
```

nuxt.config.tsにルールを追加します。
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ],
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
      },
    }
  }
})
```
package.jsonのscriptsにprettierの実行コマンドがある場合は削除しておきます。

## [Vitestの設定](https://vitest.dev/)

```bash
# install Vitest
npm install --save-dev vitest @testing-library/user-event @testing-library/vue happy-dom
```

プロジェクトのルート配下にvitest.config.tsを新規作成して以下の内容で保存します。
```ts
// vitest.config.ts
import path from 'path'
import { defineConfig } from 'vitest/config'

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

### Nuxt自動インポート設定
Nuxtが自動インポートする関数やコンポーネントを以下のライブラリを使用することでユニットテスト内でも自動インポートを行うことができます。
```bash
npm install --save-dev unplugin-auto-import
npm install --save-dev unplugin-vue-components
```
vitest.config.tsに以下のpluginsを追加します。
```ts
// vitest.config.ts
import AutoImportFunctions from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
    // インポートしたいプラグインを指定. 指定できるプリセットは以下を参照ください。
    // https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
    AutoImportFunctions ({ imports: [
      'vue',
      'vee-validate',
      'vue-router',
      'pinia',
    ], dts: 'auto-imports.d.ts' }),
    AutoImportComponents({
      dirs: ['src/components'],
      dts: '.nuxt/components.d.ts',
    }),
  ],
})
```
プリセットを使用せずに直接インポートしたいプラグインを指定するには以下のように記載します。
```ts
// vitest.config.ts
AutoImportFunctions({
  imports: [
    {
      "nuxt/app": [
        "foo"
      ]
    }
  ]
})
```

### カバレッジの計測
```bash
npm install --save-dev @vitest/coverage-v8 vitest-sonar-reporter
```

vitest.config.tsのtestに以下の項目を追加します。
```ts
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      // src配下の特定の拡張子のファイルのみをテスト対象に設定
      include: ['src/**/*.{vue,js,ts}'],
      // 未テストのコードもカバレッジの対象にする
      all: true,
      reporter: ['html', 'clover', 'text']
    },
    root: '.',
    reporters: ['verbose', 'vitest-sonar-reporter'],
    // SonarQubeでテスト結果を解析するためのレポートを出力する
    outputFile: 'test-report.xml'
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
```vue
// pages/index.vue
<template>
  <h1>
    Pages/index.vue
  </h1>
</template>
```

ユニットテストの実装の一例としてindex.test.tsを新規作成して以下の内容で保存します。
```ts
// index.test.ts
import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import Index from '~/pages/index.vue'

describe('Index', () => {
  test('Indexページにタイトルが表示されていること', () => {
    // Arrange
    render(Index)
    const title = screen.getByText('Pages/index.vue')

    // Assert
    expect(title).toBeTruthy()
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

## [VeeValidateの設定](https://vee-validate.logaretm.com/v4/)
```bash
npm install --save-dev vee-validate @vee-validate/i18n @vee-validate/rules
```
pluginsフォルダにvee-validate-plugin.tsを新規作成して以下の内容で保存します。
```ts
// plugins/vee-validate-plugin.ts
import { localize, setLocale } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import { all } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  configure({
    generateMessage: localize({
      // エラーメッセージの日本語化
      ja,
    }),
  })

  // すべてのルールをインポート
  Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule)
  })

  // エラーメッセージの日本語化
  setLocale('ja')
})
```

### Formのバリデーション
vee-validate4ではバリデーションの実装方法として以下の2通りが存在します。
* script setup内で実装
* html内で実装

#### script setup内の実装方法
script setup内で実装する場合は、useForm・useFieldを用いてチェック対象のフィールド指定、バリデーションルールの定義を行います。
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
const { value: email } = useField<string>('email')

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
html内で実装する場合は、Form・Fieldコンポーネントを用いてチェック対象のフィールド指定、バリデーションルールの定義を行います。
```ts
<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate'

// Submitボタン押下時に呼び出される関数
const foo = (values: Record<string, string>) => {
  console.log(values.email)
}
</script>

<template>
  <!-- フォームの定義。使用できるパラメータは以下を参照 -->
  <!-- https://vee-validate.logaretm.com/v4/api/use-form/#api-reference -->
  <Form v-slot="{ meta, isSubmitting }" @submit="foo">
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

## [VeeValidateのテスト実装](https://vee-validate.logaretm.com/v4/guide/testing)
前項目で作成したvee-validate-plugin.tsはvee-validateの設定ファイルですが、 Nuxtが起動時に読み込まれます。vitest実行時はNuxtが起動しないので、vee-validateを利用しているvueファイルのテストを実行するとvitest上でエラーが発生します。

vitest.config.tsのsetupFilesにvee-validateの設定ファイルを指定することにより、vitest実行時にそのファイルの中身が実行されて上記事象を回避することができます。
```ts
// vitest.config.ts
export default defineConfig({
  test: {
    // テスト実行時に以下で指定したファイルが読み込まれる。
    setupFiles: './src/tests/unitTest/setup.ts'
  }
})
```
src/tests/unitTest配下にsetup.tsを新規作成して以下の内容で保存します。
```ts
// .src/tests/unitTest/setup.ts
import { localize, setLocale } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import { all } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'

// vee-validate setup
configure({
  generateMessage: localize({
    // エラーメッセージの日本語化
    ja,
  }),
})

// import vee-validate all rules
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule)
})

// エラーメッセージの日本語化
setLocale('ja')
```

vee-validateを利用した入力フォームへのテストコードの一例としては以下のようになります。 以下ではinputタグで入力された値がemail形式であるかどうかをチェックしています。

vee-validateのテストに関して詳細な情報は以下を参照ください。
* https://vee-validate.logaretm.com/v4/guide/testing
* https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/validate-plugin.js

```ts
// form.vue
<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate'

const foo = (values: Record<string, string>) => {
  console.log(values.email)
}
</script>

<template>
  <Form v-slot="{ meta }" @submit="foo">
    <Field rules="required|email" name="email" as="input" type="text" placeholder="email" />
    <ErrorMessage name="email" />
    <button :disabled="!meta.valid">Submit</button>
  </Form>
</template>
```

```ts
// form.spec.ts
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Form from '~/pages/form.vue'

test('should error message display', async () => {
  // Arrange
  const user = userEvent.setup()
  render(Form)

  // Act
  await user.type(screen.getByPlaceholderText('email'), 'abc{Tab}')

  // Assert
  expect(screen.getByText('emailは有効なメールアドレスではありません')).toBeTruthy()
})
```

## [ナビゲーションガード](https://nuxt.com/docs/guide/directory-structure/middleware)
特定のページへアクセスがあった場合に、指定したページへリダイレクトさせるにはmiddlewareディレクトリにリダイレクト処理を記述したファイルを作成します。 ファイルの名前は以下のように設定することで異なる機能を持ちます。

* xxx.ts (リダイレクト処理を有効にするには、有効にしたいvueファイルに以下を追加する)
```ts
// foo.vue
<script setup>
definePageMeta({
  middleware: ["xxx"]
})
</script>
```
* xxx.global.ts (全ページでリダイレクト処理が有効になる)

以下は一例として、「/」にアクセスがあった場合にログインページへリダイレクトする処理を実装しています。 詳細な実装方法は[こちら](https://nuxt.com/docs/guide/directory-structure/middleware)を参照ください。


```ts
// middleware/redirect.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // 「/」にアクセスがあった場合
  if (to.path === '/') {
    // login.vueへリダイレクト
    return navigateTo('login')
  }
})
```
テストの実装に関しては[こちら](https://github.com/N-Laboratory/nuxt3-starter-guide-example-jpn/blob/main/src/tests/unitTest/middleware/redirect.global.spec.ts)を参照ください。

## [Pinia](https://pinia.vuejs.org/ssr/nuxt.html) Setup
```bash
# install Pinia
npm install pinia @pinia/nuxt
```

If you're using npm, you might encounter an ERESOLVE unable to resolve dependency tree error. In that case, add the the following to your package.json:
```json
{
  "overrides": {
    "vue": "latest"
  }
}
```

If you see below error message, fix override:vue like below.
```bash
npm ERR! Invalid comparator: latest
```

```json
{
  "overrides": {
    "vue": "3.4.30"
  }
}
```

Add the following to nuxt.config.ts
```ts
// nuxt.config.ts
export default defineNuxtConfig({
    modules: [
        ['@pinia/nuxt',
            {
                autoImports: [
                  // Import defineStore
                  'defineStore'
                ]
                // If you use vuex at the same time, add the following
                // disableVuex: false
            }
        ]
    ]
});
```
### Store implementation
Create user.ts in store directory and add the following to user.ts.
```ts
// user.ts
// If you add defineStore to autoImports in nuxt.config.ts, you don't need to import below
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // User definition and initialization
    user: { email: '', password: '' }
  }),
  actions: {
    // Update use info
    setUserInfo (email: string, password: string) {
      this.user.email = email
      this.user.password = password
    }
  }
})
```

Here is a sample code using store from vue file.
```ts
// store.vue
<script lang="ts" setup>
import { useUserStore } from '../store/user'

// Use store
const store = useUserStore()

// Get email from store user info
const email = store.user.email

// Get password from store user info
const password = store.user.password

// Update store user info
store.setUserInfo("new email", "new password")
</script>
```

## Pinia [Testing](https://pinia.vuejs.org/cookbook/testing.html)
```bash
# install @pinia/testing
npm install --save-dev @pinia/testing
```

When run test file using pinia, the following error occurs.
```bash
getActivePinia was called with no active Pinia. Did you forget to install pinia?
```
To avoid this error, call setActivePinia function in beforeEach.
```ts
import { beforeEach, describe, expect, test } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../../../store/user'

const initialUser = {
  email: '',
  password: '',
}
const updatedUser = {
  email: 'new email',
  password: 'new password',
}

describe('Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('store user info should be initial state', () => {
    // Arrange
    const store = useUserStore()

    // Assert
    expect(store.user).toEqual(initialUser)
  })

  test('if you call setUserInfo(), store user info should update', () => {
    // Arrange
    const store = useUserStore()

    // Act
    store.setUserInfo(updatedUser.email, updatedUser.password)

    // Assert
    expect(store.user).toEqual(updatedUser)
  })
})
```

You can set the initial state of all of your stores when creating a testing pinia by passing an initialState.
See [this](https://pinia.vuejs.org/cookbook/testing.html#initial-state) for more details.
```vue
<script lang="ts" setup>
import { useUserStore } from '../store/user'

const store = useUserStore()
const email = store.user.email
const password = store.user.password
</script>

<template>
  <div>
    <p>Email: {{ email }}</p>
    <p>Password: {{ password }}</p>
  </div>
</template>
```
```ts
import { beforeEach, expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import Foo from './pages/index.vue'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('store user info should set the initial value', () => {
  // Arrange
  render(Foo, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            user: { user: { email: 'test@test.com', password: 'test' } },
          },
        }),
      ],
    },
  })

  // Assert
  expect(screen.getByText('Email: test@test.com')).toBeTruthy()
  expect(screen.getByText('Password: test')).toBeTruthy()
})
```
## [Data Fetching](https://nuxt.com/docs/getting-started/data-fetching)
Nuxt provides useFetch instead of axios. It handles data fetching within your application.
See [this](https://nuxt.com/docs/getting-started/data-fetching) for more details.
```ts
// api.vue
<script lang="ts" setup>
const { data: bar } = await useFetch('/api/v1/foo')
</script>

<template>
  Result: {{ bar }}
</template>
```

## [Storybook](https://storybook.js.org/docs) Setup
Install Storybook
```bash
npx storybook@latest init --type vue3 --builder vite
```

Add the following to scripts in package.json
```json
"scripts": {
  "storybook": "storybook dev -p 6006",
},
```

[NOTE](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#framework-specific-vite-plugins-have-to-be-explicitly-added): In Storybook 7, It would automatically add frameworks-specific Vite plugins, e.g. @vitejs/plugin-react if not installed. In Storybook 8 those plugins have to be added explicitly in the user's vite.config.ts:
```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```
Without the above configurration, the follwing error will occur.
```bash
 [vite] Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.
```
Create the new vue file and new story like this.
```typescript
// pages/index.vue
<template>
  <div>
    Pages/index.vue
  </div>
</template>
```
```typescript
// pages/index.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import Index from './index.vue'

type Story = StoryObj<typeof Index>
const meta: Meta<typeof Index> = {
  title: 'Index',
}

export const Default: Story = {
  render: () => ({
    components: { Index },
    template: '<Index />',
  }),
}

export default meta
```
Run the following command to start storybook, and then you can access http://localhost:6006/
```bash
npm run storybook
```
Install [@nuxtjs/storybook](https://storybook.nuxtjs.org/getting-started/setup) dependency to your project.
```bash
npx nuxi@latest module add storybook
```
After installation this library, the following command will start nuxt and Storybook at the same time.
```bash
npm run dev
```

Add the following to modules in nuxt.config.ts.
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/storybook'],
})
```
You can edit the storybook configuration with the storybook property in nuxt.config.ts.

Add the following to nuxt.config.ts. See [more options](https://storybook.nuxtjs.org/getting-started/options).
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  storybook: {
    host: 'http://localhost',
    port: 6006,
  },
})
```

### Import configuration
If you use an alias in a vue file, an error will occur like below when storybook is running.
```bash
TypeError: Failed to fetch dynamically imported module:
```
```ts
// foo.vue
import Foo from '~/components/Foo.vue'
```

Add an alias to viteFinal in .storybook/main.ts to avoid above error.
```ts
import type { StorybookConfig } from "@storybook/vue3-vite";
import path from "path";

const config: StorybookConfig = {
  // add this
  viteFinal: async (config) => {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
        '~': path.resolve(__dirname, '../src'),
      }
    }
    return config
  },
};
```

### Nuxt auto import configuration
Storybook cannot import functions that are automatically imports by nuxt (e.g. ref, computed, and so on.).

Install the following library to import nuxt auto-imports functions in storybook.
- unplugin-auto-import
```bash
npm install --save-dev unplugin-auto-import
```
Add the following to viteFinal in .storybook/main.ts
```ts
import AutoImportFunctions from "unplugin-auto-import/vite";

const config: StorybookConfig = {
  viteFinal: async (config) => {
    if (config?.plugins) {
      // add this
      config.plugins.push(
        AutoImportFunctions ({ imports: [
          'vue',
          'vee-validate',
          'vue-router',
          'pinia',
        ], dts: '.storybook/auto-imports.d.ts' }),
      )
    }
    return config
  },
}
```

Storybook cannot import components that are automatically imports by nuxt.

Install the following library to import nuxt auto-imports components in storybook.
- unplugin-vue-components
```bash
npm install --save-dev unplugin-vue-components
```
Add the following to viteFinal in .storybook/main.ts
```ts
import AutoImportComponents from 'unplugin-vue-components/vite'

const config: StorybookConfig = {
  viteFinal: async (config) => {
    if (config?.plugins) {
      // add this
      config.plugins.push(
        AutoImportComponents({
          dirs: ['src/components'],
          dts: '.storybook/components.d.ts',
        }),
      )
    }
    return config
  },
}
```

### Using Pinia in Storybook
Storybook cannot use pinia by default.
The following error will occur when using pinia in vue file.
```
"getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
```
To aboid this, add the follwing to .storybook/preview.ts.
```ts
// .storybook/preview.ts
import { type Preview, setup } from '@storybook/vue3'
import { type App } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

setup((app: App) => {
  app.use(pinia)
})
```

If you want to set initial state in store, add the follwing to each story in storybook.
```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import Index from './index.vue'
import { useUserStore } from '~/store/user'

type Story = StoryObj<typeof Index>

const meta: Meta<typeof Index> = {
  title: 'Index',
}

export const Default: Story = {
  render: () => ({
    setup() {
      // add this
      const store = useUserStore()
      store.user.email = 'foo@bar.com'
      store.user.password = 'foobar'
    },
    components: { Index },
    template: '<Indesx />',
  }),
}

export default meta

```


### Using Vee-Validate in Storybook
Storybook cannot use Vee-Validate by default.
The following error will occur when using Vee-Validate in vue file.
```
Error: No such validator 'XXXX' exists.
```
To aboid this, add the follwing to .storybook/preview.ts.
```ts
// .storybook/preview.ts
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import { all } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'

configure({
  generateMessage: localize({ en }),
})

Object.entries(all).forEach(([name, rule]) => {
  // import all validation-rules
  defineRule(name, rule)
})
```

### Mocking API Request in Storybook
Use msw to mock Rest and GraphQL requests right inside your story in storybook. With msw-storybook-addon, you can easily mock your APIs, making that process much simpler.
```bash
npm install --save-dev msw msw-storybook-addon
npx msw init public/
```
Enable MSW in Storybook by initializing MSW and providing the MSW decorator in ./storybook/preview.js
```ts
// .storybook\preview.ts
import { initialize, mswLoader } from 'msw-storybook-addon'

// Initialize MSW
initialize()

const preview: Preview = {
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
}

export default preview
```
Then ensure the staticDirs property in your Storybook configuration will include the generated service worker file (in /public, by default).
```ts
// .storybook\main.ts
const config: StorybookConfig = {
  staticDirs: ['../public'],
}
export default config
```
Here is an example uses the fetch API to make network requests.
```ts
// index.vue
<script lang="ts" setup>
import { useFetch } from '@vueuse/core'

const uuid = ref('')
const handleClick = async () => {
  const { data } = await useFetch('https://httpbin.org/uuid').json()
  uuid.value = data.value.uuid
}
</script>

<template>
  <div>
    <input type="submit" value="Get uuid" @click="handleClick">
    <p>UUID = {{ uuid }}</p>
  </div>
</template>
```
```ts
// index.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import { http, HttpResponse } from 'msw'
import Index from './index.vue'

type Story = StoryObj<typeof Index>

const meta: Meta<typeof Index> = {
  title: 'Index',
}

export const Default: Story = {
  render: () => ({
    components: { Index },
    template: '<Index />',
  }),
  parameters: {
    msw: {
      handlers: [
        http.get('https://httpbin.org/uuid', () => {
          return HttpResponse.json({
            uuid: 'test uuid',
          })
        }),
      ],
    },
  },
}

export default meta
```
msw-storybook-addon starts MSW with default configuration. If you want to configure it, you can pass options to the initialize function. They are the StartOptions from setupWorker.
A common example is to configure the onUnhandledRequest behavior, as MSW logs a warning in case there are requests which were not handled.
If you want MSW to bypass unhandled requests and not do anything:
```ts
// preview.ts
import { initialize } from 'msw-storybook-addon';

initialize({
  onUnhandledRequest: 'bypass'
})
```

### Run interaction testing inside Storybook
Storybook's test addon allows you to test your components directly inside Storybook. It does this by using a Vitest plugin to transform your stories into Vitest tests using portable stories.

Before installing, make sure your project meets the following requirements:
- Storybook ≥ 8.4
- A Storybook framework that uses Vite (e.g. vue3-vite), or the Storybook Next.js framework
- Vitest ≥ 2.1

Run the following command to install and configure the addon, which contains the plugin to run your stories as tests using Vitest:
```bash
npx storybook add @storybook/experimental-addon-test
```
That add command will install and register the test addon. It will also inspect your project's Vite and Vitest setup, and install and configure them with sensible defaults, if necessary.
Make sure the following ts file have been created.
```ts
// vitest.workspace.ts
import path from 'path'
import { defineWorkspace } from 'vitest/config'
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import { storybookVuePlugin } from '@storybook/vue3-vite/vite-plugin'
import AutoImportFunctions from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'

export default defineWorkspace([
  'vitest.config.ts',
  {
    extends: 'vite.config.ts',
    plugins: [
      storybookTest({ configDir: '.storybook' }),
      storybookVuePlugin(),
      // Import nuxt-auto-imports functions
      AutoImportFunctions ({ imports: [
        'vue',
        'vee-validate',
        'vue-router',
        'pinia',
      ], dts: '.storybook/auto-imports.d.ts',
      }),
      // Import nuxt-auto-imports components
      AutoImportComponents({
        dirs: ['src/components'],
        dts: '.storybook/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        name: 'chromium',
        provider: 'playwright',
      },
      include: ['**/*.stories.?(m)[jt]s?(x)'],
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
])
```
Add the follwing to scripts in package.json.
--project=storybook will run tests only stories.ts.
```json
  "scripts": {
    "test:storybook": "vitest --project=storybook",
  },
```

Here is an example.
```ts
// index.vue
<script lang="ts" setup>
import { useFetch } from '@vueuse/core'

const uuid = ref('')
const handleClick = async () => {
  const { data } = await useFetch('https://httpbin.org/uuid').json()
  uuid.value = data.value.uuid
}
</script>

<template>
  <div>
    <input type="submit" value="Get uuid" @click="handleClick">
    <p>UUID = {{ uuid }}</p>
  </div>
</template>
```
```ts
// index.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import { http, HttpResponse } from 'msw'
import { within, userEvent } from '@storybook/test'
import Index from './index.vue'

type Story = StoryObj<typeof Index>

const meta: Meta<typeof Index> = {
  title: 'Index',
}
export default meta

export const GetUuid: Story = {
  render: () => ({
    components: { Index },
    template: '<Index />',
  }),
  parameters: {
    msw: {
      handlers: [
        http.get('https://httpbin.org/uuid', () => {
          return HttpResponse.json({
            uuid: 'test uuid',
          })
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement)

    // Act
    await userEvent.click(await canvas.findByText('Get uuid'))

    // Assert
    await expect(canvas.getByText('UUID = test uuid')).toBeInTheDocument()
  },
}
```
Run the following command to run tests.
```bash
npm run test:storybook
```

## E2E Testing By [Puppeteer](https://github.com/puppeteer/puppeteer)
Most things that you can do manually in the browser can be done using Puppeteer as E2E testing.
```bash
# install Puppeteer
npm install --save-dev puppeteer
```
```vue
<script lang="ts" setup>
import { Form, Field } from 'vee-validate'
</script>

<template>
  <Form v-slot="{ meta, isSubmitting }">
    <Field
      rules="required|email"
      name="email"
      as="input"
      type="text"
    />
    <Field
      rules="required"
      name="password"
      as="input"
      type="text"
    />
    <button
      :disabled="isSubmitting || !meta.valid"
      data-testid="submit-btn"
    >
      Submit
    </button>
  </Form>
</template>
```
Here is a sample E2E testing code.
It tests submit button state.
```ts
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { launch, PuppeteerLaunchOptions } from 'puppeteer'
import type { Browser, Page } from 'puppeteer'

// Set browser launch option. See the following for more details.
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

   test('1-If you input a valid value, submit button should enable', async () => {
      try {
        // Arrange
        await page.goto('http://localhost:3000/foo')

        // Act
        // Input email
        await page.type('input[name="email"]', 'foo@bar.com')

        // Input password
        await page.type('input[name="password"]', 'foo')

        // Get submit button state. inactive → true, active → false
        const isDisabled = await page.$eval(
          '[data-testid="submit-btn"]',
          element => (element as HTMLButtonElement).disabled
        )

        // Take a screenshot
        await page.screenshot({
          path: './src/tests/e2eTest/evidence/pages/foo/test-01.png',
          fullPage: true
        })

        // Assert
        expect(isDisabled).toBe(false)
      } catch (e) {
        console.error(e)
        expect(e).toBeUndefined()
      }
    }, 60000)
})
```
To run E2E testing, add the test file path to config:path in package.json.
```json
{
  "config": {
    "path": "./src/tests/e2eTest/spec/foo.spec.ts"
  },
}
```
```bash
# run application server
npm run dev

# run E2E testing
npm run test:e2e
```

## Analyzing source code by [SonarQube](https://docs.sonarqube.org/latest/)
SonarQube is a self-managed, automatic code review tool that systematically helps you deliver clean code.
```bash
# install SonarQube tools
npm install --save-dev sonarqube-scanner vitest-sonar-reporter
```

Add the following to vitest.config.ts.
* add lcov to reporter
* add reporters and outputFile to test
```ts
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      // To collect coverage by SonarQube, add lcov.
      reporter: ['html', 'clover', 'text', 'lcov']
    },
    // To analyze your test code by SonarQube, output test report file
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
  }
})
```

Create sonar-project.properties in root directory and add the following to sonar-project.properties. See [this](https://docs.sonarqube.org/9.6/project-administration/narrowing-the-focus/) for more details.
```properties
sonar.projectKey=nuxt3-starter-guide
sonar.projectName=nuxt3-starter-guide
sonar.sources=src
sonar.tests=src/tests/
sonar.test.inclusions=src/tests/**/*.spec.ts
sonar.exclusions=**/*plugins*/**, src/tests/**/*.spec.ts, src/tests/**/setup.ts
sonar.testExecutionReportPaths=test-report.xml
sonar.javascript.file.suffixes=.js,.jsx
sonar.typescript.file.suffixes=.ts,.tsx,.vue
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.host.url=http://localhost:9000
sonar.token=sqp_XXXXXXXXXXXXXXXXXXXXXX
```

### Create a SonarQube project
Make sure you have installed SonarQube (v10.7) on your development machine.
Run SonarQube server as localhost:9000 before do the following.

To create a SonarQube project, do the following.
1. Access the following url.
http://localhost:9000/projects/create

1. Click [Create a local project]

1. Input __nuxt3-starter-guide__ in Project display name and Project key. Click [Next]

1. Select [Use the global setting] and click [Create project]

1. Click [Locally]

1. Click [Generate] and then generate project token

### Analyze your source code
Add project token to sonar.token in sonar-project.properties.
See [this](https://docs.sonarqube.org/latest/user-guide/user-account/generating-and-using-tokens/) for more details of token.
```properties
sonar.token=sqp_XXXXXXXXXXXXXXXXXXXXXX
```

Add the following to scripts in package.json.
```json
{
  "scripts": {
    "sonar": "sonar-scanner"
  },
}
```

Run below command to run SonarQube analysis.
```bash
# run all tests
npm run test:all

# run SonarQube analysis
npm run sonar
```

You can access the following url to show result.

http://localhost:9000/dashboard?id=nuxt3-starter-guide