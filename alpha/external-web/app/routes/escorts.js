var router = require('../routes')
var client = require('../services/eligibility-client')
var logger = require('../services/bunyan-logger').logger

router.get('/escorts/:claimant_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.render('escorts', { 'claimant': claimant })
      logger.info({response: response}, 'Successfully retrieved claimant with id: %s', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to retrieve claimant with id: %s', id)
    }
  })
})

router.post('/escorts/:claimant_id', function (request, response) {
  logger.info({request: request})

  var escorts = {
    'escorts': request.body
  }

  var id = request.params.claimant_id
  client.update(id, escorts, function (error, claimant) {
    if (!error) {
      response.redirect('/about-your-income/' + id)
      logger.info({response: response}, 'Successfully updated claimant with id: %s', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to update claimant with id: %s', id)
    }
  })
})
