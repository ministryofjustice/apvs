const logger = require('./bunyan-logger')
const image = require('../services/image-compression')
const pdf = require('../services/pdf-compression')

const allowedImageFileTypes = [ 'image/png', 'image/jpeg' ]

var compress = function (file) {
  if (isPDF(file)) {
    logger.info('Running PDF compression.')
    pdf.compress(file)
  } else if (isImage(file)) {
    logger.info('Running image compression.')
    image.compress(file)
  } else {
    logger.warn('File compression did not run as file was not of expected type.')
  }
}

function isPDF (file) {
  return file.mimetype === 'application/pdf'
}

function isImage (file) {
  return allowedImageFileTypes.includes(file.mimetype)
}

module.exports = compress
