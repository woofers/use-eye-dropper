import { expect } from '@playwright/test'
import test from './next-fixture.mjs'

test('open() does not resolve when called with an aborted signal', async ({
  page,
  port
}) => {
  await page.locator('"Abort controller now"').click()
  await page.locator('"Open"').click()
  await expect(page.locator('div[aria-label="Status"]')).toHaveText(
    "Failed to execute 'open' on 'EyeDropper': Color selection aborted."
  )
})

test('open() does not resolve when called with an aborted signal while open', async ({
  page,
  port
}) => {
  await page.locator('"Abort controller after 1s"').click()
  await page.locator('"Open"').click()
  await page.locator('"Done"').waitFor()
  await expect(page.locator('div[aria-label="Status"]')).toHaveText(
    'Color selection aborted.'
  )
})

test('open() is canceled on unmount', async ({ page, port }) => {
  await page.locator('"Unmount after 1s"').click()
  await page.locator('"Open"').click()
  await page.locator('"Mount"').waitFor()
  await expect(page.locator('div[aria-label="Status"]')).toHaveText(
    'Color selection aborted.'
  )
})

test('open() prevents executing setState after unmount', async ({
  page,
  port
}) => {
  await page.locator('"Unmount after 1s"').click()
  await page.locator('"Open"').click()
  await page.locator('"Mount"').waitFor()
  await expect(page.locator('div[aria-label="Internal"]')).toHaveText(
    'Internal: None'
  )
})

test('close() rejects open()', async ({ page, port }) => {
  await page.locator('"Close after 1s"').click()
  await page.locator('"Open"').click()
  await page.locator('"Done"').waitFor()
  await expect(page.locator('div[aria-label="Status"]')).toHaveText(
    'Color selection aborted.'
  )
})

test('close() works with signal', async ({ page, port }) => {
  await page.locator('"Open"').click()
  await page.locator('"Close"').click()
  await expect(page.locator('div[aria-label="Status"]')).toHaveText(
    'Color selection aborted.'
  )
  await page.locator('"Abort controller now"').click()
  await page.locator('"Open"').click()
  await expect(page.locator('div[aria-label="Status"]')).toHaveText(
    "Failed to execute 'open' on 'EyeDropper': Color selection aborted."
  )
})

test('isSupported() is truthy when supported', async ({ page, port }) => {
  const status = page.locator('body > div > div > span')
  await expect(status).toHaveText('EyeDropper API is supported')
})
