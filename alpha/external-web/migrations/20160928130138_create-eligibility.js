const TABLE_NAME = 'eligibility'

exports.up = function (knex, Promise) {
  return Promise.all([

    knex.schema.createTable(TABLE_NAME, function (table) {
      table.bigIncrements('id').primary().unsigned()
    })

  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable(TABLE_NAME)
  ])
}
