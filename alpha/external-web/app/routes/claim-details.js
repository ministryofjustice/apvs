var router = require('../routes')

router.get('/claim-details/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /claim-details/' + id + ' called.')
  response.render('claim-details')
})

// TODO
router.post('/claim-details/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('POST /claim-details/' + id + ' called.')
})
