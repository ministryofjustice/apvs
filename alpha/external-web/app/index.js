/**
 * This file defines all routes for the index page.
 */
var router = require('./routes')

/**
 * Render the landing page.
 */
router.get('/', function (request, response) {
  response.render('index')
})
