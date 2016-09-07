var router = require('../routes')
var client = require('../eligibility-client')
var logger = require('../services/bunyan-logger').logger

router.get('/claimants', function (request, response) {
  logger.info({request: request})

  client.getAll(function (error, claimants) {
    if (!error) {
      logger.info('Returning all claimants.')

      // Append 'data' to the JSON object. Required by the DataTable library.
      var jsonClaimants = { data: claimants }
      response.json(jsonClaimants)
    } else {
      logger.error('Failed to retrieve claimants.')
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

router.get('/claimants/:claimant_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.json(claimant)
    } else {
      logger.error('Failed to retrieve claimants')
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
