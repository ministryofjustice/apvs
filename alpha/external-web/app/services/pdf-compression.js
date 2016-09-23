const scissors = require('scissors');
const fs = require('fs');
const logger = require('./bunyan-logger')

const FILE_DESTINATION = 'eligibility-uploads/'

exports.compress = function (file) {

  scissors(file.path)
    .compress()
    .pdfStream()
    .pipe(fs.createWriteStream('eligibility-uploads/out'));

  // TODO: Add error handling.
  // TODO: The output file should replace the original file + have the same name.

  logger.info('PDF compression complete.')

}
