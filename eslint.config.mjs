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