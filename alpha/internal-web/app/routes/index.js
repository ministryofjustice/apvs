/**
 * This file defines all routes for the index page.
 */
var router = require('../routes')

/**
 * Render the landing page with the claimants currently stored in the database.
 */
router.get('/', function (request, response) {
  response.render('index')
})
