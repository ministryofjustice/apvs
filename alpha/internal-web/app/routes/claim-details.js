var router = require('../routes')
var client = require('../services/db-client')

var claimsCollection = 'claims'

router.get('/claim-details/:claim_id', function (request, response) {
  var id = request.params.claim_id
  client.get(id, claimsCollection, function (error, claim) {
    if (!error) {
      response.render('claim-details', { 'claim': claim })
    } else {
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
