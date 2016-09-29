# Database

This is the place for database configuration and scripts.

#### MySQL:
You can interact with the mysql database directly by connecting to it's container with `docker exec -it apvs_mysql_1 mysql --user=apvs --password=apvs apvs`

#### Knex:
In order to interact with the database using the `Knex` library it will need to be installed globally with `npm install knex -g`.

##### Migrations:
Migrations are used to build the database.

Update database to latest `knex migrate:latest`.
Rollback update `knex migrate:rollback`.

##### Seeds:
Seeds are used to populate the database tables with data.

Execute seed files with `knex seed: run`