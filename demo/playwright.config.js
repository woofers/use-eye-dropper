module.exports = {
  globalSetup: './tests/global-setup.js',
  use: {
    headless: false,
    actionTimeout: 10000,
    browserName: 'chromium',
    baseURL: 'http://localhost:3000/use-eye-dropper/'
  }
}
