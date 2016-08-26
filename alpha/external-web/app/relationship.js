/**
 * This file defines all routes for the relationship page.
 */
var router = require('./routes');

/**
 * Renders the relationship page.
 */
router.get('/relationship', function (request, response) {
  console.log('GET /relationship called.')
  response.render('relationship')
})

/**
 * Save the contents of the relationship form.
 */
router.post('/relationship', function (request, response) {
  console.log('POST /relationship called.')
  response.redirect('/about-your-income');
})