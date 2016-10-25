// Create external and internal schemas/users
// - ONLY NEEDS TO BE DONE ONCE PER DATABASE
const config = require('./knexfile').development
const knex = require('knex')(config)

knex.schema
  // ext schema
  .raw('CREATE SCHEMA ExtSchema;')
  // ext role
  .raw('CREATE ROLE ExtSchemaReadWrite;')
  .raw('GRANT SELECT ON SCHEMA::ExtSchema TO ExtSchemaReadWrite;')
  .raw('GRANT INSERT ON SCHEMA::ExtSchema TO ExtSchemaReadWrite;')
  .raw('GRANT UPDATE ON SCHEMA::ExtSchema TO ExtSchemaReadWrite;')
  // ext users
  .raw('CREATE USER ??;', [process.env.APVS_EXT_WEB_USERNAME])
  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = ExtSchema;', [process.env.APVS_EXT_WEB_USERNAME])
  .raw('ALTER ROLE ExtSchemaReadWrite ADD MEMBER ??;', [process.env.APVS_EXT_WEB_USERNAME])
  .raw('CREATE USER ??;', [process.env.APVS_EXT_MIGRATION_USERNAME])
  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = ExtSchema;', [process.env.APVS_EXT_MIGRATION_USERNAME])
  .raw('ALTER ROLE db_owner ADD MEMBER ??;', [process.env.APVS_EXT_MIGRATION_USERNAME])
  // int schema
  .raw('CREATE SCHEMA IntSchema;')
  // int role
  .raw('CREATE ROLE IntSchemaReadWrite;')
  .raw('GRANT SELECT ON SCHEMA::IntSchema TO IntSchemaReadWrite;')
  .raw('GRANT INSERT ON SCHEMA::IntSchema TO IntSchemaReadWrite;')
  .raw('GRANT UPDATE ON SCHEMA::IntSchema TO IntSchemaReadWrite;')
  // int users
  .raw('CREATE USER ??;', [process.env.APVS_INT_WEB_USERNAME])
  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = IntSchema;', [process.env.APVS_INT_WEB_USERNAME])
  .raw('ALTER ROLE IntSchemaReadWrite ADD MEMBER ??;', [process.env.APVS_INT_WEB_USERNAME])
  .raw('CREATE USER ??;', [process.env.APVS_INT_MIGRATION_USERNAME])
  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = IntSchema;', [process.env.APVS_INT_MIGRATION_USERNAME])
  .raw('ALTER ROLE db_owner ADD MEMBER ??;', [process.env.APVS_INT_MIGRATION_USERNAME])
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
