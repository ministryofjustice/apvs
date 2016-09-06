var router = require('../routes')
var client = require('../eligibility-client')

router.post('/api/income-check', function (request, response) {
  var id = request.body.id
  console.log('POST /api/income-check called.')

  var status = getIncomeStatus()

  client.update(id, status, function (error, claimant) {
    if (error) {
      console.log('Failed to change claimants income verification status to ' + status['status.relationshipVerificationStatus'] + '. ID: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
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

router.post('/api/relationship-check/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /api/relationship-check called.')

  var status = getRelationshipStatus()

  client.update(id, status, function (error, claimant) {
    if (!error) {
      console.log('Successfully changed claimants relationship verification status to ' + status['status.relationshipVerificationStatus'] + '. ID: ' + id)
      response.redirect('/claimant-details/' + id)
    } else {
      console.log('Failed to change claimants relationship verification status to ' + status['status.relationshipVerificationStatus'] + '. ID: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
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
