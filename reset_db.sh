PATH_DATABASE="./db/database.sqlite3" ./node_modules/knex/bin/cli.js migrate:rollback --all
PATH_DATABASE="./db/database.sqlite3" ./node_modules/knex/bin/cli.js migrate:latest

PATH_DATABASE="./db/unittest_database.sqlite3" ./node_modules/knex/bin/cli.js migrate:rollback --all
PATH_DATABASE="./db/unittest_database.sqlite3" ./node_modules/knex/bin/cli.js migrate:latest
