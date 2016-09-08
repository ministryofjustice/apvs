var router = require('../routes')
var client = require('../services/db-client')

var claimCollection = 'claims'

router.get('/claims', function (request, response, next) {
  client.getAll(claimCollection, function (error, claims) {
    if (!error) {
      var jsonClaims = { data: claims }
      response.json(jsonClaims)
      next()
    } else {
      response.status(500).render('error', { message: error.message, error: error })
      next()
    }
  })
})
