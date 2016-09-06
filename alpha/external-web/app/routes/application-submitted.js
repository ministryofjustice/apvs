var router = require('../routes')

router.get('/application-submitted', function (request, response) {
  response.render('application-submitted')
})
