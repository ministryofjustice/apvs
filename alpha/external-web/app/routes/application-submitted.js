var router = require('../routes')

router.get('/application-submitted/:reference', function (request, response, next) {
  response.render('application-submitted', { reference: request.params.reference })
  next()
})
