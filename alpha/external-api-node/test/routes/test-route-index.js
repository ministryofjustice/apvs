/* global describe beforeEach it */
var proxyquire = require('proxyquire')
var supertest = require('supertest')
var expect = require('chai').expect
var express = require('express')
var bodyParser = require('body-parser')

describe('index', function () {
  var request
  var result
  var mockClaimChecker = {
    checkForAutomaticProcessing (claim) {
      return result
    }
  }

  beforeEach(function () {
    var app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    var route = proxyquire('../../app/routes/index', {'../lib/claim-checker': mockClaimChecker})

    route(app)

    request = supertest(app)
  })

  describe('POST /check-for-automatic-processing', function () {
    it('should respond with a 200 and return result', function (done) {
      result = { 'processing-type': 'automatic', 'messages': null }

      request
        .post('/check-for-automatic-processing')
        .type('json')
        .send(JSON.stringify({ amount: 99 }))
        .expect(200, function (error, response) {
          expect(error).to.be.null
          expect(response.text).to.equal(JSON.stringify(result))
          done()
        })
    })

    it('should respond with a 500 and return error for invalid claim', function (done) {
      result = null

      request
        .post('/check-for-automatic-processing')
        .type('json')
        .send(JSON.stringify({random: 'stuff'}))
        .expect(500, function (error, response) {
          expect(error).to.be.null
          expect(response.text).to.contain('Invalid claim')
          done()
        })
    })
  })
})
