// Drop external and internal schemas/users to clear database
const config = require('./knexfile').development
const knex = require('knex')(config)

knex.schema
  // USERS
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_EXT_WEB_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_EXT_MIGRATION_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_INT_WEB_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_INT_MIGRATION_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [process.env.APVS_ASYNC_WORKER_USERNAME])
  .raw('DROP ROLE IF EXISTS ExtSchemaReadWrite;')
  .raw('DROP ROLE IF EXISTS IntSchemaReadWrite;')
  // TABLES EXTSCHEMA
  .raw('DROP TABLE IF EXISTS ExtSchema.Task;')
  .raw('DROP TABLE IF EXISTS ExtSchema.EligibilityVisitorUpdateContactDetail;')
  .raw('DROP TABLE IF EXISTS ExtSchema.ClaimBankDetail;')
  .raw('DROP TABLE IF EXISTS ExtSchema.ClaimDocument;')
  .raw('DROP TABLE IF EXISTS ExtSchema.ClaimExpense;')
  .raw('DROP TABLE IF EXISTS ExtSchema.ClaimChild;')
  .raw('DROP TABLE IF EXISTS ExtSchema.Claim;')
  .raw('DROP TABLE IF EXISTS ExtSchema.Visitor;')
  .raw('DROP TABLE IF EXISTS ExtSchema.Prisoner;')
  .raw('DROP TABLE IF EXISTS ExtSchema.Eligibility;')
  .raw('DROP TABLE IF EXISTS ExtSchema.knex_ext_migrations_lock;')
  .raw('DROP TABLE IF EXISTS ExtSchema.knex_ext_migrations;')
  // TABLES INTSCHEMA
  .raw('DROP TABLE IF EXISTS IntSchema.AutoApprovalConfig;')
  .raw('DROP TABLE IF EXISTS IntSchema.DirectPaymentFile;')
  .raw('DROP TABLE IF EXISTS IntSchema.Task;')
  .raw('DROP TABLE IF EXISTS IntSchema.ClaimEvent;')
  .raw('DROP TABLE IF EXISTS IntSchema.ClaimBankDetail;')
  .raw('DROP TABLE IF EXISTS IntSchema.ClaimDocument;')
  .raw('DROP TABLE IF EXISTS IntSchema.ClaimExpense;')
  .raw('DROP TABLE IF EXISTS IntSchema.ClaimChild;')
  .raw('DROP TABLE IF EXISTS IntSchema.ClaimDeduction;')
  .raw('DROP TABLE IF EXISTS IntSchema.Claim;')
  .raw('DROP TABLE IF EXISTS IntSchema.Visitor;')
  .raw('DROP TABLE IF EXISTS IntSchema.Prisoner;')
  .raw('DROP TABLE IF EXISTS IntSchema.Eligibility;')
  .raw('DROP TABLE IF EXISTS IntSchema.knex_int_migrations_lock;')
  .raw('DROP TABLE IF EXISTS IntSchema.knex_int_migrations;')
  // FUNCTIONS
  .raw('DROP FUNCTION IF EXISTS IntSchema.getHistoricClaims;')
  .raw('DROP FUNCTION IF EXISTS IntSchema.getMaskedEligibility;')
  .raw('DROP FUNCTION IF EXISTS IntSchema.getClaimExpenseByIdOrLastApproved;')
  .raw('DROP FUNCTION IF EXISTS IntSchema.getClaimChildrenByIdOrLastApproved;')
  .raw('DROP FUNCTION IF EXISTS IntSchema.getClaimDocumentsHistoricClaim;')
  .raw('DROP FUNCTION IF EXISTS IntSchema.getClaimEvents')
  // SCHEMAS
  .raw('DROP SCHEMA IF EXISTS ExtSchema;')
  .raw('DROP SCHEMA IF EXISTS IntSchema;')
  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
