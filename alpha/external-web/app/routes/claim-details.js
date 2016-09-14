var router = require('../routes')
var externalApiRest = require('../services/external-api-rest')

router.get('/claim-details/:claimant_id', function (request, response, next) {
  response.render('claim-details', { 'id': request.params.claimant_id })
  next()
})

router.post('/claim-details/:claimant_id', function (request, response, next) {
  var amount = request.query.amount ? parseInt(request.query.amount) : 99
  externalApiRest.checkForAutomaticProcessing({ amount: amount })
    .then(function (result) {
      if (result[ 'processing-type' ] === 'automatic') {
        response.redirect('/claim-automatic')
      } else {
        response.redirect('/claim-manual')
      }
    })
    .catch(function (error) {
      response.status(500).render('error', { message: error.message, error: error })
    })
  next()
})

router.get('/claim-automatic', function (request, response, next) {
  response.render('claim-automatic')
  next()
})

router.get('/claim-manual', function (request, response, next) {
  response.render('claim-manual')
  next()
})
