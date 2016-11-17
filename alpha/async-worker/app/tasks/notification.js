var logger = require('../bunyan-logger')
var client = require('../db-client')
var mailer = require('../mailer')

const EMAIL_CONTACT_METHOD = 'email'

exports.process = function (notificationTask) {
  logger.info(notificationTask)

  var action = notificationTask.action

  if (action.method === EMAIL_CONTACT_METHOD) {
    logger.info('Sending email to recipient: ' + action.email)
    mailer.sendMail(action.reference, action.email)
    client.setTaskComplete(notificationTask._id)
  } else {
    logger.info('No action for contact preferene ' + action.method)
  }
}
