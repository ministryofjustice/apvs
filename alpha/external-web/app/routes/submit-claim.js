var router = require('../routes')
var client = require('../services/eligibility-client')
var externalApiRest = require('../services/external-api-rest')

router.get('/submit-claim/:claimant_id', function (request, response, next) {
  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.render('submit-claim', { 'id': id })
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})

router.post('/submit-claim/:claimant_id', function (request, response, next) {
  var amount = request.query.amount ? parseInt(request.query.amount) : 99
  externalApiRest.checkForAutomaticProcessing({amount: amount}, function (error, result) {
    if (!error) {
      if (result['processing-type'] === 'automatic') {
        response.redirect('/claim-automatic')
      } else {
        response.redirect('/claim-manual')
      }
    } else {
      response.status(500).render('error', {message: error.message, error: error})
    }
    next()
  })
})

router.get('/claim-automatic', function (request, response, next) {
  response.render('claim-automatic')
  next()
})

router.get('/claim-manual', function (request, response, next) {
  response.render('claim-manual')
  next()
})
