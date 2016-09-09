var router = require('../routes')
var client = require('../services/db-client')

var claimsCollection = 'claims'

var CLAIM_STATUS = {
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

router.get('/claim-details/:claim_id', function (request, response) {
  var id = request.params.claim_id
  client.get(id, claimsCollection, function (error, claim) {
    if (!error) {
      response.render('claim-details', { 'claim': claim })
    } else {
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

router.post('/claim-details/approve', function (request, response) {
  updateClaimStatus(CLAIM_STATUS.ACCEPTED, request, response)
})

router.post('/claim-details/reject', function (request, response) {
  updateClaimStatus(CLAIM_STATUS.REJECTED, request, response)
})

function updateClaimStatus (status, request, response) {
  var updatedStatus = {
    'status': status
  }

  var id = request.body.id
  client.update(id, updatedStatus, claimsCollection, function (error, claim) {
    if (!error) {
      response.json(status)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
}
