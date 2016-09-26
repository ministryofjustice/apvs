const imagemin = require('imagemin')
const jpegPlugin = require('imagemin-mozjpeg')
const pngPlugin = require('imagemin-pngquant')
const logger = require('./bunyan-logger')

const JPEG_QUALITY = 30
const PNG_QUALITY_RANGE = '0-20'
const FILE_DESTINATION = 'eligibility-uploads/'
const CONFIGURATION = {
  plugins: [
    jpegPlugin({ quality: JPEG_QUALITY }),
    pngPlugin({ quality: PNG_QUALITY_RANGE })
  ]
}

var compress = function (file) {
  imagemin([ file.path ], FILE_DESTINATION, CONFIGURATION)
    .then(function () {
      logger.info('Image optimization complete.')
    })
    .catch(function (error) {
      logger.error('Failed to compress image.', error)
    })
}

module.exports = compress