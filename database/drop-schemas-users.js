// Drop external and internal schemas/users to clear database
const config = require('./knexfile').development
const knex = require('knex')(config)

knex.schema
  .raw('DROP SCHEMA IF EXISTS ExtSchema;')
  .raw('DROP SCHEMA IF EXISTS IntSchema;')
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_EXT_WEB_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_EXT_MIGRATION_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_INT_WEB_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_INT_MIGRATION_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_ASYNC_WORKER_USERNAME])
  .raw('DROP ROLE IF EXISTS ExtSchemaReadWrite;')
  .raw('DROP ROLE IF EXISTS IntSchemaReadWrite;')
  .raw('ALTER ROLE db_owner DROP MEMBER ??;', [process.env.APVS_EXT_MIGRATION_USERNAME])
  .raw('ALTER ROLE db_owner DROP MEMBER ??;', [process.env.APVS_INT_MIGRATION_USERNAME])
  .raw('ALTER ROLE db_datareader DROP MEMBER ??;', [process.env.APVS_ASYNC_WORKER_USERNAME])
  .raw('ALTER ROLE db_datawriter DROP MEMBER ??;', [process.env.APVS_ASYNC_WORKER_USERNAME])
  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
