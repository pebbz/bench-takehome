import { IEntityRepository } from "./IEntityRepository"

const Database = require('better-sqlite3');
const DBPATH = process.env.PATH_DATABASE

/**
 * Repository class to manage bank_transaction statments stored in sqlite db
 */
class BankTransactionRepository implements IEntityRepository {
	/**
	 * Cleans out previous records from bank_transactions.
	 *
	 * This is sufficient in this application, but if we need to retain previous runs of data, then we'll need to rearchitect the system design
	 */
	async initialize():Promise<void> {
		const db = new Database(DBPATH/*, { verbose: console.log }*/);
		const sql = "DELETE FROM bank_transactions;"
		await db.prepare(sql).run();
		db.close();
	}


	/**
	 * Given a list of transactions, insert records into sqlite database
	 */
	async write(transactions: any[]): Promise<void> {
		const db = new Database(DBPATH/*, { verbose: console.log }*/);
		const sql = `
INSERT INTO bank_transactions
(date, ledger, amount, company)
VALUES(?, ?, ?, ?);
`;

		for (let transaction of transactions) {
			let params = [
				transaction.Date,
				transaction.Ledger,
				parseFloat(transaction.Amount),
				transaction.Company
			]
			await db.prepare(sql).run(params);
		}
		await db.close();
	}
}

export { BankTransactionRepository }
