var router = require('../routes')
var client = require('../services/eligibility-client')

// Valid Statuses for a claimant application.
var APPLICATION_STATUS = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ESCALATED: 'ESCALATED'
}

router.get('/claimant-details/:claimant_id', function (request, response, next) {
  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.render('claimant-details', { 'claimant': claimant })
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})

router.post('/claimant-details/:claimant_id/approve', function (request, response, next) {
  updateApplicationStatus(APPLICATION_STATUS.APPROVED, request, response, next)
})

router.post('/claimant-details/:claimant_id/reject', function (request, response, next) {
  updateApplicationStatus(APPLICATION_STATUS.REJECTED, request, response, next)
})

router.post('/claimant-details/:claimant_id/escalate', function (request, response, next) {
  updateApplicationStatus(APPLICATION_STATUS.ESCALATED, request, response, next)
})

function updateApplicationStatus (status, request, response, next) {
  var updatedStatus = {
    'status.applicationStatus': status
  }

  var id = request.params.claimant_id
  client.update(id, updatedStatus, function (error, claimant) {
    if (!error) {
      response.redirect('/claimant-details/' + id)
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
}

router.get('/claimant-details/:claimant_id/evidence/:eligibility_id', function (request, response, next) {
  var id = request.params.claimant_id
  var eligibilityId = request.params.eligibility_id

  client.get(id, function (error, claimant) {
    if (!error) {
      response.download('./eligibility-uploads/' + eligibilityId, claimant[ 'eligibility-file' ][ 'originalFilename' ])
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})
