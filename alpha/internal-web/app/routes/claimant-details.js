var router = require('../routes')
var client = require('../eligibility-client')
var logger = require('../services/bunyan-logger').logger

// Valid Statuses for a claimant application.
var APPLICATION_STATUS = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ESCALATED: 'ESCALATED'
}

router.get('/claimant-details/:claimant_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.render('claimant-details', { 'claimant': claimant })
      logger.info({response: response}, 'Successfully retrieved details for claimant with id: %s', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to retrieve claimant with id: %s', id)
    }
  })
})

router.post('/claimant-details/:claimant_id/approve', function (request, response) {
  logger.info({request: request})
  updateApplicationStatus(APPLICATION_STATUS.APPROVED, request, response)
})

router.post('/claimant-details/:claimant_id/reject', function (request, response) {
  logger.info({request: request})
  updateApplicationStatus(APPLICATION_STATUS.REJECTED, request, response)
})

router.post('/claimant-details/:claimant_id/escalate', function (request, response) {
  logger.info({request: request})
  updateApplicationStatus(APPLICATION_STATUS.ESCALATED, request, response)
})

function updateApplicationStatus (status, request, response) {
  var updatedStatus = {
    'status.applicationStatus': status
  }

  var id = request.params.claimant_id
  client.update(id, updatedStatus, function (error, claimant) {
    if (!error) {
      response.redirect('/claimant-details/' + id)
      logger.info({response: response}, 'Successfully changed claimants application status to %s. ID: %s', updatedStatus, id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to change claimants application status to %s. ID: %s', updatedStatus, id)
    }
  })
}

router.get('/claimant-details/:claimant_id/evidence/:eligibility_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  var eligibilityId = request.params.eligibility_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.download('./eligibility-uploads/' + eligibilityId, claimant[ 'eligibility-file' ][ 'originalFilename' ])
      logger.info({response: response}, 'Successfully retrieved details for claimant with id: %s', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to retrieve claimant with id: %s', id)
    }
  })
})
