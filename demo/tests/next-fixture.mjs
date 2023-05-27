import { createServer } from 'http'
import { test as base } from '@playwright/test'
import handler from 'serve-handler'

const getUrl = (url, port) => url.replace('${port}', port)

const test = base.extend({
  url: [
    async ({ page, port, baseURL }, use) => {
      const url = getUrl(baseURL, port)
      await page.goto(url)
      await use(url)
    },
    {
      auto: true
    }
  ],
  port: [
    async ({}, use) => {
      const server = await new Promise(resolve => {
        const server = createServer((req, res) => {
          return handler(req, res, { public: 'build' })
        });

        server.listen(error => {
          if (error) throw error
          resolve(server)
        })
      })
      const port = String(server.address().port)
      await use(port)
    },
    {
      scope: 'worker'
    }
  ]
})

export default test
