var proxyquire = require('proxyquire')
var sinon = require('sinon')
var expect = require('chai').expect
var fieldValidator = require('../../../app/services/validators/field-validator')

describe('about-you-validator', function () {
  var personalDetailsValidator
  var aboutYouValidator
  var mockFieldValidatorFactory
  var fieldValidators
  var data

  beforeEach(function () {
    data = {
      'title': 'Mr',
      'first-name': 'John',
      'last-name': 'Smith',
      'dob-day': '12',
      'dob-month': '12',
      'dob-year': '1990'
    }
    fieldValidators = {}
    mockFieldValidatorFactory = function (data, fieldName, errors) {
      var fieldValidatorSpied = fieldValidator(data, fieldName, errors)

      fieldValidatorSpied.spyIsRequired = sinon.spy(fieldValidatorSpied, 'isRequired')
      fieldValidatorSpied.spyIsAlpha = sinon.spy(fieldValidatorSpied, 'isAlpha')
      fieldValidatorSpied.spyIsNumeric = sinon.spy(fieldValidatorSpied, 'isNumeric')

      fieldValidators[fieldName] = fieldValidatorSpied

      return fieldValidatorSpied
    }
    personalDetailsValidator = proxyquire('../../../app/services/validators/personal-details-validator.js', {
      './field-validator': mockFieldValidatorFactory
    })
    aboutYouValidator = proxyquire('../../../app/services/validators/about-you-validator.js', {
      './personal-details-validator': personalDetailsValidator,
      './field-validator': mockFieldValidatorFactory
    })
  })

  it('should return false for valid data', function (done) {
    var errors = aboutYouValidator(data)
    expect(errors).to.be.false

    expect(fieldValidators['title']).to.exist
    sinon.assert.calledOnce(fieldValidators['title'].spyIsRequired)
    sinon.assert.calledOnce(fieldValidators['title'].spyIsAlpha)

    expect(fieldValidators['first-name']).to.exist
    sinon.assert.calledOnce(fieldValidators['first-name'].spyIsRequired)
    sinon.assert.calledOnce(fieldValidators['first-name'].spyIsAlpha)

    expect(fieldValidators['last-name']).to.exist
    sinon.assert.calledOnce(fieldValidators['last-name'].spyIsRequired)
    sinon.assert.calledOnce(fieldValidators['last-name'].spyIsAlpha)

    expect(fieldValidators['dob-day']).to.exist
    sinon.assert.calledOnce(fieldValidators['dob-day'].spyIsRequired)
    sinon.assert.calledOnce(fieldValidators['dob-day'].spyIsNumeric)

    expect(fieldValidators['dob-month']).to.exist
    sinon.assert.calledOnce(fieldValidators['dob-month'].spyIsRequired)
    sinon.assert.calledOnce(fieldValidators['dob-month'].spyIsNumeric)

    expect(fieldValidators['dob-year']).to.exist
    sinon.assert.calledOnce(fieldValidators['dob-year'].spyIsRequired)
    sinon.assert.calledOnce(fieldValidators['dob-year'].spyIsNumeric)

    done()
  })
  it('should return errors for no data', function (done) {
    data = {
      'title': '',
      'first-name': '',
      'last-name': '',
      'dob-day': '',
      'dob-month': '',
      'dob-year': ''
    }

    var errors = aboutYouValidator(data)
    expect(errors).to.have.all.keys([
      'title',
      'first-name',
      'last-name',
      'dob-day',
      'dob-month',
      'dob-year'
    ])

    var titleErrorMessage = errors['title'][0]
    expect(titleErrorMessage).to.equal('Title is required')

    done()
  })
  it('should return errors for invalid first name', function (done) {
    data = {
      'title': 'Mr',
      'first-name': '12345',
      'last-name': 'Smith',
      'dob-day': '12',
      'dob-month': '12',
      'dob-year': '1990'
    }
    var errors = aboutYouValidator(data)
    var firstNameErrorMessage = errors['first-name'][0]
    expect(firstNameErrorMessage).to.equal('First name must only contain letters')

    done()
  })
  it('should return errors for missing title', function (done) {
    data = {
      'title': '',
      'first-name': 'John',
      'last-name': 'Smith',
      'dob-day': '12',
      'dob-month': '12',
      'dob-year': '1990'
    }
    var errors = aboutYouValidator(data)
    expect(errors['title'][0]).to.equal('Title is required')
    expect(errors['title'][1]).to.equal('Title must only contain letters')
    expect(errors['first-name']).to.be.empty
    expect(errors['last-name']).to.be.empty
    expect(errors['dob-day']).to.be.empty
    expect(errors['dob-month']).to.be.empty
    expect(errors['dob-year']).to.be.empty

    done()
  })
})
