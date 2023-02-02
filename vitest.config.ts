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
      imports: ['vue', 'pinia', 'vue-router']
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    coverage: {
      provider: 'c8',
      include: ['src/**/*.{vue,js,ts}'],
      all: false,
      reporter: ['html', 'clover', 'text']
    },
    root: '.',
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
    globals: true,
    environment: 'happy-dom'
  }
})
