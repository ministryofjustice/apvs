var router = require('../routes')
var client = require('../services/eligibility-client')
var validator = require('../services/validators/escorts-validator.js')

const claimantsCollection = 'claimants'

router.get('/escorts/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id, claimantsCollection)
    .then(function (claimant) {
      response.render('escorts', { 'claimant': claimant })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

router.post('/escorts/:claimant_id', function (request, response, next) {
  var id = request.params.claimant_id
  var validationErrors = validator(request.body)

  if (validationErrors) {
    var claimant = {
      '_id': id,
      'escorts': request.body
    }
    response.status(400).render('escorts', { errors: validationErrors, 'claimant': claimant })
    next()
    return
  }

  var escorts = {
    'escorts': request.body
  }
  client.update(id, escorts, claimantsCollection)
    .then(function () {
      response.redirect('/about-your-income/' + id)
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})
