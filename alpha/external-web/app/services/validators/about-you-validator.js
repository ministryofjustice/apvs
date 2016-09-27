var FieldValidator = require('./field-validator')
var PersonalDetailsValidator = require('./personal-details-validator')

class AboutYouValidator extends PersonalDetailsValidator {
  validate (data) {
    var errors = {}

    var title = data['title']
    var personalFieldNames = {
      'name1': 'first-name',
      'name2': 'last-name',
      'dob-day': 'dob-day',
      'dob-month': 'dob-month',
      'dob-year': 'dob-year'
    }

    FieldValidator(title, 'title', errors)
      .isRequired()
      .isAlpha()

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
  return new AboutYouValidator().validate(data)
}
module.exports = exports['default']
