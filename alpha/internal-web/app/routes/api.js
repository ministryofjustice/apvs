var router = require('../routes')
var client = require('../services/eligibility-client')
var logger = require('../services/bunyan-logger').logger

router.post('/api/income-check', function (request, response) {
  logger.info({request: request})

  var id = request.body.id
  var status = getIncomeStatus()

  client.update(id, status, function (error, claimant) {
    if (error) {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to change claimants income verification status to %s. ID: %s', status['status.relationshipVerificationStatus'], id)
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
  logger.info({request: request})

  var id = request.params.claimant_id
  var status = getRelationshipStatus()

  client.update(id, status, function (error, claimant) {
    if (!error) {
      response.redirect('/claimant-details/' + id)
      logger.info({response: response}, 'Successfully changed claimants relationship verification status to %s. ID: %s', status['status.relationshipVerificationStatus'], id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to change claimants relationship verification status to %s. ID: %s', status['status.relationshipVerificationStatus'], id)
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
