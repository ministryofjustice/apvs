var logger = require('./bunyan-logger')
var client = require('./db-client')
var Promise = require('bluebird')
var notificationTaskHandler = require('./tasks/notification')

exports.run = function () {
  client.getPendingNotifications()
    .then(function (notifications) {
      if (notifications) {
        Promise.all(notifications.map(function (notification) {
          notificationTaskHandler.process(notification)
        }))
      }
    })
    .catch(function (error) {
      logger.error(error)
    })
}
