var router = require('../routes')
var client = require('../services/eligibility-client')
var logger = require('../services/bunyan-logger').logger

// Append 'data' to the JSON object as this is required by the DataTable library.
router.get('/claimants', function (request, response) {
  logger.info({request: request})

  client.getAll(function (error, claimants) {
    if (!error) {
      var jsonClaimants = { data: claimants }
      response.json(jsonClaimants)
      logger.info({response: response}, 'Returning all claimants.')
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to retrieve all claimants.')
    }
  })
})

router.get('/claimants/:claimant_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.json(claimant)
      logger.info({response: response}, 'Returning claimant with ID: %s.', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to retrieve claimant with ID: %s.', id)
    }
  })
})
