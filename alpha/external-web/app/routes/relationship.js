/**
 * This file defines all routes for the relationship page.
 */
var router = require('../routes')

// TODO: Should be included in a controller file rather than by each routes file.
var mongo = require('../database')

/**
 * Renders the relationship page for the claimant with the given claimant_id.
 *
 * Example call: http://localhost:3000/relationship/57c3f1139e03be003bfac1aa
 */
router.get('/relationship/:claimant_id', function (request, response) {
  var id = new mongo.client.ObjectID(request.params.claimant_id)
  console.log('GET /relationship/' + id + ' called.')

  mongo.db.collection('claimants').findOne({ _id: id }, function (error, claimant) {
    if (!error) {
      response.render('relationship', { 'claimant': claimant })
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
  // Get the claimants ID from the URL params.
  var id = new mongo.client.ObjectID(request.params.claimant_id)
  console.log('POST /relationship/' + id + ' called.')

  // Update the claimants details.
  mongo.db.collection('claimants').updateOne({ _id: id }, { $set: request.body }, function (error, result) {
    console.log(result)
    if (!error) {
      // Redirect the user based on the response to the escort question.
      if (request.body.escort === 'Yes') {
        response.redirect('/escorts/' + id)
      } else {
        response.redirect('/about-your-income/' + id)
      }
    }
  })
})
