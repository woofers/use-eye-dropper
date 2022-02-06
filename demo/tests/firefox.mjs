import { expect } from '@playwright/test'
import test from './next-fixture.mjs'

test('open() is rejected when EyeDropper API is not supported', async ({ page, port }) => {
  await page.locator('"Open"').click()
  await expect(page.locator('div[aria-label="Status"]')).toHaveText('Unsupported browser.')
})

test('close() works when EyeDropper API is not supported', async ({ page, port }) => {
  await page.locator('"Close"').click()
  await expect(page.locator('div[aria-label="Status"]')).toHaveText('None')
})

test('isSupported() is falsy when unsupported', async ({ page, port }) => {
  const status = page.locator('body > div > div > span')
  await expect(status).toHaveText('EyeDropper API unavailable')
})
