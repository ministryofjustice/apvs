var express = require('express')
var logger = require('./services/bunyan-logger')

var router = express.Router()
module.exports = router

// Include custom route files.
require('./routes/index')
require('./routes/about-you')
require('./routes/relationship')
require('./routes/escorts')
require('./routes/about-your-income')
require('./routes/application-submitted')
require('./routes/claim')
require('./routes/claim-details')
require('./routes/travel-profile')

// Executed prior to any route being called.
router.use(function (request, response, next) {
  logger.info({ request: request }, 'Route Started.')
  next()
})

// Executed after any route completes.
router.use(function (request, response) {
  logger.info({ response: response }, 'Route Complete.')
})
