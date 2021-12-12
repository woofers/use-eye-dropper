const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const config = require('./next.config.js')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const format = data => data ? data : ''

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:3000${format(config.basePath)}/`)
  })
})
