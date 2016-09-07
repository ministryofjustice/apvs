var router = require('../routes')
var client = require('../eligibility-client')
var logger = require('../services/bunyan-logger').logger

router.get('/', function (request, response) {
  logger.info({request: request})
  response.render('index')
})

router.get('/clean', function (request, response) {
  logger.info({request: request})

  client.drop(function (error) {
    if (!error) {
      logger.info('Cleared all.')
      response.redirect('/')
    } else {
      logger.warn('Failed to clean.')
      response.redirect('/')
    }
  })
})
