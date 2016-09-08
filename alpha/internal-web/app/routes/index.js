var router = require('../routes')
var client = require('../services/db-client')

router.get('/', function (request, response, next) {
  response.render('index')
  next()
})

router.get('/clean', function (request, response, next) {
  client.drop(function (error) {
    if (!error) {
      response.redirect('/')
      next()
    } else {
      response.redirect('/')
      next()
    }
  })
})
