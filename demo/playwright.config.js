module.exports = {
  globalSetup: './tests/global-setup.js',
  use: {
    headless: false,
    actionTimeout: 10000,
    baseURL: 'http://localhost:3000/use-eye-dropper/'
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
