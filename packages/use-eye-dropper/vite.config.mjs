import { defineConfig } from 'vite'
import { configDefaults, coverageConfigDefaults } from 'vitest/config'

export default defineConfig({
  define: {
    __isDev__: false
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['./**/tests/*.test.{jsx,tsx,mjs,ts,js}'],
    exclude: [
      '**/lib/**',
      ...configDefaults.exclude
    ],
    setupFiles: ['./tests/setup/index.mjs'],
    reporters: ['default'],
    coverage: {
      all: true,
      enabled: true,
      provider: 'istanbul',
      exclude: [
        '**/lib/**',
        'coverage.js',
        ...coverageConfigDefaults.exclude
      ],
      reporter: ['json-summary', 'html']
    }
  }
})
