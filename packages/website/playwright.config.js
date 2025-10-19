module.exports = {
  globalSetup: './tests/global-setup.js',
  globalTeardown: './tests/global-teardown.js',
  timeout: 30000,
  expect: {
    timeout: 10000
  },
  use: {
    headless: false,
    actionTimeout: 10000,
    navigationTimeout: 30000,
    baseURL: 'http://localhost:${port}/use-eye-dropper/playground'
  },
  projects: [
    {
      name: 'Chrome',
      testMatch: '/tests/chrome.mjs',
      use: {
        browserName: 'chromium',
      }
    },
    {
      name: 'Firefox',
      testMatch: '/tests/firefox.mjs',
      use: {
        browserName: 'firefox',
      }
    }
  ]
}
