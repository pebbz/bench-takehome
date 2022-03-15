import { DailyBalance } from "./DailyBalance";
import { IDailyBalanceService } from "./IDailyBalanceService";

const Database = require('better-sqlite3');
const DBPATH = process.env.PATH_DATABASE

class DailyBalanceService implements IDailyBalanceService {
	async calculate() {
		const sql = `
select date, balance
from (
	select date, balance,
		ROW_NUMBER() OVER (
			PARTITION BY
				date
			ORDER BY
				id desc
		) AS rnum
	from (
		select *, sum(amount) over (
			order by date
			rows unbounded preceding
		) balance
		from bank_transactions bt
		order by id
	)
)
where rnum = 1;
`

		const db = new Database(DBPATH/*, { verbose: console.log }*/);
		const records = await db.prepare(sql).all();
		await db.close();


		const results:DailyBalance[] = records.map((x:any)=>new DailyBalance(new Date(x.date), parseFloat(x.balance)))
		return results;
	}
}

export { DailyBalanceService }
