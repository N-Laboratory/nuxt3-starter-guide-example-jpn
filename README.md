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
Nuxt3の学習用のテンプレートプロジェクト。

最低限必要な機能を実装し、要点を解説しています。 ユニットテスト、E2Eテスト、SonarQubeによるコード解析も取り扱っています。

このプロジェクトでは以下の機能を実装しています。
* TypeScript
* EsLint (Flat Config and Stylistic)
* VeeValidate
* Navigation guard
* Pinia
* Storybook
* Vitest (unit test)
* Puppeteer (E2E test)
* SonarQube

## Contents

1. [プロジェクトの作成](#プロジェクトの作成)
1. [Typescriptの設定](#typescriptの設定)
1. [EsLint Flat Configの設定](#eslint-flat-configの設定)
1. [ESLint Stylisticの設定](#eslint-stylisticの設定)
1. [Flat ConfigとStylisticへの移行](#flat-configとstylisticへの移行)
1. [Vitestの設定](#vitestの設定)
1. [VeeValidateの設定](#veevalidateの設定)
1. [VeeValidateのテスト実装](#veevalidateのテスト実装)
1. [ナビゲーションガード](#ナビゲーションガード)
1. [Piniaの設定](#piniaの設定)
1. [Piniaのテスト実装](#piniaのテスト実装)
1. [データフェッチ](#データフェッチ)
1. [Storybookの設定](#storybookの設定)
1. [Puppeteerを利用したE2Eテストの実装](#puppeteerを利用したe2eテストの実装)
1. [SonarQubeを利用した静的解析](#sonarqubeを利用した静的解析)

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

## [Typescript](https://nuxt.com/docs/guide/concepts/typescript)の設定
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

## [EsLint Flat Config](https://eslint.nuxt.com/packages/module)の設定
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
    files: ['**/*.ts'],
    // lintの適用対象外のファイルの指定。従来の--ignore-pathで指定していたファイル等をここでは指定します。
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

lintのルールが適用されない場合はVSCodeを再起動してください。

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

## [ESLint Stylistic](https://eslint.nuxt.com/packages/module#eslint-stylistic)の設定
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
stylisticの設定が適用されない場合はVSCodeを再起動してください。

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
Flat Configやstylisticの設定が適用されない場合はVSCodeを再起動してください。

## [Vitest](https://vitest.dev/)の設定

```bash
npm install --save-dev vitest @testing-library/user-event @testing-library/vue happy-dom
```

プロジェクトのルート配下にvitest.config.tsを新規作成して以下の内容で保存します。
```ts
// vitest.config.ts
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    // エイリアスの設定
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
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
npm install --save-dev unplugin-auto-import unplugin-vue-components
```
vitest.config.tsに以下のpluginsを追加します。
```ts
// vitest.config.ts
import AutoImportFunctions from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 以下を追加
  plugins: [
    Vue(),
    // インポートしたいプラグインを指定します。 指定できるプリセットは以下を参照ください。
    // https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
    AutoImportFunctions ({ imports: [
      'vue',
      'vee-validate',
      'vue-router',
      'pinia',
    ], dts: 'auto-imports.d.ts' }),
    // ソースディレクトリをsrcに変更している想定としています。
    AutoImportComponents({
      dirs: ['src/components'],
      dts: '.nuxt/components.d.ts',
    }),
  ],
})
```
プリセットを使用せずに直接インポートしたいプラグインを指定するには以下のように記述します。
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
      // src配下の特定の拡張子のファイルのみをテスト対象に設定。
      include: ['src/**/*.{vue,js,ts}'],
      // 未テストのコードもカバレッジの対象にする。
      all: true,
      reporter: ['html', 'clover', 'text']
    },
    root: '.',
    reporters: ['verbose', 'vitest-sonar-reporter'],
    // SonarQubeでテスト結果を解析するためのレポートを出力。
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
```ts
// src/pages/index.vue
<template>
  <h1>
    Pages/index.vue
  </h1>
</template>
```

ユニットテストの実装の一例としてindex.spec.tsを新規作成して以下の内容で保存します。
```ts
// src/tests/unitTest/pages/index.spec.ts
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

## [VeeValidate](https://vee-validate.logaretm.com/v4/)の設定
```bash
npm install --save-dev vee-validate @vee-validate/i18n @vee-validate/rules
```
pluginsフォルダにvee-validate-plugin.tsを新規作成して以下の内容で保存します。
```ts
// src/plugins/vee-validate-plugin.ts
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

## VeeValidateの[テスト実装](https://vee-validate.logaretm.com/v4/guide/testing)
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
// src/tests/unitTest/setup.ts
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
// src/pages/form.vue
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
// src/tests/unitTest/pages/form.spec.ts
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Form from '~/pages/form.vue'

test('不正なemailを入力した場合にバリデーションエラーメッセージが表示されること', async () => {
  // Arrange
  const user = userEvent.setup()
  render(Form)

  // Act
  // email入力欄にabcを入力。
  await user.type(screen.getByPlaceholderText('email'), 'abc{Tab}')

  // Assert
  expect(screen.getByText('emailは有効なメールアドレスではありません')).toBeTruthy()
})
```

## [ナビゲーションガード](https://nuxt.com/docs/guide/directory-structure/middleware)
特定のページへアクセスがあった場合に、指定したページへリダイレクトさせるにはmiddlewareディレクトリにリダイレクト処理を記述したファイルを作成します。 ファイルの名前は以下のように設定することで異なる機能を持ちます。

* src/middleware/xxx.ts (リダイレクト処理を有効にするには、有効にしたいvueファイルに以下を追加する)
```ts
// src/pages/foo.vue
<script setup>
definePageMeta({
  middleware: ["xxx"]
})
</script>
```
* src/middleware/xxx.global.ts (全ページでリダイレクト処理が有効になる)

以下は一例として、src/pages/foo.vueにアクセスがあった場合にログインページへリダイレクトする処理を実装しています。 詳細な実装方法は[こちら](https://nuxt.com/docs/guide/directory-structure/middleware)を参照ください。


```ts
// src/middleware/redirect.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // src/pages/foo.vueにアクセスがあった場合
  if (to.path === '/foo') {
    // ログインページへリダイレクト
    return navigateTo('login')
  }
})
```
ユニットテストの実装に関しては[こちら](https://github.com/N-Laboratory/nuxt3-starter-guide-example-jpn/blob/main/src/tests/unitTest/middleware/redirect.global.spec.ts)を参照ください。

## [Pinia](https://pinia.vuejs.org/ssr/nuxt.html)の設定
```bash
npm install pinia @pinia/nuxt
```
piniaのgithubのissueで[こちら](https://github.com/vuejs/pinia/issues/853)で言及されているとおり、 piniaをインストールする際にnpmエラーが発生する場合があります。

エラーを回避するため公式ガイドの[こちら](https://pinia.vuejs.org/ssr/nuxt.html#Installation)で紹介されている方法を実施します。 package.jsonのoverridesに以下を追加します。
```json
{
  "overrides": {
    "vue": "latest"
  }
}
```
以下のエラーが表示される場合はoverrideのvueに直接バージョンを指定します。
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

nuxt.config.tsのmodulesに以下を追加します。
```ts
// nuxt.config.ts
export default defineNuxtConfig({
    modules: [
        ['@pinia/nuxt',
            {
              autoImports: [
                // defineStore関数の自動インポート。
                'defineStore'
              ]
              // vuexを併用する場合は以下を追加してください。
              // disableVuex: false
            }
        ]
    ]
});
```
### Storeの実装
store配下にuser.tsを新規作成して以下の内容で保存します。
```ts
// src/store/user.ts
// nuxt.config.tsのautoImportsでdefineStoreを指定している場合は以下のインポート分は不要です。
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: { email: '', password: '' }
  }),
  actions: {
    setUserInfo (email: string, password: string) {
      this.user.email = email
      this.user.password = password
    }
  }
})
```
storeをvueファイルで使用するサンプルコードは以下の通りです。
```ts
// src/pages/store.vue
<script lang="ts" setup>
import { useUserStore } from '~/store/user'

// storeの取得
const store = useUserStore()

// storeからemailの取得
const email = store.user.email

// storeからpasswordの取得
const password = store.user.password

// storeの更新
store.setUserInfo("new email", "new password")
</script>
```

## Piniaの[テスト実装](https://pinia.vuejs.org/cookbook/testing.html)
```bash
npm install --save-dev @pinia/testing
```

piniaを利用したvueファイルのテストを実行した場合に以下のエラーが発生します。
```bash
getActivePinia was called with no active Pinia. Did you forget to install pinia?
```
上記のエラーを回避するためにbeforeEachでsetActivePinia関数をコールします。
```ts
import { beforeEach, describe, expect, test } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '~/store/user'

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

  test('storeが初期化されていること', () => {
    // Arrange
    const store = useUserStore()

    // Assert
    expect(store.user).toEqual(initialUser)
  })

  test('setUserInfo関数を実行するとストアの値が更新されること', () => {
    // Arrange
    const store = useUserStore()

    // Act
    store.setUserInfo(updatedUser.email, updatedUser.password)

    // Assert
    expect(store.user).toEqual(updatedUser)
  })
})
```
storeの初期値を設定することもできます。
詳細は[こちら](https://pinia.vuejs.org/cookbook/testing.html#initial-state)を参照してください。
```ts
// src/pages/index.vue
<script lang="ts" setup>
import { useUserStore } from '~/store/user'

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
import Foo from '~/pages/index.vue'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('storeの初期値を上書きできること', () => {
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
## [データフェッチ](https://nuxt.com/docs/getting-started/data-fetching)
Nuxtは従来のaxiosにかわりuseFetchの使用を推奨しています。
詳細は[こちら](https://nuxt.com/docs/getting-started/data-fetching)を参照してください。
```ts
// pages/api.vue
<script lang="ts" setup>
const { data: bar } = await useFetch('/api/v1/foo')
</script>

<template>
  Result: {{ bar }}
</template>
```

## [Storybook](https://storybook.js.org/docs)の設定
```bash
npx storybook@latest init --type vue3 --builder vite
```
package.jsonのscriptsに以下を追加します。
```json
"scripts": {
  "storybook": "storybook dev -p 6006",
},
```
Storybook 7では自動的にプラグインの設定が行われていましたが、Stroybook 8からは明示的に設定を行う必要があります。
詳細は[こちら](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#framework-specific-vite-plugins-have-to-be-explicitly-added)を参照してください。

vite.config.tsに以下を追加します。
```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```
上記の設定を行わない場合は以下のエラーが表示されます。
```bash
 [vite] Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.
```
以下のvueファイルとstoryを新規作成します。
```typescript
// src/pages/index.vue
<template>
  <div>
    Pages/index.vue
  </div>
</template>
```
```typescript
// src/pages/index.stories.ts
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
以下のコマンドを実行してstorybookを起動します。
```bash
npm run storybook
```
以下のURLにアクセスすることで作成したstoryを表示することができます。

http://localhost:6006/


NuxtとStorybookを統合するために[@nuxtjs/storybook](https://storybook.nuxtjs.org/getting-started/setup)をプロジェクトに追加します。
```bash
npx nuxi@latest module add storybook
```

nuxt.config.tsのmodulesに以下を追加します。
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/storybook'],
})
```
インストール後は1つのコマンドでNuxtとStorybookを同時に起動することができます。
```bash
npm run dev
```

nuxt.config.tsでstorybookの設定を行うことができます。指定できるプロパティは[こちら](https://storybook.nuxtjs.org/getting-started/options)を参照してください。
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  storybook: {
    host: 'http://localhost',
    port: 6006,
  },
})
```

### インポートの設定
vueファイル内でエイリアスを使用したインポートを使用している場合に以下のエラーが発生します。
```bash
TypeError: Failed to fetch dynamically imported module:
```
```ts
// foo.vue
import Foo from '~/components/Foo.vue'
```
上記のエラーを回避するために.storybook/main.tsに以下を追加します。

※以下はソースディレクトリをsrcに変更している想定としています。
```ts
// .storybook/main.ts
import type { StorybookConfig } from "@storybook/vue3-vite";
import path from "path";

const config: StorybookConfig = {
  // 以下を追加
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

### Nuxtの自動インポート設定
StorybookはNuxtが自動インポートする関数やコンポーネントを利用することができません。
以下のライブラリを導入することで自動インポートをStorybookにも適用します。
- unplugin-auto-import
- unplugin-vue-components
```bash
npm install --save-dev unplugin-auto-import unplugin-vue-components
```
.storybook/main.tsのviteFinalに以下を追加します。
```ts
// .storybook/main.ts
import AutoImportFunctions from "unplugin-auto-import/vite";
import AutoImportComponents from 'unplugin-vue-components/vite'

const config: StorybookConfig = {
  viteFinal: async (config) => {
    if (config?.plugins) {
      // 以下を追加
      config.plugins.push(
        AutoImportFunctions ({ imports: [
          'vue',
          'vee-validate',
          'vue-router',
          'pinia',
        ], dts: '.storybook/auto-imports.d.ts' }),
      )
      // 以下を追加
      config.plugins.push(
        AutoImportComponents({
          // 自動インポートするコンポーネントが存在するディレクトリを指定
          dirs: ['src/components'],
          dts: '.storybook/components.d.ts',
        }),
      )
    }
    return config
  },
}
```

### StorybookのPinia (Store) 設定
Storybookはデフォルトではpiniaを使用することができません。

piniaを使用したvueファイルのstoryを表示した際に以下のエラーが表示されます。
```
"getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
```
上記エラーを回避するために.storybook/preview.tsに以下を追加します。
```ts
// .storybook/preview.ts
import { type Preview, setup } from '@storybook/vue3'
import type { App } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

setup((app: App) => {
  app.use(pinia)
})
```
Storyでstoreの初期値を設定するには以下を実装します。
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
      // 以下を追加します
      const store = useUserStore()
      store.user.email = 'foo@bar.com'
      store.user.password = 'foobar'
    },
    components: { Index },
    template: '<Index />',
  }),
}

export default meta
```

### StorybookのVee-Validate設定
StorybookはデフォルトでVee-Validateを使用することができません。
Vee-Validateを使用したvueファイルのstoryを表示した際に以下のエラーが表示されます。
```
Error: No such validator 'XXXX' exists.
```
上記エラーを回避するために.storybook/preview.tsに以下を追加します。
```ts
// .storybook/preview.ts
import { localize, setLocale } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import { all } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'

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
```

### StorybookのAPIモック設定
StorybookでAPIをモック化するにはMSWを使用します。
MSWはブラウザリクエストをService Workerがインターセプトして任意のレスポンスを返すことが出来るライブラリです。
併せてライブラリのmsw-storybook-addonを使用することで、APIを簡単にモックすることができ、実装もシンプルにすることができます。
```bash
npm install --save-dev msw msw-storybook-addon
```
以下のコマンドでService Workerを生成します。
```bash
npx msw init public/
```
./storybook/preview.tsでStorybookでMSWを有効にする設定を行います。
```ts
// .storybook/preview.ts
import { initialize, mswLoader } from 'msw-storybook-addon'

// MSWの有効化
initialize()

const preview: Preview = {
  // ローダーの設定
  loaders: [mswLoader],
}

export default preview
```
.storybook/main.tsのstaticDirsに、生成されたService Worker（デフォルトでは/public）を指定します。
```ts
// .storybook/main.ts
const config: StorybookConfig = {
  staticDirs: ['../public'],
}
export default config
```
以下は実装例になります。取得したAPIのレスポンスを画面に表示します。APIのレスポンスをモック化しています。
```ts
// src/pages/index.vue
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
    <button @click="handleClick">Get uuid</button>
    <p>UUID = {{ uuid }}</p>
  </div>
</template>
```
```ts
// src/pages/index.stories.ts
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
デフォルトではモック化していないAPIはすべてコンソールにWarnで表示されます。
ストーリーに直接関係のないAPIもWarnで表示されるため、コンソールに表示させたくない場合は以下の修正を行います。
```ts
// .storybook/preview.ts
import { initialize } from 'msw-storybook-addon';

initialize({
  // 以下を追加
  onUnhandledRequest: 'bypass'
})
```

### Storybookでインタラクションテストの実施
Storybookのテストアドオンを利用するとStorybook内でコンポーネントテストを実行できます。
Vitestプラグインを使用して、ストーリーをVitestのテストに変換することで実現しています。
Storybookのテストアドオンをインストールする前に以下の要件を満たしていることを確認してください。
- Storybook ≥ 8.4
- Vitest ≥ 2.1

```bash
npx storybook add @storybook/experimental-addon-test
```
上記のコマンドを実行するとvitest.workspace.tsファイルが作成されます。
vitest.workspace.tsに以下を追加して保存します。
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
      // 以下を追加（Nuxtが自動インポートする関数を利用できるようにする）
      AutoImportFunctions ({ imports: [
        'vue',
        'vee-validate',
        'vue-router',
        'pinia',
      ], dts: '.storybook/auto-imports.d.ts',
      }),
      // 以下を追加（Nuxtが自動インポートするコンポーネントを利用できるようにする）
      AutoImportComponents({
        dirs: ['src/components'],
        dts: '.storybook/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
      // エイリアスの設定（ここではソースディレクトリをsrcに変更している想定としています）
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
package.jsonのscriptsに以下を追加します。
--project=storybookを付与することでstories.tsのみテスト対象にすることができます。
```json
"scripts": {
  "test:storybook": "vitest --project=storybook",
},
```

以下は実装例になります。
画面に表示されているGet uuidボタンをクリックし、表示されたUUIDを検証しています。
```ts
// src/pages/index.vue
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
// src/pages/index.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import { http, HttpResponse } from 'msw'
import { within, userEvent, expect } from '@storybook/test'
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
  // インタラクションテストの実装
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement)

    // Act
    await userEvent.click(await canvas.findByText('Get uuid'))

    // Assert
    await expect(await canvas.findByText('UUID = test uuid')).toBeInTheDocument()
  },
}
```
以下のコマンドを実行してインタラクションテストを実施します。
```bash
npm run test:storybook
```

## [Puppeteer](https://github.com/puppeteer/puppeteer)を利用したE2Eテストの実装
Puppeteerを利用してE2Eテストの実装を行います。
PuppeteerはヘッドレスChromeの操作に特化したNode.js製のライブラリです。
Puppeteerを使うことでテストの自動化を実装することができます。
```bash
npm install --save-dev puppeteer
```

package.jsonのscriptsに以下を追加します。
```json
"scripts": {
  "test:e2e": "vitest ./src/tests/e2eTest/",
},
```

以下は実装例になります。メールアドレスとパスワードの入力フォームを作成しています。メールアドレスとパスワードを入力すると送信ボタンが活性化します。このE2Eテストでは入力後に送信ボタンが活性化しているかどうかを検証しています。
```ts
// src/pages/foo.vue
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

```ts
// src/tests/e2eTest/foo.spec.ts
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { launch } from 'puppeteer'
// PuppeteerLaunchOptionsをインポートできない場合は、PuppeteerLaunchOptionsの代わりにLaunchOptionsを使用してください。
import type { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer'

// ブラウザの起動設定。詳細は以下を参照してください。
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

   test('有効な値を入力すると送信ボタンが活性すること', async () => {
      try {
        // Arrange
        // ページ遷移
        await page.goto('http://localhost:3000/foo')

        // Act
        // メールアドレスの入力
        await page.type('input[name="email"]', 'foo@bar.com')

        // パスワードの入力
        await page.type('input[name="password"]', 'foo')

        // 送信ボタンの活性有無を取得。非活性 → true, 活性 → false
        const isDisabled = await page.$eval(
          '[data-testid="submit-btn"]',
          element => (element as HTMLButtonElement).disabled
        )

        // スクリーンショットの保存
        await page.screenshot({
          path: './src/tests/e2eTest/e2e-test.png',
          fullPage: true
        })

        // Assert
        // 送信ボタンが活性であるかを検証
        expect(isDisabled).toBe(false)
      } catch (e) {
        console.error(e)
        expect(e).toBeUndefined()
      }
    }, 60000)
})
```
以下のコマンドを実行してNuxtを起動します。
```bash
npm run dev
```

以下のコマンドを実行してE2Eテストを実行します。
```bash
npm run test:e2e
```

## [SonarQube](https://docs.sonarqube.org/latest/)を利用した静的解析
SonarQubeは、ソフトウェア開発におけるコード品質の向上を目的とした静的コード解析ツールです。ここでは作成したNuxtプロジェクトをSonarQubeを利用して静的コード解析を実行します。
```bash
npm install --save-dev sonarqube-scanner vitest-sonar-reporter
```

vitest.config.tsに以下を追加します。
* reporterにlcovを追加
* reportersを追加
```ts
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      // lcovを追加。SonarQubeのカバレッジ収集に使用します。
      reporter: ['html', 'clover', 'text', 'lcov']
    },
    // 以下を追加。SonarQubeのテストコード解析に使用します。
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
  }
})
```
ルートディレクトリにsonar-project.propertiesを作成して以下の内容で保存します。
指定できるプロパティの詳細は[こちら](https://docs.sonarqube.org/9.6/project-administration/narrowing-the-focus/)を参照ください。
```properties
sonar.projectKey=sample
sonar.projectName=sample
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

### SonarQubeプロジェクトの作成
事前にローカルにSonarQube (v10.7)がインストールされていることを確認してください。v10.7以外のバージョンでは以降の手順と異なる場合があります。

SonarQubeをlocalhost:9000で起動した状態で以降の手順を実施します。

1. 次のurlにアクセスします。
http://localhost:9000/projects/create

1. Create a local projectをクリックします。

1. Project display nameとProject keyにsampleと入力します。Nextをクリックします。

1. Use the global settingを選択してCreate projectをクリックします。

1. Locallyをクリックします。

1. Generateをクリックします。トークンが画面に表示されるのでコピーします。

### ソースコードの解析
コピーしたトークンをsonar-project.propertiesのsonar.tokenに貼り付けます。
トークンに関しての詳細は[こちら](https://docs.sonarqube.org/latest/user-guide/user-account/generating-and-using-tokens/)を参照ください。
```properties
sonar.token=sqp_XXXXXXXXXXXXXXXXXXXXXX
```

package.jsonのscriptsに以下を追加します。
```json
{
  "scripts": {
    "sonar": "sonar-scanner"
  },
}
```
以下のコマンドでSonarQubeによる解析を実行します。
```bash
npm run sonar
```

解析完了後は以下のURLで解析結果を確認することができます。

http://localhost:9000/dashboard?id=nuxt3-starter-guide