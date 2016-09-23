const scissors = require('scissors')
const fs = require('fs')
const logger = require('./bunyan-logger')

const FILE_DESTINATION = 'eligibility-uploads/out'

exports.compress = function (file) {
  scissors(file.path)
    .compress()
    .pdfStream()
    .pipe(fs.createWriteStream(FILE_DESTINATION))

  logger.info('PDF compression complete.')
}
