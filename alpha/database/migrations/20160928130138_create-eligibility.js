const TABLE_NAME = 'eligibility'

exports.up = function (knex, Promise) {
  return Promise.all([

    knex.schema.createTable(TABLE_NAME, function (table) {
      table.bigIncrements('id').primary().unsigned()
      table.string('title')
      table.string('first_name')
      table.string('last_name')
      table.integer('dob-day')
      table.integer('dob-month')
      table.integer('dob-year')
      table.string('address')
      table.string('postcode')
      table.string('email')
      table.integer('phone_number')
    })

  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable(TABLE_NAME)
  ])
}
