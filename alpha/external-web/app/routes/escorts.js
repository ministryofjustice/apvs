var router = require('../routes')
var client = require('../eligibility-client')
var logger = require('../services/bunyan-logger').logger

router.get('/escorts/:claimant_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      logger.info('Successfully retrieved claimant with id: ' + id)
      response.render('escorts', { 'claimant': claimant })
    } else {
      logger.error('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
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
      logger.info('Successfully updated claimant with id: ' + id)
      response.redirect('/about-your-income/' + id)
    } else {
      logger.error('Failed to update claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
