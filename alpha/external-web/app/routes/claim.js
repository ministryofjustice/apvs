/**
 * This file defines all routes for the claim page.
 */
var router = require('../routes')
var client = require('../eligibility-client')

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
    updateEligibilityFlag(id, eligibility)

    // Redirect the user based on the response to the details changed question.
    if (isEligibilityModified(eligibility)) {
      response.redirect('/about-you/' + id)
    } else {
      response.redirect('/claim-details/' + id)
    }
  }
})

/**
 * Determine if the given eligibility value equates to true or false.
 * @param eligibility {String} A String that is expected to be either 'Yes' or 'No'
 * @returns {boolean} True if eligibility is equal to 'Yes', false otherwise.
 */
function isEligibilityModified (eligibility) {
  return eligibility === 'Yes'
}

/**
 * Builds the object to persist to the database that holds the flag indicating if the claimants eligibility is new or
 * old.
 * @param eligibility {String} A String that is expected to be either 'Yes' or 'No'
 * @returns {{isEligibilityModified: boolean}} An object who's value indicates if the claimants eligibility is new or
 *          old.
 */
function buildEligibilityFlag (eligibility) {
  return {
    'isEligibilityModified': isEligibilityModified(eligibility)
  }
}

/**
 * Adds or updates the isEligibilityModified flag of the claimant with the given id.
 * @param id The id of the claimant that this flag is associated with.
 * @param eligibility {String} A String that is expected to be either 'Yes' or 'No'
 */
function updateEligibilityFlag (id, eligibility) {
  client.update(id, buildEligibilityFlag(eligibility), function (error, claimant) {
    if (!error) {
      console.log('Successfully modified the isEligibilityModified flag for claimant with id: ' + id)
    } else {
      console.log('Failed to modify the isEligibilityModified flag for claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
}
