
module.exports = {
  testMatch: ["./**/tests/index.[jt]s?(x)"],
  testEnvironment: 'jsdom',
  transform: {
    "\\.[jt]sx?$": "./jest-transformer.js"
  },
  setupFilesAfterEnv: [
    './tests/setup/index.js'
  ],
  globals: {
    __isDev__: false
  }
}
