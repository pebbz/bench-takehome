
import { ITransactionService } from './ITransactionService'
import { ITransactionRestClient } from '../TransactionRestClient/ITransactionRestClient'
import { TransactionRestResponse } from '../TransactionRestClient/TransactionRestResponse'
import { IEntityRepository } from '../BankTransactions/IEntityRepository';

class TransactionService implements ITransactionService {
	clientTransaction: ITransactionRestClient;
	repoTransaction: IEntityRepository

	constructor(clientTransaction: ITransactionRestClient, repoTransaction: IEntityRepository) {
		this.clientTransaction = clientTransaction;
		this.repoTransaction = repoTransaction;
	}

	/**
	 * Fetches all transactions among multiple pages from transaction client
	 */
	async process(url: string): Promise<void> {
		await this.repoTransaction.initialize();

		let nextUrl:string|null = url;
		while (nextUrl != null) {
			let results: TransactionRestResponse = await this.clientTransaction.get(nextUrl);

			if (results.transactions.length > 0) {
				await this.repoTransaction.write(results.transactions);
			}
			nextUrl = results.nextPage;
		}
	}
}

export { TransactionService }
