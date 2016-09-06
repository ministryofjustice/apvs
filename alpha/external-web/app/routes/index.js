var router = require('../routes')

router.get('/', function (request, response) {
  response.render('index')
})
