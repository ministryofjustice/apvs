var router = require('../routes')
var client = require('../services/eligibility-client')

const claimantsCollection = 'claimants'

router.get('/relationship/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id, claimantsCollection)
    .then(function (claimant) {
      response.render('relationship', { 'claimant': claimant })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

router.post('/relationship/:claimant_id', function (request, response, next) {
  var relationship = {
    'relationship': request.body
  }

  var id = request.params.claimant_id
  client.update(id, relationship, claimantsCollection)
    .then(function () {
      escortRedirect(id, request, response)
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

// Redirect the user based on the response to the escort question.
function escortRedirect (id, request, response) {
  if (request.body.escort === 'Yes') {
    response.redirect('/escorts/' + id)
  } else {
    response.redirect('/about-your-income/' + id)
  }
}
