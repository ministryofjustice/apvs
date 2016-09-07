var router = require('../routes')
var logger = require('../services/bunyan-logger').logger

router.get('/', function (request, response) {
  logger.info({request: request})
  response.render('index')
  logger.info({response: response})
})
