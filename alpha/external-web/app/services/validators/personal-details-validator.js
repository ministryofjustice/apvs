var FieldValidator = require('./field-validator')

class PersonalDetailsValidator {
  validate (data, fieldNames, errors = {}) {
    var name1Field = fieldNames['name1']
    var name1 = data[name1Field]

    var name2Field = fieldNames['name2']
    var name2 = data[name2Field]

    var dobDayField = fieldNames['dob-day']
    var dobDay = data[dobDayField]

    var dobMonthField = fieldNames['dob-month']
    var dobMonth = data[dobMonthField]

    var dobYearField = fieldNames['dob-year']
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
