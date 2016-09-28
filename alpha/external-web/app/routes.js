var express = require('express')
var logger = require('./services/bunyan-logger')

var router = express.Router()
module.exports = router

// Include custom route files.
var routeAboutYou = require('./routes/about-you')
require('./routes/index')
require('./routes/relationship')
require('./routes/escorts')
require('./routes/about-your-income')
require('./routes/application-submitted')
require('./routes/claim')
require('./routes/claim-details')
require('./routes/travel-profile')
require('./routes/declare-your-visit')
require('./routes/submit-claim')

// Passing the router in to make it easier to test
routeAboutYou(router)

// Executed prior to any route being called.
router.use(function (request, response, next) {
  logger.info({ request: request }, 'Route Started.')
  next()
})

// Executed after any route completes.
router.use(function (request, response) {
  logger.info({ response: response }, 'Route Complete.')
})
