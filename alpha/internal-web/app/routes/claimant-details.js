var router = require('../routes')
var client = require('../eligibility-client')

// Valid Statuses for a claimant application.
var APPLICATION_STATUS = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ESCALATED: 'ESCALATED'
}

router.get('/claimant-details/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claimant-details/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Successfully retrieved details for claimant with id: ' + id)
      response.render('claimant-details', { 'claimant': claimant })
    } else {
      console.log('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

router.post('/claimant-details/:claimant_id/approve', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claimant-details/' + id + '/approve called.')
  updateApplicationStatus(id, APPLICATION_STATUS.APPROVED, response)
})

router.post('/claimant-details/:claimant_id/reject', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claimant-details/' + id + '/reject called.')
  updateApplicationStatus(id, APPLICATION_STATUS.REJECTED, response)
})

router.post('/claimant-details/:claimant_id/escalate', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claimant-details/' + id + '/escalate called.')
  updateApplicationStatus(id, APPLICATION_STATUS.ESCALATED, response)
})

function updateApplicationStatus (id, status, response) {
  var updatedStatus = {
    'status.applicationStatus': status
  }

  client.update(id, updatedStatus, function (error, claimant) {
    if (!error) {
      console.log('Successfully changed claimants application status to ' + updatedStatus + '. ID: ' + id)
      response.redirect('/claimant-details/' + id)
    } else {
      console.log('Failed to change claimants application status to ' + updatedStatus + '. ID: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
}

router.get('/claimant-details/:claimant_id/evidence/:eligibility_id', function (request, response) {
  var id = request.params.claimant_id
  var eligibilityId = request.params.eligibility_id
  console.log('GET /claimant-details/' + id + '/evidence/' + eligibilityId + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Successfully retrieved details for claimant with id: ' + id)
      response.download('./eligibility-uploads/' + eligibilityId, claimant[ 'eligibility-file' ][ 'originalFilename' ])
    } else {
      console.log('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
