var router = require('../routes')

router.get('/', function (request, response, next) {
  response.render('index')
  next()
})
