var bunyan = require('bunyan')

// See alpha examples with serialisers and request/response middleware
var logger = bunyan.createLogger({
  name: 'production-example-web',
  level: 'debug'
})

module.exports = logger
