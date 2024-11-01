const coverage = require('./coverage/coverage-summary.json')
const pc = require('picocolors')


const prop = key => value => value[key]
const entries = Object.entries
const filter = func => value => value.filter(func)
const map = func => value => value.map(func)
const reduce = (func, start) => value => value.reduce(func, start)
const pipe = (...funcs) => value => reduce((next, func) => func(next), value)(funcs)

const cats = ['lines', 'statements', 'functions', 'branches']
const FAIL = 90

pipe(
  prop('total'),
  entries,
  filter(([key]) => cats.includes(key)),
  map(([key, value]) => [key, value['pct']]),
  reduce((status, [key, value]) => {
    pc.green()
    if (value >= FAIL) {
      console.log(pc.green('✓') + pc.dim(` Test coverage for '${key}' is at ${value}%`))
      return status
    }
    console.error(pc.red('✕') + pc.dim(` Test coverage for '${key}' is only at ${value}% but has goal of ${FAIL}%`))
    return true
  }, false),
  failed => {
    const exitCode = failed ? 1 : 0
    process.exit(exitCode)
  }
)(coverage)
