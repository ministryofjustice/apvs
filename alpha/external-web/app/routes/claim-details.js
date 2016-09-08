var router = require('../routes')

router.get('/claim-details/:claimant_id', function (request, response, next) {
  response.render('claim-details')
  next()
})

// TODO
router.post('/claim-details/:claimant_id', function (request, response, next) {
  next()
})
