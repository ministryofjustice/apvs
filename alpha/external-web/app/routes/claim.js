/**
 * This file defines all routes for the claim page.
 */
var router = require('../routes')
var eligibilityFlag = require('../services/eligibility-flag')

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

  var id = request.body.reference
  var eligibility = request.body.isEligibilityModified

  // If the form was not completed display an error message.
  if (!id || !eligibility) {
    console.log('Request Failed! Please fully complete the form.')
    response.status(500).render('error', { error: 'Request Failed! Please fully complete the form.' })
  } else {
    eligibilityFlag.update(id, eligibility)

    // Redirect the user based on the response to the details changed question.
    if (eligibilityFlag.isModified(eligibility)) {
      response.redirect('/about-you/' + id)
    } else {
      response.redirect('/claim-details/' + id)
    }
  }
})
