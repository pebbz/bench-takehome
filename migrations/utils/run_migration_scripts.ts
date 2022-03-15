import { Knex } from "knex";
var path = require('path');
var fs = require('fs');

export default async function run_migration_scripts(files: string[], action: string, knex: Knex) {
	let inputFiles = files;
	if (action == "down") {
		inputFiles = files.reverse()
	}

	for(let file of inputFiles) {
		let filepath = path.join(__dirname, '../sql/', file + '.' + action + '.sql');
		var sql = fs.readFileSync(filepath).toString();
		await knex.raw(sql);
	}
}
