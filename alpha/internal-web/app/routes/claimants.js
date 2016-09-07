var router = require('../routes')
var client = require('../services/eligibility-client')

// Append 'data' to the JSON object as this is required by the DataTable library.
router.get('/claimants', function (request, response, next) {
  client.getAll(function (error, claimants) {
    if (!error) {
      var jsonClaimants = { data: claimants }
      response.json(jsonClaimants)
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})

router.get('/claimants/:claimant_id', function (request, response, next) {
  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.json(claimant)
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})
