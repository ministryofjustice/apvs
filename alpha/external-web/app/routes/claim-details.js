var router = require('../routes')
var logger = require('../services/bunyan-logger').logger

router.get('/claim-details/:claimant_id', function (request, response) {
  logger.info({request: request})
  response.render('claim-details')
  logger.info({response: response})
})

// TODO
router.post('/claim-details/:claimant_id', function (request, response) {
  logger.info({request: request})
  logger.info({response: response})
})
