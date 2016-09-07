var router = require('../routes')

router.get('/application-submitted', function (request, response, next) {
  response.render('application-submitted')
  next()
})
