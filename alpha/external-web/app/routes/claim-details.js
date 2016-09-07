var router = require('../routes')
var logger = require('../services/bunyan-logger').logger
var externalApiRest = require('../services/external-api-rest')

router.get('/claim-details/:claimant_id', function (request, response) {
  logger.info({request: request})
  response.render('claim-details', {'id': request.params.claimant_id})
  logger.info({response: response})
})

router.post('/claim-details/:claimant_id', function (request, response) {
  logger.info({request: request})
  var amount = request.query.amount ? parseInt(request.query.amount) : 99
  externalApiRest.checkForAutomaticProcessing({amount: amount}, function (error, result) {
    if (!error) {
      if (result['processing-type'] === 'automatic') {
        response.redirect('/claim-automatic')
      } else {
        response.redirect('/claim-manual')
      }
    } else {
      response.status(500).render('error', {message: error.message, error: error})
    }
    logger.info({response: response})
  })
})

router.get('/claim-automatic', function (request, response) {
  logger.info({request: request})
  response.render('claim-automatic')
  logger.info({response: response})
})

router.get('/claim-manual', function (request, response) {
  logger.info({request: request})
  response.render('claim-manual')
  logger.info({response: response})
})
