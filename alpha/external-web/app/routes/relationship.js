/**
 * This file defines all routes for the relationship page.
 */
var router = require('../routes')

// A client used to make database calls.
var client = require('../eligibility-client')

/**
 * Renders the relationship page for the claimant with the given claimant_id.
 *
 * Example call: http://localhost:3000/relationship/57c3f1139e03be003bfac1aa
 */
router.get('/relationship/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /relationship/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Successfully retrieved claimant with id: ' + id)
      response.render('relationship', { 'claimant': claimant })
    } else {
      console.log('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

/**
 * Save the contents of the relationship form.
 * Redirect the user to either:
 *  - escorts           :: If they have indicated they ARE escorting a visitor.
 *  - about-your-income :: If the have indicated they are NOT escorting someone.
 *
 * Example call: http://localhost:3000/relationship/57c3f1139e03be003bfac1aa
 */
router.post('/relationship/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('POST /relationship/' + id + ' called.')

  client.embeddedUpdate(id, 'relationship', request.body, function (error, claimant) {
    if (!error) {
      console.log('Successfully updated claimant with id: ' + id)

      // Redirect the user based on the response to the escort question.
      if (request.body.escort === 'Yes') {
        response.redirect('/escorts/' + id)
      } else {
        response.redirect('/about-your-income/' + id)
      }
    } else {
      console.log('Failed to update claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
