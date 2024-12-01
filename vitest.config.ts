import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      // インポートするライブラリにはプリセットが用意されています
      // https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
      imports: ['vue', 'pinia', 'vue-router'],
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{vue,js,ts}'],
      all: false,
      // lcovを指定することでSonarQubeがテストのカバレッジを参照するためのファイル（lcov.info）を生成する
      reporter: ['html', 'clover', 'text', 'lcov'],
    },
    root: '.',
    reporters: ['verbose', 'vitest-sonar-reporter'],
    // テスト結果をSonarQubeの解析用に出力する
    outputFile: 'test-report.xml',
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/tests/unitTest/setup.ts',
  },
})
