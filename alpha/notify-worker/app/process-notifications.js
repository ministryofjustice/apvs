
var logger = require('./bunyan-logger')
var client = require('db-client')
var _ = require('lodash')

exports.run = function () {
  client.getPendingNotifications()
    .then(function (notifications) {
      logger.info(notifications)
      _(notifications).forEach(value => processNotification(value))
    })
    .catch(function (error) {
      logger.error(error)
    })
}

function processNotification (notification) {
  return function (notification) {
    logger.info(notification)
  }
}
