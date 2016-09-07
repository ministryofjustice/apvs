var router = require('../routes')
var client = require('../services/eligibility-client')
var logger = require('../services/bunyan-logger').logger

router.get('/', function (request, response) {
  logger.info({request: request})
  response.render('index')
  logger.info({response: response})
})

router.get('/clean', function (request, response) {
  logger.info({request: request})

  client.drop(function (error) {
    if (!error) {
      response.redirect('/')
      logger.info({response: response}, 'Successfully dropped all claimant details.')
    } else {
      response.redirect('/')
      logger.error({response: response}, 'Failed to drop all claimant details.')
    }
  })
})
