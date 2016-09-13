var router = require('../routes')
var client = require('../services/db-client')

const claimantsCollection = 'claimants'

router.post('/api/income-check', function (request, response, next) {
  var id = request.body.id
  var status = getIncomeStatus()

  client.update(id, status, claimantsCollection, function (error, claimant) {
    if (error) {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
    response.json(status)
  })
})

function getIncomeStatus () {
  var statusValues = [ 'YES', 'NO', 'DECEASED' ]
  var status = statusValues[ Math.floor(Math.random() * statusValues.length) ]
  return {
    'status.incomeVerificationStatus': status
  }
}

router.post('/api/relationship-check/:claimant_id', function (request, response, next) {
  var id = request.params.claimant_id
  var status = getRelationshipStatus()

  client.update(id, status, claimantsCollection, function (error, claimant) {
    if (!error) {
      response.redirect('/claimant-details/' + id)
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})

function getRelationshipStatus () {
  var statusValues = [ 'YES', 'NO' ]
  var status = statusValues[ Math.floor(Math.random() * statusValues.length) ]
  return {
    'status.relationshipVerificationStatus': status
  }
}
