import { TransactionRestResponse } from './TransactionRestResponse'

/**
 * Transaction Rest Client
 * - interface to get a rest api and determine if there are additional pages
 */
interface ITransactionRestClient {
	totalTransactionsPerPage: number;
	get(url: string): Promise<TransactionRestResponse>;
}

export { ITransactionRestClient }
