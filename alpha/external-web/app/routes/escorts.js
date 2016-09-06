/**
 * This file defines all routes for the escorts page.
 */
var router = require('../routes')

// A client used to make database calls.
var client = require('../eligibility-client')

var log4js = require('../log4js')
var LOGGER = log4js.getLogger('escorts')

/**
 * Renders the escorts page with the details of the claimant with the given claimant id.
 *
 * Example call: http://localhost:3000/escorts/57c3f1139e03be003bfac1aa
 */
router.get('/escorts/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  LOGGER.debug('GET /escorts/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      LOGGER.info('Successfully retrieved claimant with id: ' + id)
      response.render('escorts', { 'claimant': claimant })
    } else {
      LOGGER.error('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

/**
 * Save the contents of the relationship form to the document for the claimant with the given id.
 *
 * Example call: http://localhost:3000/escorts/57c3f1139e03be003bfac1aa
 */
router.post('/escorts/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  LOGGER.debug('POST /escorts/' + id + ' called.')

  client.updateField(id, 'escorts', request.body, function (error, claimant) {
    if (!error) {
      LOGGER.info('Successfully updated claimant with id: ' + id)
      response.redirect('/about-your-income/' + id)
    } else {
      LOGGER.error('Failed to update claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
