var router = require('../routes')
var client = require('../eligibility-client')

router.get('/', function (request, response) {
  response.render('index')
})

router.get('/clean', function (request, response) {
  console.log('GET /clean called.')

  client.drop(function (error) {
    if (!error) {
      console.log('Cleared all.')
      response.redirect('/')
    } else {
      console.log('Failed to clean.')
      response.redirect('/')
    }
  })
})
