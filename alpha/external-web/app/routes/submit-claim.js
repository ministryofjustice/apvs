var router = require('../routes')
var externalApiRest = require('../services/external-api-rest')
var reference = require('../services/reference-checker')

const claimantsCollection = 'claimants'

router.get('/submit-claim/:claimant_id', function (request, response, next) {
  var id = request.params.claimant_id
  reference.isValid(id, claimantsCollection)
    .then(function () {
      response.render('submit-claim', { 'id': id })
    })
    .catch(function (error) {
      response.status(500).render('error', { message: error.message, error: error })
    })
  next()
})

router.post('/submit-claim/:claimant_id', function (request, response, next) {
  var amount = request.query.amount ? parseInt(request.query.amount) : 99
  externalApiRest.checkForAutomaticProcessing({ amount: amount })
    .then(function (result) {
      if (result['processing-type'] === 'automatic') {
        response.redirect('/claim-automatic')
      } else {
        response.redirect('/claim-manual')
      }
    })
    .catch(function (error) {
      response.status(500).render('error', {message: error.message, error: error})
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
