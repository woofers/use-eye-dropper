import { createServer, Server } from 'http'
import { parse } from 'url'
import { test as base } from '@playwright/test'
import next from 'next'
import path from 'path'
import { AddressInfo } from 'net'

const test = base.extend({
  port: [
    async (_, use) => {
      const app = next({
        dev: false,
        dir: path.resolve(__dirname, '..')
      })

      await app.prepare()
      const handle = app.getRequestHandler()
      const server: Server = await new Promise(resolve => {
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
