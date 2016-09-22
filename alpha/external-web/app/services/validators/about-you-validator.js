const VALIDATION_ERROR_MESSAGE = 'There were validation errors: '
const NOT_EMPTY_MESSAGE = 'must not be empty'
const IS_ALPHA_MESSAGE = 'must only contain letters'
const IS_NUMERIC_MESSAGE = 'must only contain numbers'
const AND = ' and '

exports.validationErrors = function (request, response, next) {
  request.checkBody('title', 'Title ' + NOT_EMPTY_MESSAGE + AND + IS_ALPHA_MESSAGE)
    .notEmpty().isAlpha()
  request.checkBody('first-name', 'First name ' + NOT_EMPTY_MESSAGE + AND + IS_ALPHA_MESSAGE)
    .notEmpty().isAlpha()
  request.checkBody('last-name', 'Last name ' + NOT_EMPTY_MESSAGE + AND + IS_ALPHA_MESSAGE)
    .notEmpty().isAlpha()
  request.checkBody('dob-day', 'dob-day ' + NOT_EMPTY_MESSAGE + AND + IS_NUMERIC_MESSAGE)
    .notEmpty().isNumeric()
  request.checkBody('dob-month', 'dob-month ' + NOT_EMPTY_MESSAGE + AND + IS_NUMERIC_MESSAGE)
    .notEmpty().isNumeric()
  request.checkBody('dob-year', 'dob-year ' + NOT_EMPTY_MESSAGE + AND + IS_NUMERIC_MESSAGE)
    .notEmpty().isNumeric()

  var errors = request.validationErrors(true)

  if (errors) {
    response.status(400).render('error', { error: VALIDATION_ERROR_MESSAGE + JSON.stringify(errors) })
    next()
  }

  return errors
}
