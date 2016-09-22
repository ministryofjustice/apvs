/* global describe before beforeEach it */
var path = require('path')
var supertest = require('supertest')
var proxyquire = require('proxyquire')
var expect = require('chai').expect
var express = require('express')
var nunjucks = require('express-nunjucks')
var bodyParser = require('body-parser')
var sinon = require('sinon')
require('sinon-bluebird')

describe('about-you', function () {
  var request
  var validationErrors
  var claimant = {
    '_id': '123'
  }

  before(function () {
    var app = express()
    app.set('view engine', 'html')
    app.set('views', [ path.join(__dirname, '../../app/views'), path.join(__dirname, '../../lib/') ])

    nunjucks.setup({
      autoescape: true,
      watch: true,
      noCache: true
    }, app)

    app.use(bodyParser.urlencoded({ extended: false }))

    var router = express.Router()

    app.use('/', router)

    var client = proxyquire('../../app/services/eligibility-client', {
      './database': { '@noCallThru': true }
    })

    sinon.stub(client, 'save').resolves(claimant)

    var eligibilityFlag = proxyquire('../../app/services/eligibility-flag', {
      './eligibility-client': { '@noCallThru': true },
      './bunyan-logger': { '@noCallThru': true }
    })

    // sinon.stub(eligibilityFlag, 'get').resolves(false)

    var routeAboutYou = proxyquire('../../app/routes/about-you.js', {
      '../services/validators/about-you-validator.js': function (data) { return validationErrors },
      '../services/eligibility-client': client,
      '../services/eligibility-flag': eligibilityFlag,
      '../services/bunyan-logger': { '@noCallThru': true }
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

  /*
  describe('POST /about-you', function () {
    // it('should response with a 200 with no validation errors', function (done) {
    //   var data = {
    //     'title': 'Mr',
    //     'first-name': 'John',
    //     'last-name': 'Smith',
    //     'dob-day': '12',
    //     'dob-month': '12',
    //     'dob-year': '1990'
    //   }
    //   request
    //     .post('/about-you')
    //     .send(data)
    //     .expect(200, done)
    // })

    it('should respond with a 400 when there are validation errors', function (done) {
      console.log('test started')
      validationErrors = [{title: 'title is required'}]

      var validatorStub = sinon.mock('validator')
      validatorStub.restore()

      request
        .post('/about-you')
        .send({'first-name': 'John'})
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err)
          done()
        })
    })
  })
  */
})
