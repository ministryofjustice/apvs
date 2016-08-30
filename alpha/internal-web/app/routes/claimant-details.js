/**
 * This file defines all routes for the claimant-details page.
 */
var router = require('../routes')

// A client used to make database calls.
var client = require('../eligibility-client')

/**
 * Retrieve all claimants in the system.
 */
router.get('/claimant-details/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claimant-details/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Successfully retrieved details for claimant with id: ' + id)
      response.render('claimant-details', { 'claimant': claimant })
    } else {
      console.log('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
