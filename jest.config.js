
module.exports = {
  testMatch: ["./**/tests/*.[jt]s?(x)"],
  testEnvironment: 'jsdom',
  transform: {
    "\\.[jt]sx?$": "./jest-transformer.js"
  },
  setupFilesAfterEnv: [
    './tests/mocks/eye-dropper.js'
  ],
  globals: {
    __DEV__: true
  }
}
