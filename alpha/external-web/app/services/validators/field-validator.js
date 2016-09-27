var validator = require('validator')
const FIELD_NAMES = require('./validation-field-names')
const ERROR_MESSAGES = require('./validation-error-messages')

// ES6 Class used to chain common validation calls together
// Using ES6 Template literals
class FieldValidator {
  constructor (data, fieldName, errors) {
    this.data = data
    this.fieldName = fieldName
    this.displayName = FIELD_NAMES[fieldName]
    this.errors = errors

    this.errors[fieldName] = []
  }

  isRequired () {
    if (!this.data) {
      this.addErrorMessage(ERROR_MESSAGES.getIsRequired)
    }
    return this
  }

  isAlpha () {
    if (!validator.isAlpha(this.data)) {
      this.addErrorMessage(ERROR_MESSAGES.getIsAlpha)
    }
    return this
  }

  isNumeric () {
    if (!validator.isNumeric(this.data)) {
      this.addErrorMessage(ERROR_MESSAGES.getIsNumeric)
    }
    return this
  }

  isAddress () {
    // assuming addresses start with a number and a space
    if (!validator.matches(this.data, '^[0-9]+ [A-z0-9 ,-]+')) {
      this.addErrorMessage(ERROR_MESSAGES.getIsAddress)
    }
  }

  addErrorMessage (getMessage) {
    this.errors[this.fieldName].push(getMessage(this.displayName))
  }
}

exports.default = function (data, fieldName, errors) {
  return new FieldValidator(data, fieldName, errors)
}

module.exports = exports['default']
