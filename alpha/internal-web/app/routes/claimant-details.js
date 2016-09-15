var router = require('../routes')
var client = require('../services/db-client')

const claimantsCollection = 'claimants'

// Valid Statuses for a claimant application.
var APPLICATION_STATUS = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ESCALATED: 'ESCALATED'
}

router.get('/claimant-details/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id, claimantsCollection)
    .then(function (claimant) {
      response.render('claimant-details', { 'claimant': claimant })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
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
  client.update(id, updatedStatus, claimantsCollection)
    .then(function () {
      response.redirect('/claimant-details/' + id)
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
}

router.get('/claimant-details/:claimant_id/evidence/:eligibility_id', function (request, response, next) {
  var eligibilityId = request.params.eligibility_id

  client.get(request.params.claimant_id, claimantsCollection)
    .then(function (claimant) {
      response.download('./eligibility-uploads/' + eligibilityId, claimant[ 'eligibility-file' ][ 'originalFilename' ])
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})
