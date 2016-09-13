var router = require('../routes')
var client = require('../services/eligibility-client')

router.get('/escorts/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id)
    .then(function (claimant) {
      response.render('escorts', { 'claimant': claimant })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

router.post('/escorts/:claimant_id', function (request, response, next) {
  var escorts = {
    'escorts': request.body
  }

  var id = request.params.claimant_id
  client.update(id, escorts)
    .then(function () {
      response.redirect('/about-your-income/' + id)
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})
