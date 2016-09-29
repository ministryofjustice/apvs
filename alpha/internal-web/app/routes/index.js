var router = require('../routes')
var client = require('../services/database/db-client')

router.get('/', function (request, response, next) {
  response.render('index')
  next()
})

router.get('/clean', function (request, response, next) {
  client.drop()
    .finally(function () {
      response.redirect('/')
    })
  next()
})
