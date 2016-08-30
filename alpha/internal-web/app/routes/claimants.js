/**
 * This file defines generic routes for returning claimant JSON objects.
 */
var router = require('../routes')

// A client used to make database calls.
var client = require('../eligibility-client')

/**
 * Retrieve all claimants in the system.
 */
router.get('/claimants', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claimants/' + id + ' called.')

  client.getAll(function (error, claimants) {
    if (!error) {
      console.log('Returning all claimants.')

      // Append 'data' to the JSON object. Required by the DataTable library.
      var jsonClaimants = { data: claimants }
      response.json(jsonClaimants)
    } else {
      console.log('Failed to retrieve claimants.')
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

/**
 * Retrieve a single claimant by their claimant ID.
 */
router.get('/claimants/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claimants/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Returning claimant:')
      console.log(claimant)
      response.json(claimant)
    } else {
      console.log('Failed to retrieve claimants')
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
