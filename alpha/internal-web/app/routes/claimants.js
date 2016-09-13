var router = require('../routes')
var client = require('../services/db-client')

const claimantsCollection = 'claimants'

// Append 'data' to the JSON object as this is required by the DataTable library.
router.get('/claimants', function (request, response, next) {
  client.getAll(claimantsCollection)
    .then(function (claimants) {
      var jsonClaimants = { data: claimants }
      response.json(jsonClaimants)
    })
    .catch(function (error) {
      response.status(500).render('error', { message: error.message, error: error })
    })
  next()
})

router.get('/claimants/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id, claimantsCollection)
    .then(function (claimant) {
      response.json(claimant)
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})
