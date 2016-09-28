var FieldValidator = require('./field-validator')
var PersonalDetailsValidator = require('./personal-details-validator')

class EscortsValidator extends PersonalDetailsValidator {
  validate (data) {
    var errors = {}

    var address = data['escort-address']
    var personalFieldNames = {
      'name1': 'escort-name',
      'dob-day': 'escort-dob-day',
      'dob-month': 'escort-dob-month',
      'dob-year': 'escort-dob-year'
    }

    FieldValidator(address, 'escort-address', errors)
      .isRequired()
      .isAddress()

    errors = super.validate(data, errors, personalFieldNames)

    for (var field in errors) {
      if (errors.hasOwnProperty(field)) {
        if (errors[field].length > 0) { return errors }
      }
    }
    return false
  }
}
exports.default = function (data) {
  return new EscortsValidator().validate(data)
}
module.exports = exports['default']
