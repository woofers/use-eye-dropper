import { expect } from '@playwright/test'
import test from './next-fixture.mjs'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const goto = async (page, port) =>
  page.goto(`http://localhost:${port}/use-eye-dropper/playground`)

test('open() does not resolve when called with an aborted signal', async ({ page, port }) => {
  await goto(page, port)
  await page.locator('"Abort controller now"').click()
  await page.locator('"Open"').click()
  await expect(page.locator('div[aria-label="Status"]')).toHaveText("Failed to execute 'open' on 'EyeDropper': Color selection aborted.")
})

test('open() does not resolve when called with an aborted signal while open', async ({ page, port }) => {
  await goto(page, port)
  await page.locator('"Abort controller after 1s"').click()
  const timer = sleep(1000)
  await page.locator('"Open"').click()
  await timer
  await expect(page.locator('div[aria-label="Status"]')).toHaveText('Color selection aborted.')
})

test('open() is canceled on unmount', async ({ page, port }) => {
  await goto(page, port)
  await page.locator('"Unmount after 1s"').click()
  const timer = sleep(1000)
  await page.locator('"Open"').click()
  await timer
  await expect(page.locator('div[aria-label="Status"]')).toHaveText('Color selection aborted.')
})

test('close() rejects open()', async ({ page, port }) => {
  await goto(page, port)
  await page.locator('"Close after 1s"').click()
  const timer = sleep(1000)
  await page.locator('"Open"').click()
  await timer
  await expect(page.locator('div[aria-label="Status"]')).toHaveText('Color selection aborted.')
})

test('close() works with signal', async ({ page, port }) => {
  await goto(page, port)
  await page.locator('"Open"').click()
  await page.locator('"Close"').click()
  await expect(page.locator('div[aria-label="Status"]')).toHaveText('Color selection aborted.')
  await page.locator('"Abort controller now"').click()
  await page.locator('"Open"').click()
  await expect(page.locator('div[aria-label="Status"]')).toHaveText("Failed to execute 'open' on 'EyeDropper': Color selection aborted.")
})

test('isSupported() is truthy when supported', async ({ page, port }) => {
  await goto(page, port)
  const status = page.locator('body > div > div > span')
  await expect(status).toHaveText('EyeDropper API is supported')
})
