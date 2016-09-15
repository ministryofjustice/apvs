/* global describe it beforeEach */
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var client = require('../../app/db-client')
var logger = require('../../app/bunyan-logger')
var mailer = require('../../app/mailer')
var sinonBluebird = require('sinon-bluebird')
var taskNotification = require('../../app/tasks/notification')

describe('process-tasks', function () {
  var processTasks, dummyPendingTask, processNotification

  beforeEach(function () {
    dummyPendingTask = {
      name: 'application-notification',
      status: 'PENDING',
      action: {
        method: 'email',
        email: 'test@test.com',
        reference: 'APVS12345'
      }
    }

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
  })

  describe('run', function () {
    it('should run notification task twice', function () {
      sinon.stub(client, 'getPendingNotifications').resolves([dummyPendingTask, dummyPendingTask])
      sinon.stub(client, 'setTaskComplete')
      sinon.stub(mailer, 'sendMail')
      processTasks.run()
    })
  })
})
