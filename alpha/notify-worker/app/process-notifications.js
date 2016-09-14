var logger = require('./bunyan-logger')
var client = require('./db-client')
var mailer = require('./mailer')
var Promise = require('bluebird')

const EMAIL_CONTACT_METHOD = 'email'

exports.run = function () {
  client.getPendingNotifications()
    .then(function (notifications) {
      if (notifications) {
        Promise.all(notifications.map(function (notification) {
          processNotification(notification)
        }))
      }
    })
    .catch(function (error) {
      logger.error(error)
    })
}

var processNotification = function (notification) {
  logger.info(notification)

  var action = notification.action

  if (action.method === EMAIL_CONTACT_METHOD) {
    logger.info('Sending email to recipient: ' + action.email)
    mailer.sendMail(action.reference, action.email)
    client.setTaskComplete(notification._id)
  } else {
    logger.info('No action for contact preferene ' + action.method)
  }
}
