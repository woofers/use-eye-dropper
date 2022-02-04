import { expect } from '@playwright/test'
import test from './next-fixture.mjs'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const goto = async (page, port) =>
  page.goto(`http://localhost:${port}/use-eye-dropper/playground`)

test('close() works when EyeDropper API is not supported', async ({ page, port }) => {
  await goto(page, port)
  await page.locator('"Close"').click()
  const msg = await page.innerText('div[aria-label="Status"]')
  expect(msg).toBe('None')
})

test('isSupported() is falsy when unsupported', async ({ page, port }) => {
  await goto(page, port)
  const status = page.locator('body > div > div > span')
  await expect(status).toHaveText('EyeDropper API unavailable')
})
