var router = require('../routes')
var logger = require('../services/bunyan-logger').logger

router.get('/application-submitted', function (request, response) {
  logger.info({request: request})
  response.render('application-submitted')
  logger.info({response: response})
})
