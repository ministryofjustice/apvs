var router = require('../routes')

router.get('/claim-details/:claimant_id', function (request, response, next) {
  response.render('claim-details', { 'id': request.params.claimant_id })
  next()
})

router.post('/claim-details/:claimant_id', function (request, response, next) {
  response.redirect('/declare-your-visit/' + request.params.claimant_id)
  next()
})
