var router = require('../routes')
var client = require('../services/db-client')
var moment = require('moment')

const claimsCollection = 'claims'

router.get('/claims-list', function (request, response, next) {
  response.render('claims-list')
  next()
})

router.get('/claims', function (request, response, next) {
  client.getAll(claimsCollection)
    .then(function (claims) {
      var jsonClaims = { data: claims }
      response.json(jsonClaims)
    })
    .catch(function (error) {
      response.status(500).render('error', { message: error.message, error: error })
    })
  next()
})

router.get('/refresh-claims', function (request, response, next) {
  client.dropCollection(claimsCollection)
    .then(function() {
      saveRandomClaimant(response)
    })
    .catch(function (error) {
      return response.status(500).render('error', { error: error })
    })
  next()
})

var getRandomClaim = function () {
  var eligibilityId = 'empty'

  return {
    reference: 'CL12345TS',
    eligibilityId: eligibilityId,
    approvedEligibilityId: eligibilityId,
    dateSubmitted: moment().format('DD/MM/YYYY'),
    dateApproved: null,
    amount: 45.00,
    claimant: {
      name: 'Tam Swann'
    },
    status: 'PENDING'
  }
}

function saveRandomClaimant(response) {
  client.save(getRandomClaim(), claimsCollection)
    .then(function () {
      response.render('claims-list')
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
}
