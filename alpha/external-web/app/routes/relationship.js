var router = require('../routes')
var client = require('../services/eligibility-client')
var logger = require('../services/bunyan-logger')

router.get('/relationship/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id)
    .then(function (claimant) {
      response.render('relationship', { 'claimant': claimant })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

router.post('/relationship/:claimant_id', function (request, response, next) {
  var relationship = {
    'relationship': request.body
  }

  var id = request.params.claimant_id
  client.update(id, relationship, function (error, claimant) {
    if (!error) {
      logger.info('Successfully updated claimant with id: %s', id)

      // Redirect the user based on the response to the escort question.
      if (request.body.escort === 'Yes') {
        response.redirect('/escorts/' + id)
        next()
      } else {
        response.redirect('/about-your-income/' + id)
        next()
      }
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})
