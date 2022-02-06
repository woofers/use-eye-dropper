import { createServer, Server } from 'http'
import { parse } from 'url'
import { test as base } from '@playwright/test'
import next from 'next'
import path from 'path'

// Hide Next.js SWC warning
const disableWarn = () => {
  const warn = console.warn
  const disable = () => {
    console.warn = () => {}
  }
  const enable = () => {
    console.warn = warn
  }
  disable()
  return enable
}


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
      const app = next({
        dev: false,
        dir: path.resolve(path.dirname(''))
      })
      const enable = disableWarn()
      await app.prepare()
      enable()
      const handle = app.getRequestHandler()
      const server = await new Promise(resolve => {
        const server = createServer((req, res) => {
          const parsedUrl = parse(req.url, true)
          handle(req, res, parsedUrl)
        })

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
