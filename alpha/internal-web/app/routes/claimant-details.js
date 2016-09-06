/**
 * This file defines all routes for the claimant-details page.
 */
var router = require('../routes')
var client = require('../eligibility-client')
var log4js = require('../log4js')
var LOGGER = log4js.getLogger('claimant-details')

// Valid Statuses for a claimant application.
var APPLICATION_STATUS = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ESCALATED: 'ESCALATED'
}

/**
 * Retrieve all claimants in the system.
 */
router.get('/claimant-details/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  LOGGER.debug('GET /claimant-details/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      LOGGER.info('Successfully retrieved details for claimant with id: ' + id)
      response.render('claimant-details', { 'claimant': claimant })
    } else {
      LOGGER.error('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

/**
 * Set the application status of the claimant with the given ID to APPROVED.
 */
router.post('/claimant-details/:claimant_id/approve', function (request, response) {
  var id = request.params.claimant_id
  LOGGER.debug('GET /claimant-details/' + id + '/approve called.')
  updateApplicationStatus(id, APPLICATION_STATUS.APPROVED, response)
})

/**
 * Set the application status of the claimant with the given ID to REJECTED.
 */
router.post('/claimant-details/:claimant_id/reject', function (request, response) {
  var id = request.params.claimant_id
  LOGGER.debug('GET /claimant-details/' + id + '/reject called.')
  updateApplicationStatus(id, APPLICATION_STATUS.REJECTED, response)
})

/**
 * Set the application status of the claimant with the given ID to ESCALATED.
 */
router.post('/claimant-details/:claimant_id/escalate', function (request, response) {
  var id = request.params.claimant_id
  LOGGER.debug('GET /claimant-details/' + id + '/escalate called.')
  updateApplicationStatus(id, APPLICATION_STATUS.ESCALATED, response)
})

/**
 * Update the application status of the claimant with the given ID to the given status.
 * @param id The ID of the claimant to update.
 * @param status The application status to apply to the request claimant.
 * @param response The HTML response object to be used for responding to the request.
 */
function updateApplicationStatus (id, status, response) {
  var updatedStatus = {
    'status.applicationStatus': status
  }

  client.update(id, updatedStatus, function (error, claimant) {
    if (!error) {
      LOGGER.info('Successfully changed claimants application status to ' + updatedStatus + '. ID: ' + id)
      response.redirect('/claimant-details/' + id)
    } else {
      LOGGER.error('Failed to change claimants application status to ' + updatedStatus + '. ID: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
}

/**
 * Return download response for evidence file
 */
router.get('/claimant-details/:claimant_id/evidence/:eligibility_id', function (request, response) {
  var id = request.params.claimant_id
  var eligibilityId = request.params.eligibility_id
  LOGGER.debug('GET /claimant-details/' + id + '/evidence/' + eligibilityId + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      LOGGER.info('Successfully retrieved details for claimant with id: ' + id)
      response.download('./eligibility-uploads/' + eligibilityId, claimant[ 'eligibility-file' ][ 'originalFilename' ])
    } else {
      LOGGER.error('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
