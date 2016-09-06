/**
 * This file defines generic routes for returning claimant JSON objects.
 */
var router = require('../routes')
var client = require('../eligibility-client')
var log4js = require('../log4js')
var LOGGER = log4js.getLogger('claimants')

/**
 * Retrieve all claimants in the system.
 */
router.get('/claimants', function (request, response) {
  LOGGER.debug('GET /claimants/ called.')

  client.getAll(function (error, claimants) {
    if (!error) {
      LOGGER.info('Returning all claimants.')

      // Append 'data' to the JSON object. Required by the DataTable library.
      var jsonClaimants = { data: claimants }
      response.json(jsonClaimants)
    } else {
      LOGGER.error('Failed to retrieve claimants.')
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

/**
 * Retrieve a single claimant by their claimant ID.
 */
router.get('/claimants/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  LOGGER.debug('GET /claimants/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      LOGGER.info('Returning claimant: ' + claimant)
      response.json(claimant)
    } else {
      LOGGER.error('Failed to retrieve claimants')
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
