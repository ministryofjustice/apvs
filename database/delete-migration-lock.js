// Drop external and internal schemas/users to clear database
const config = require('./knexfile').development
const knex = require('knex')(config)

knex.schema
  .raw('DELETE FROM knex_ext_migrations_lock;')
  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
