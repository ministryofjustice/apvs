// var sinon = require('sinon')
// var proxyquire = require('proxyquire')
// var supertest = require('supertest')
// var expect = require('chai').expect

// var validator = require('../../../app/services/validators/about-you-validator')

// describe('about-you-validator', function () {

//   describe('POST /about-you', function () {
//     it('should return validation errors if no fields given', function (done) {
      
//     })

    // it('should return errors and respond with a 400 if some required fields are missing', function (done) {
    //   request
    //     .post('/about-you')
    //     .field('title', 'test')
    //     .field('first-name', 'test')
    //     .field('last-name', 'test')
    //     .field('dob-day', 'test')
    //     .expect(400, function (error, response) {
    //       expect(error).to.not.be.null
    //       done()
    //     })
    // })
    // it('should return errors and respond with a 400 if one field is invalid', function (done) {
    //   request
    //     .post('/about-you')
    //     .field('title', 'test1')
    //     .field('first-name', 'test')
    //     .field('last-name', 'test')
    //     .field('dob-day', '12')
    //     .field('dob-month', '12')
    //     .field('dob-year', '1992')
    //     .expect(400, function (error, response) {
    //       expect(error).to.not.be.null
    //       done()
    //     })
    // })
    // it('should return no errors and respond with a 200 if valid fields given', function (done) {
    //   request
    //     .post('/about-you')
    //     .field('title', 'test')
    //     .field('first-name', 'test')
    //     .field('last-name', 'test1')
    //     .field('dob-day', '12')
    //     .field('dob-month', '12')
    //     .field('dob-year', '1992')
    //     .expect(200, {
    //       errors: 'There were validation errors: {"last-name":{"param":"last-name","msg":"Last name must not be empty and must only contain letters","value":"test1"}}'
    //     }, done)
    // })
//   })
// })
