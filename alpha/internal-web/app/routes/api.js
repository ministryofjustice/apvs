/**
 * This file defines all routes for external API dependencies
 */
var router = require('../routes')

// A client used to make database calls.
var client = require('../eligibility-client')

router.post('/api/income-check', function (request, response) {
  var id = request.body.id
  console.log(id)

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

  var status = statusValues[Math.floor(Math.random() * statusValues.length)]

  return { incomeVerificationStatus: status }
}
