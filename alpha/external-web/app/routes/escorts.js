var router = require('../routes')
var client = require('../eligibility-client')

router.get('/escorts/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('GET /escorts/' + id + ' called.')

  client.get(id, function (error, claimant) {
    if (!error) {
      console.log('Successfully retrieved claimant with id: ' + id)
      response.render('escorts', { 'claimant': claimant })
    } else {
      console.log('Failed to retrieve claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})

router.post('/escorts/:claimant_id', function (request, response) {
  var id = request.params.claimant_id
  console.log('POST /escorts/' + id + ' called.')

  var escorts = {
    'escorts': request.body
  }

  client.update(id, escorts, function (error, claimant) {
    if (!error) {
      console.log('Successfully updated claimant with id: ' + id)
      response.redirect('/about-your-income/' + id)
    } else {
      console.log('Failed to update claimant with id: ' + id)
      response.status(500).render('error', { message: error.message, error: error })
    }
  })
})
