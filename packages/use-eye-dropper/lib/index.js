if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./use-eye-dropper.dev.js')
}
else {
  module.exports = require('./use-eye-dropper.js')
}
