const router = require('../routes')
const client = require('../services/eligibility-client')
const upload = require('../services/upload')
const compress = require('../services/compress')

const claimantsCollection = 'claimants'

router.get('/about-your-income/:claimant_id', function (request, response, next) {
  client.get(request.params.claimant_id, claimantsCollection)
    .then(function (claimant) {
      response.render('about-your-income', { 'claimant': claimant })
    })
    .catch(function (error) {
      response.status(500).render('error', { error: error })
    })
  next()
})

router.post('/about-your-income/:claimant_id', upload.single('evidence'), function (request, response, next) {
  var id = request.params.claimant_id
  var file = request.file
  if (!file) {
    response.status(500).render('error', { error: 'Failed to update claimant with id: ' + id + '. No file was uploaded.' })
    next()
  } else {
    compress(file)

    var incomeDetails = {
      'eligibility-file': {
        eligibilityId: request.file.filename,
        originalFilename: request.file.originalname,
        path: request.file.path
      },
      'benefits': request.body
    }

    client.update(id, incomeDetails, claimantsCollection)
      .then(function () {
        response.redirect('/travel-profile/' + id)
      })
      .catch(function (error) {
        response.status(500).render('error', { error: error })
      })
    next()
  }
})
