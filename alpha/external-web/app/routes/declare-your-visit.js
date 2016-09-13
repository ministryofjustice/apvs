var router = require('../routes')

router.get('/declare-your-visit', function (request, response, next) {
  response.render('declare-your-visit')
  next()
})
