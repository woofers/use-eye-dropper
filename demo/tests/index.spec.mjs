import { expect } from '@playwright/test'
import test from './next-fixture.mjs'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const goto = async (page, port) =>
  page.goto(`http://localhost:${port}/use-eye-dropper/playground`)

test('open() does not resolve when called with an aborted signal', async ({ page, port }) => {
  await goto(page, port)
  await page.click('button:has-text("Abort controller now")')
  await page.click('button:has-text("Open")')
  const msg = await page.innerText('div[aria-label="Status"]')
  expect(msg).toBe("Failed to execute 'open' on 'EyeDropper': Color selection aborted.")
})

test('open() does not resolve when called with an aborted signal while open', async ({ page, port }) => {
  await goto(page, port)
  await page.click('button:has-text("Abort controller after 1s")')
  const timer = sleep(1000)
  await page.click('button:has-text("Open")')
  await timer
  const msg = await page.innerText('div[aria-label="Status"]')
  expect(msg).toBe('Color selection aborted.')
})

/*
test('open() is canceled on unmount', async ({ page, port }) => {
  await goto(page, port)
  await page.click('button:has-text("Unmount after 1s")')
  const timer = sleep(1000)
  await page.click('button:has-text("Open")')
  await timer
  const msg = await page.innerText('div[aria-label="Status"]')
  expect(msg).toBe('Color selection aborted.')
})
*/

test('close() rejects open()', async ({ page, port }) => {
  await goto(page, port)
  await page.click('button:has-text("Close after 1s")')
  const timer = sleep(1000)
  await page.click('button:has-text("Open")')
  await timer
  const msg = await page.innerText('div[aria-label="Status"]')
  expect(msg).toBe('Color selection aborted.')
})

test('isSupported() is truthy when supported', async ({ page, port }) => {
  await goto(page, port)
  const status = page.locator('body > div > div > span')
  await expect(status).toHaveText('EyeDropper API is supported')
})
