
var python = require('python-shell')
var logger = require('../bunyan-logger')
var options = require('../config').shell

exports.process = function () {
  options.args = ['16/11/2016']
  python.run('adi.py', options, function (error, results) {
    if (error) {
      logger.error(error)
    }

    logger.info('results: %j', results)
  })
}
