var router = require('../routes')
var client = require('../services/db-client')

const claimantsCollection = 'claimants'

router.post('/api/income-check', function (request, response, next) {
  var status = getIncomeStatus()

  client.update(request.body.id, status, claimantsCollection)
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  response.json(status)
  next()
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

  client.update(id, getRelationshipStatus(), claimantsCollection)
    .then(function () {
      response.redirect('/claimant-details/' + id)
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

function getRelationshipStatus () {
  var statusValues = [ 'YES', 'NO' ]
  var status = statusValues[ Math.floor(Math.random() * statusValues.length) ]
  return {
    'status.relationshipVerificationStatus': status
  }
}
