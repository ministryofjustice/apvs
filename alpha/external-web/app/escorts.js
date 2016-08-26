/**
 * This file defines all routes for the escorts page.
 */
var router = require('./routes');

/**
 * Renders the escorts page.
 */
router.get('/escorts', function (request, response) {
  console.log('GET /escorts called.')
  response.render('escorts')
})

/**
 * Save the contents of the relationship form.
 */
router.post('/escorts', function (request, response) {
  console.log('POST /escorts called.')
  response.redirect('/about-your-income');
})