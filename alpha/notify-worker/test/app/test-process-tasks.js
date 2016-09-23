/* global describe it */
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var chai = require('chai')
var sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)
require('sinon-bluebird')
var client = require('../../app/db-client')
var logger = require('../../app/bunyan-logger')
var mailer = require('../../app/mailer')

describe('process-tasks', function () {
  const APPLICATION_NOTIFICATION = 'application-notification'
  var processTasks, processNotification, notificationProcessSpy

  var dummyPendingTask = {
    name: APPLICATION_NOTIFICATION,
    status: 'PENDING',
    action: {
      method: 'email',
      email: 'test@test.com',
      reference: 'APVS12345'
    }
  }

  describe('run', function () {
    it('should run notification task twice', function () {
      notificationProcessSpy = sinon.spy(function (notification) {
        console.log(notification)
      })

      processNotification = {
        process: notificationProcessSpy
      }

      processTasks = proxyquire('../../app/process-tasks', {
        './db-client': client,
        './tasks/notification': processNotification,
        './bunyan-logger': logger
      })

      sinon.stub(client, 'getPendingTasks').resolves([dummyPendingTask, dummyPendingTask])
      sinon.stub(client, 'setTaskComplete')
      sinon.stub(mailer, 'sendMail')

      processTasks.run().finally(() => {
        notificationProcessSpy.should.have.been.calledTwice
      })
    })
  })
})
