var router = require('../routes')
var client = require('../services/eligibility-client')

const maxFileSize = 5242880 // 5MB in Bytes.
const allowedFileTypes = ['image/png', 'image/jpeg', 'application/pdf']

function fileFilter (req, file, callback) {
  var mimeType = file.mimetype

  if (!allowedFileTypes.includes(mimeType)) {
    var error = 'Uploaded file was not an image.'
    req.fileValidationError = error
    return callback(null, false, new Error(error))
  }
  callback(null, true)
}

// Require file upload library.
var multer = require('multer')({
  dest: 'eligibility-uploads/',
  limits: {
    fileSize: maxFileSize
  },
  fileFilter: fileFilter
})

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

router.post('/about-your-income/:claimant_id', multer.single('evidence'), function (request, response, next) {
  var id = request.params.claimant_id
  if (!request.file) {
    response.status(500).render('error', { error: 'Failed to update claimant with id: ' + id + '. No file was uploaded.' })
    next()
  } else {
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
