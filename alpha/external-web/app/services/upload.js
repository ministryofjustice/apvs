var multer = require('multer')

const maxFileSize = 5242880 // 5MB in Bytes.
const allowedFileTypes = ['image/png', 'image/jpeg', 'application/pdf']

function fileFilter (req, file, callback) {
  if (!allowedFileTypes.includes(file.mimetype)) {
    var error = 'Uploaded file was not an image.'
    req.fileValidationError = error
    return callback(null, false, new Error(error))
  }
  callback(null, true)
}

module.exports = multer({
  dest: 'eligibility-uploads/',
  limits: {
    fileSize: maxFileSize
  },
  fileFilter: fileFilter
})
