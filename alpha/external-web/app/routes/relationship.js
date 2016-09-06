var router = require('../routes')
var client = require('../eligibility-client')

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

router.post('/relationship/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('POST /relationship/' + id + ' called.')

  var relationship = {
    'relationship': request.body
  }

  client.update(id, relationship, function (error, claimant) {
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
