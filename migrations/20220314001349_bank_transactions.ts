import { Knex } from "knex";
import run_migration_scripts from './utils/run_migration_scripts'

var files = [
	'20220314001349_bank_transactions'
];
export async function up(knex: Knex): Promise<void> {
	return await run_migration_scripts(files, "up", knex);
}

export async function down(knex: Knex): Promise<void> {
	return await run_migration_scripts(files, "down", knex);
}
