/**
 * This file defines all routes for the index page.
 */
var router = require('../routes')
var client = require('../eligibility-client')
var log4js = require('../log4js')
var LOGGER = log4js.getLogger('index')

/**
 * Render the landing page with the claimants currently stored in the database.
 */
router.get('/', function (request, response) {
  response.render('index')
})

router.get('/clean', function (request, response) {
  LOGGER.debug('GET /clean called.')

  client.drop(function (error) {
    if (!error) {
      LOGGER.info('Cleared all.')
      response.redirect('/')
    } else {
      LOGGER.error('Failed to clean.')
      response.redirect('/')
    }
  })
})
