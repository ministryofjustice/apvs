/**
 * This file defines all routes for the relationship page.
 */
var router = require('../routes')

/**
 * Renders the relationship page.
 */
router.get('/relationship', function (request, response) {
  console.log('GET /relationship called.')
  response.render('relationship')
})

/**
 * Save the contents of the relationship form.
 * Redirect the user to either:
 *  - escorts           :: If they have indicated they ARE escorting a visitor.
 *  - about-your-income :: If the have indicated they are NOT escorting someone.
 */
router.post('/relationship', function (request, response) {
  // Redirect the user based on the response to the escort question.
  if (request.body.escort === 'Yes') {
    response.redirect('/escorts')
  } else {
    response.redirect('/about-your-income')
  }
})
