const TABLE_NAME = 'eligibility'

const eligibility1 = {
  'title': 'Mr',
  'first_name': 'Thomas',
  'last_name': 'Rowe',
  'dob-day': '17',
  'dob-month': '04',
  'dob-year': '1989',
  'address': '123 Example Street',
  'postcode': 'CJ16 234',
  'email': 'thomas.rowe@gmail.com',
  'phone_number': '0256897987'
}

const eligibility2 = {
  'title': 'Miss',
  'first_name': 'Sarah',
  'last_name': 'Jane',
  'dob-day': '02',
  'dob-month': '09',
  'dob-year': '1978',
  'address': '678 Example Street',
  'postcode': 'VE34 234',
  'email': 'sarah.jane@gmail.com',
  'phone_number': '0546454678'
}

exports.seed = function (knex, Promise) {
  return knex(TABLE_NAME).del()
    .then(function () {
      return Promise.all([
        knex(TABLE_NAME).insert(eligibility1),
        knex(TABLE_NAME).insert(eligibility2)
      ])
    })
}
