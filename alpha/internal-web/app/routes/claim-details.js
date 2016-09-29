var router = require('../routes')
var client = require('../services/database/db-client')

const claimsCollection = 'claims'

var CLAIM_STATUS = {
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

router.get('/claim-details/:claim_id', function (request, response, next) {
  client.get(request.params.claim_id, claimsCollection)
    .then(function (claim) {
      response.render('claim-details', { 'claim': claim })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

router.post('/claim-details/approve', function (request, response, next) {
  updateClaimStatus(CLAIM_STATUS.ACCEPTED, request, response, next)
})

router.post('/claim-details/reject', function (request, response, next) {
  updateClaimStatus(CLAIM_STATUS.REJECTED, request, response, next)
})

function updateClaimStatus (status, request, response, next) {
  var updatedStatus = {
    'status': status
  }

  var id = request.body.id
  client.update(id, updatedStatus, claimsCollection)
    .then(function () {
      response.json(status)
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
}
