# APVS Database migrations

Contains the database scripts necessary to setup the MS SQL Database instance used for APVS (Assisted Prison Visit Scheme).

These are the helper scripts to setup and clear down the database. The main migration scripts necessary to setup the database schema live in the [apvs-external-web](https://github.com/ministryofjustice/apvs-external-web.git) and [apvs-internal-web](https://github.com/ministryofjustice/apvs-internal-web.git).

## Requires

* [node](https://nodejs.org)

## Run

Set environmental variables:

```
export APVS_MIGRATIONS_USERNAME='USERNAME'
export APVS_MIGRATIONS_PASSWORD='PASSWORD'
export APVS_DATABASE='DATABASE'
export APVS_DATABASE_SERVER='DATABASESERVER'

export APVS_EXT_WEB_USERNAME='USERNAME'
export APVS_EXT_WEB_PASSWORD='PASSWORD'

export APVS_EXT_MIGRATION_USERNAME='USERNAME'
export APVS_EXT_MIGRATION_PASSWORD='PASSWORD'

export APVS_INT_WEB_USERNAME='USERNAME'
export APVS_INT_WEB_PASSWORD='PASSWORD'

export APVS_INT_MIGRATION_USERNAME='USERNAME'
export APVS_INT_MIGRATION_PASSWORD='PASSWORD'

export APVS_ASYNC_WORKER_USERNAME='USERNAME'
export APVS_ASYNC_WORKER_PASSWORD='PASSWORD'

npm install

# ONLY NEEDS TO BE DONE ONCE PER DATABASE SERVER NOT DATABASE INSTANCE
node create-logins-on-master.js

node create-schemas-users.js

# Clear database
# node drop-schemas-users.js

# Delete knex migrations lock after failure
# node delete-migration-lock.js
```