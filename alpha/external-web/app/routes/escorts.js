var router = require('../routes')
var client = require('../services/eligibility-client')

router.get('/escorts/:claimant_id', function (request, response, next) {
  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.render('escorts', { 'claimant': claimant })
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})

router.post('/escorts/:claimant_id', function (request, response, next) {
  var escorts = {
    'escorts': request.body
  }

  var id = request.params.claimant_id
  client.update(id, escorts, function (error, claimant) {
    if (!error) {
      response.redirect('/about-your-income/' + id)
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})
