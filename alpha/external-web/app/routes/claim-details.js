/**
 * This file defines all routes for the claim-details page.
 */
var router = require('../routes')

/**
 * Renders the claim-details page.
 *
 * Example call: http://localhost:3000/claim-details/57c3f1139e03be003bfac1aa
 */
router.get('/claim-details/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claim-details/' + id + ' called.')
  response.render('claim-details')
})

/**
 * TODO
 */
router.post('/claim-details/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('POST /claim-details/' + id + ' called.')
})
