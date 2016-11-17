var logger = require('./bunyan-logger')
var client = require('./db-client')
var Promise = require('bluebird')
var adi = require('./tasks/adi')
var notificationTaskHandler = require('./tasks/notification')

const notificationTaskName = 'application-notification'

exports.runNotificationTasks = function () {
  return client.getPendingTasks(notificationTaskName)
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

exports.runDocGenerationTasks = function () {
  adi.process()
}
