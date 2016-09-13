var router = require('../routes')
var client = require('../services/db-client')

const claimsCollection = 'claims'

var CLAIM_STATUS = {
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

router.get('/claim-details/:claim_id', function (request, response, next) {
  var id = request.params.claim_id
  client.get(id, claimsCollection, function (error, claim) {
    if (!error) {
      response.render('claim-details', { 'claim': claim })
    } else {
      response.status(500).render('error', { message: error.message, error: error })
    }
    next()
  })
})

router.post('/claim-details/approve', function (request, response, next) {
  updateClaimStatus(CLAIM_STATUS.ACCEPTED, request, response)
  next()
})

router.post('/claim-details/reject', function (request, response, next) {
  updateClaimStatus(CLAIM_STATUS.REJECTED, request, response)
  next()
})

function updateClaimStatus (status, request, response, next) {
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
