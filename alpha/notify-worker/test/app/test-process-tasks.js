/* global describe it */
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var client = require('../../app/db-client')
var logger = require('../../app/bunyan-logger')
var mailer = require('../../app/mailer')
require('sinon-bluebird')

describe('process-tasks', function () {
  var processTasks, processNotification

  var dummyPendingTask = {
    name: 'application-notification',
    status: 'PENDING',
    action: {
      method: 'email',
      email: 'test@test.com',
      reference: 'APVS12345'
    }
  }

  describe('run', function () {
    it('should run notification task twice', function () {
      processNotification = {
        process: function (notification) {
          console.log(notification)
        }
      }

      processTasks = proxyquire('../../app/process-tasks', {
        './db-client': client,
        './tasks/notification': processNotification,
        './bunyan-logger': logger
      })

      sinon.stub(client, 'getPendingNotifications').resolves([dummyPendingTask, dummyPendingTask])
      sinon.stub(client, 'setTaskComplete')
      sinon.stub(mailer, 'sendMail')

      processTasks.run()
    })
  })
})
