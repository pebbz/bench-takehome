import { BankTransactionRepository } from './modules/BankTransactions/BankTransactionRepository';
import { DailyBalanceService } from './modules/DailyBalanceService/DailyBalanceService';
import { TransactionRestClient } from './modules/TransactionRestClient/TransactionRestClient'
import { TransactionService } from './modules/TransactionService/TransactionService';

const main = async () => {
	const url = "https://resttest.bench.co/transactions/1.json";

	/**
	 * Process Bank Transactions from endpoint and insert into database
	 */
	const clientTransaction = new TransactionRestClient();
	const repoBankTransaction = new BankTransactionRepository();
	const serviceTransaction = new TransactionService(clientTransaction, repoBankTransaction);
	await serviceTransaction.process(url);


	/**
	 * Query Daily Balances from database and display to console
	 */
	const serviceDailyBalance = new DailyBalanceService();
	const dailyBalances = await serviceDailyBalance.calculate();

	if (dailyBalances.length > 0) {
		for (let record of dailyBalances) {
			console.log(`${record.date.toISOString().slice(0, 10)} ${record.balance}`)
		}
	} else {
		console.log(`There are no daily balances`)
	}
}


(async () => {
	try {
		await main();
	} catch (e) {
		// Deal with the fact the chain failed
		console.log("There was an error:", e);
	}
})();
