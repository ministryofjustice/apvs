var express = require('express')
var logger = require('./services/bunyan-logger')

var router = express.Router()

module.exports = router

// Include custom route files.
require('./routes/index')
require('./routes/claimants')
require('./routes/claimant-details')
require('./routes/api')

// Executed prior to any route being called.
router.use(function (request, response, next) {
  logger.info({ request: request }, 'Route Started.')
  next()
})

// Executed after any route completes.
router.use(function (request, response) {
  logger.info({ response: response }, 'Route Complete.')
})
