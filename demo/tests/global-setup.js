const { exec } = require('child_process')

const run = command =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) return reject({ error, stderr })
      resolve({ stdout, stderr })
    })
  })

const build = async () => {
  try {
    await run('next build')
  } catch (e) {
    const { stderr } = e
    console.error(stderr)
    throw new Error('next build failed')
  }
}

const globalSetup = async () => {
  process.env.PLAYWRIGHT = '1'
  if (process.env.SKIP_BUILD === 'true') {
    console.log('skipping build as SKIP_BUILD is set')
  } else {
    await build()
  }
}

module.exports = globalSetup
