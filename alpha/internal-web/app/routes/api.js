/**
 * This file defines all routes for external API dependencies
 */
var router = require('../routes')

// A client used to make database calls.
var client = require('../eligibility-client')

/**
 * Retrieve and update the verification status for the claimant with the given ID.
 */
router.post('/api/income-check', function (request, response) {
  var id = request.body.id
  console.log('GET /api/income-check called.')

  var status = getIncomeStatus()

  client.update(id, status, function (error, claimant) {
    if (error) {
      console.log('Failed to change claimants income verification status to ' + status.incomeVerificationStatus + '. ID: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }

    response.json(status)
  })
})

/** Simulate external API by returning a random Income status
 */
function getIncomeStatus () {
  var statusValues = [ 'YES', 'NO', 'DECEASED' ]
  var status = statusValues[ Math.floor(Math.random() * statusValues.length) ]
  return {
    'status.incomeVerificationStatus': status
  }
}

/**
 * Retrieve and update the relationship status for the claimant with the given ID.
 */
router.post('/api/relationship-check/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /api/relationship-check called.')

  var status = getRelationshipStatus()

  client.update(id, status, function (error, claimant) {
    if (!error) {
      console.log('Successfully changed claimants relationship verification status to ' + status.relationshipVerificationStatus + '. ID: ' + id)
      response.redirect('/claimant-details/' + id)
    } else {
      console.log('Failed to change claimants relationship verification status to ' + status.relationshipVerificationStatus + '. ID: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

/**
 * Simulate external API by returning a random Relationship status from NOMIS.
 */
function getRelationshipStatus () {
  var statusValues = [ 'YES', 'NO' ]
  var status = statusValues[ Math.floor(Math.random() * statusValues.length) ]
  return {
    'status.relationshipVerificationStatus': status
  }
}
