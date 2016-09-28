var supertest = require('supertest')
var proxyquire = require('proxyquire')
var expect = require('chai').expect
var express = require('express')
var bodyParser = require('body-parser')
var sinon = require('sinon')
var mockViewEngine = require('./mock-view-engine')
require('sinon-bluebird')

describe('about-you route', function () {
  var request
  var validationErrors
  var eligibilityFlag
  var eligibilityFlagGetStub
  var claimant = {
    '_id': '123'
  }
  var isEligibilityModified = true
  var logger = {
    info: function (text) {
      // console.log('test-logger-info: ' + text)
    },
    '@noCallThru': true
  }

  before(function () {
    var app = express()

    mockViewEngine(app, '../../app/views')

    app.use(bodyParser.urlencoded({ extended: false }))

    var router = express.Router()

    app.use('/', router)

    var client = proxyquire('../../app/services/eligibility-client', {
      './database': { '@noCallThru': true }
    })

    sinon.stub(client, 'save').resolves(claimant)
    sinon.stub(client, 'update').resolves(claimant)

    eligibilityFlag = proxyquire('../../app/services/eligibility-flag', {
      './eligibility-client': { '@noCallThru': true },
      './bunyan-logger': { logger,
        '@noCallThru': true }
    })

    eligibilityFlagGetStub = sinon.stub(eligibilityFlag, 'get').resolves(isEligibilityModified)
    sinon.stub(eligibilityFlag, 'update').resolves({})

    var routeAboutYou = proxyquire('../../app/routes/about-you.js', {
      '../services/validators/about-you-validator.js': function (data) { return validationErrors },
      '../services/eligibility-client': client,
      '../services/eligibility-flag': eligibilityFlag,
      '../services/bunyan-logger': logger
    })

    routeAboutYou(router)

    request = supertest(app)
  })

  beforeEach(function () {
    validationErrors = false
  })

  describe('GET /about-you', function () {
    it('should response with a 200', function (done) {
      request
        .get('/about-you')
        .expect(200)
        .end(done())
    })
  })

  describe('POST /about-you', function () {
    it('should respond with a 302 when no errors', function (done) {
      request
        .post('/about-you')
        .send({ 'name': 'test name' })
        .expect(302)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.headers.location).to.equal('/relationship/123')
          done()
        })
    })

    it('should respond with a 400 when errors', function (done) {
      validationErrors = {'first-name': ['First name required']}
      request
        .post('/about-you')
        .send({ 'name': 'test name' })
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.statusCode).to.equal(400)
          done()
        })
    })
  })

  describe('POST /about-you/123', function () {
    it('should respond with a 302 when no errors', function (done) {
      request
        .post('/about-you/123')
        .send({ 'name': 'test name' })
        .expect(302)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.headers.location).to.equal('/relationship/123')
          done()
        })
    })

    it('should respond with a 302 when no errors and eligibility not modified', function (done) {
      isEligibilityModified = false
      eligibilityFlagGetStub.restore()
      eligibilityFlagGetStub = sinon.stub(eligibilityFlag, 'get').resolves(isEligibilityModified)
      request
        .post('/about-you/123')
        .send({ 'name': 'test name' })
        .expect(302)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.headers.location).to.equal('/relationship/123')
          done()
        })
    })

    it('should respond with a 400 when errors', function (done) {
      validationErrors = {'first-name': ['First name required']}
      request
        .post('/about-you/123')
        .send({ 'name': 'test name' })
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.statusCode).to.equal(400)
          done()
        })
    })
  })
})
