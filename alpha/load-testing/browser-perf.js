var browserPerf = require('browser-perf')
var config = require('./config')
var logger = require('./bunyan-logger')

var options = {
  selenium: 'ondemand.saucelabs.com',
  browsers: ['chrome', 'firefox'],
  username: config.SAUCE_USERNAME
}

module.exports = function () {
  browserPerf(config.SAUCE_BASEURL, function (error, results) {
    logger.info(results)
  }, options)
}
