/**
 * Transaction Rest Response Object
 */
class TransactionRestResponse {
	// Integer, total number of transactions across all pages
	totalCount: number

	// Integer, current page
	page: number

	/**
	 * Array of Transactions
	 *
	 * - Date - String, date of transaction
	 * - Ledger - String, ledger name
	 * - Amount - String, amount
	 * - Company - String, company name
	 *
	 * NOTE:
	 * Depending on the API specification with the 3rd party API, they may be returning a loosely typed response and may return additional fields that we don't process.
	 * In order to future proof against 3rd party changes to the API, we leverage a loosely typed array.
	 * However, this runs the risk of the 3rd party removing fields too and returning only partial data.
	 * Need to implement validation before consuming.
	 *
	 */
	transactions: any[];

	// url for next page of transactions
	nextPage: string | null;

	constructor(obj: any, nextPage:string|null) {
		this.totalCount = obj.totalCount;
		this.page = obj.page;
		this.transactions = obj.transactions;
		this.nextPage = nextPage;
	}
}

export { TransactionRestResponse }
