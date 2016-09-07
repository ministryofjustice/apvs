var router = require('../routes')
var client = require('../eligibility-client')
var logger = require('../services/bunyan-logger').logger

router.get('/relationship/:claimant_id', function (request, response) {
  logger.info({request: request})

  var id = request.params.claimant_id
  client.get(id, function (error, claimant) {
    if (!error) {
      response.render('relationship', { 'claimant': claimant })
      logger.info({response: response}, 'Successfully retrieved claimant with id: %s', id)
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error({response: response}, 'Failed to retrieve claimant with id: %s', id)
    }
  })
})

router.post('/relationship/:claimant_id', function (request, response) {
  logger.info({request: request})

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
        logger.info({response: response}, 'Claimant with id: %s has an escort.', id)
      } else {
        response.redirect('/about-your-income/' + id)
        logger.info({response: response}, 'Claimant with id: %s does not have an escort.', id)
      }
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      logger.error('Failed to update claimant with id: %s', id)
    }
  })
})
