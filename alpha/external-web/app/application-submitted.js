/**
 * This file defines all routes for the application-submitted page.
 */
var router = require('./routes')

/**
 * Render the application submitted page. Displayed after a successful file upload.
 */
router.get('/application-submitted', function (request, response) {
  response.render('application-submitted')
})
