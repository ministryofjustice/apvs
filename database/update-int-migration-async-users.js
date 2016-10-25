// Correct internal migration user default schema and add async user
// - ONLY NEEDS TO BE DONE FOR DBs already setup prior to script being corrected
const config = require('./knexfile').development
const knex = require('knex')(config)

knex.schema
  // Correct default schema
  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = IntSchema;', [process.env.APVS_INT_MIGRATION_USERNAME])
  // Async worker
  .raw('CREATE USER ??;', [process.env.APVS_ASYNC_WORKER_USERNAME])
  .raw('ALTER ROLE db_datawriter ADD MEMBER ??;', [process.env.APVS_ASYNC_WORKER_USERNAME])
  .raw('ALTER ROLE db_datareader ADD MEMBER ??;', [process.env.APVS_ASYNC_WORKER_USERNAME])
  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
