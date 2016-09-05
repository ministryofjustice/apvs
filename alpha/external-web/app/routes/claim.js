/**
 * This file defines all routes for the claim page.
 */
var router = require('../routes')

/**
 * Renders the claim page.
 *
 * Example call: http://localhost:3000/claim
 */
router.get('/claim', function (request, response) {
  console.log('GET /claim')
  response.render('claim')
})

/**
 * Ensure the claim form has been completed and redirect the user based on their response.
 *
 * Redirect the user to either:
 *  - about-you     :: If their eligibility information has changed.
 *  - claim-details :: If their eligibility information has not changed.
 *
 * Example call: http://localhost:3000/claim
 */
router.post('/claim', function (request, response) {
  console.log('POST /claim/ called.')

  var reference = request.body.reference
  var detailsChanged = request.body.detailsChanged

  // If the form was not completed display an error message.
  if (!reference || !detailsChanged) {
    console.log('Request Failed! Please fully complete the form.')
    response.status(500).render('error', { error: 'Request Failed! Please fully complete the form.' })
  } else {
    // Redirect the user based on the response to the details changed question.
    if (detailsChanged === 'Yes') {
      response.redirect('/about-you/' + reference)
    } else {
      response.redirect('/claim-details/' + reference)
    }
  }
})
