module.exports = {
  globalSetup: './tests/global-setup.js',
  use: {
    headless: false,
    actionTimeout: 10000,
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
