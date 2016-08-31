/**
 * This file defines all routes for the index page.
 */
var router = require('../routes')

var client = require('../eligibility-client')

/**
 * Render the landing page with the claimants currently stored in the database.
 */
router.get('/', function (request, response) {
  response.render('index')
})

router.get('/clean', function (request, response) {
  console.log('GET /clean called.')

  client.drop(function (error) {
    if (!error) {
      console.log('Cleared all.')
      response.redirect('/')
    } else {
      console.log('Failed to clean.')
      response.redirect('/')
    }
  })
})
