// Drop external and internal schemas/users to clear database
const config = require('./knexfile').development
const knex = require('knex')(config)

knex.schema
  .raw('DROP SCHEMA IF EXISTS ExtSchema;')
  .raw('DROP SCHEMA IF EXISTS IntSchema;')
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_EXT_WEB_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_INT_WEB_USERNAME])
  .raw('DROP ROLE IF EXISTS ExtSchemaReadWrite;')
  .raw('DROP ROLE IF EXISTS IntSchemaReadWrite;')
  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
