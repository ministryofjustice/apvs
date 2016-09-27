var FieldValidator = require('./field-validator')

class PersonalDetailsValidator {
  validate (
    data,
    errors = {},
    {
      'name1': name1Field,
      'name2': name2Field,
      'dob-day': dobDayField,
      'dob-month': dobMonthField,
      'dob-year': dobYearField
    }) {
    var name1 = data[name1Field]
    var name2 = data[name2Field]
    var dobDay = data[dobDayField]
    var dobMonth = data[dobMonthField]
    var dobYear = data[dobYearField]

    if (name1Field) {
      FieldValidator(name1, name1Field, errors)
        .isRequired()
        .isAlpha()
    }
    if (name2Field) {
      FieldValidator(name2, name2Field, errors)
        .isRequired()
        .isAlpha()
    }
    if (dobDayField) {
      FieldValidator(dobDay, dobDayField, errors)
        .isRequired()
        .isNumeric()
    }
    if (dobMonthField) {
      FieldValidator(dobMonth, dobMonthField, errors)
        .isRequired()
        .isNumeric()
    }
    if (dobYearField) {
      FieldValidator(dobYear, dobYearField, errors)
        .isRequired()
        .isNumeric()
    }

    return errors
  }
}

exports.default = PersonalDetailsValidator
module.exports = exports['default']
