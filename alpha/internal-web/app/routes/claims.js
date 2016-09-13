var router = require('../routes')
var client = require('../services/db-client')
var moment = require('moment')

const claimsCollection = 'claims'

router.get('/claims-list', function (request, response, next) {
  response.render('claims-list')
  next()
})

router.get('/claims', function (request, response, next) {
  client.getAll(claimsCollection, function (error, claims) {
    if (!error) {
      var jsonClaims = { data: claims }
      response.json(jsonClaims)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
    }
    next()
  })
})

router.get('/refresh-claims', function (request, response, next) {
  client.dropCollection(claimsCollection, function (error) {
    if (error) {
      response.status(500).render('error', { message: error.message, error: error })
    }
  })

  client.save(getRandomClaim(), claimsCollection, function (error) {
    if (!error) {
      response.render('claims-list')
    } else {
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
  next()
})

var getRandomClaim = function () {
  var eligibilityId = 'empty'

  var claimViewModel = {
    reference: 'CL12345TS',
    eligibilityId: eligibilityId,
    approvedEligibilityId: eligibilityId,
    dateSubmitted: moment().format('DD/MM/YYYY'),
    dateApproved: null,
    amount: 45.00,
    claimant: {
      name: 'Tom Swann'
    },
    status: 'PENDING'
  }

  return claimViewModel
}
