/* global describe beforeEach it */
var sinon = require('sinon')
var proxyquire = require('proxyquire')
var supertest = require('supertest')
var expect = require('chai').expect

var path = require('path')
var express = require('express')
var nunjucks = require('express-nunjucks')
var logger = require('../../app/services/bunyan-logger-test')

describe('index', function () {
  var request

  beforeEach(function () {
    var app = express()

    app.set('view engine', 'html')
    app.set('views', path.join(__dirname, '../../app/views'))
    nunjucks(app)

    var route = proxyquire('../../app/routes/index', {'../bunyan-logger': logger})

    route(app)

    request = supertest(app)
  })

  describe('GET /', function () {
    it('should call logger and respond with a 200', function (done) {
      var infoStub = sinon.stub(logger, 'info')

      request
        .get('/')
        .expect(200, function (error, response) {
          expect(error).to.be.null
          expect(infoStub.calledOnce).to.be.true
          done()
        })
    })
  })
})
