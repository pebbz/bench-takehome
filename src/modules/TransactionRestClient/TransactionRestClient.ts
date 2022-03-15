const axios = require('axios')

import { HttpStatusCodes } from './HttpStatusCodes';
import { ITransactionRestClient } from './ITransactionRestClient'
import { TransactionRestResponse } from './TransactionRestResponse'


class TransactionRestClient implements ITransactionRestClient {
	/**
	 * Number of expected maximum transactions per page
	 *
	 * Hardcoded value to 10 transactions per page.
	 *
	 * This could be moved to config, and preferably be sent from the endpoint.
	 * But we cannot always change that! :)
	 */
	totalTransactionsPerPage: number = 10;

	constructor(totalTransactionsPerPage: number = 10) {
		this.totalTransactionsPerPage = totalTransactionsPerPage;
	}

	/**
	 * Given a url and a response object, determine if there are additional pages of transactions
	 */
	private calculateNextPage(url:string, response:any) {
		const maxPageCount = response.page * this.totalTransactionsPerPage;

		// If we've fetched the last page
		if (maxPageCount >= response.totalCount) {
			return null;
		}

		// There is another page of data, calculate next url

		// This is hardcoded replacement for now and assumes the url structure follows
		// https://resttest.bench.co/transactions/{pagenum}.json
		// If this changes, we should move this into it's own utility function
		const nextPage = url.replace(response.page + ".json", (response.page + 1) + ".json");
		return nextPage;
	}

	/**
	 * Make an http get request to the endpoint url to fetch data
	 */
	protected async fetchContent(url:string) {
		return await axios.get(url);
	}

	/**
	 * Given a url, make an http request to the end point, collect the data from endpoint, and determine if there are additional pages to fetch
	 */
	async get(url: string): Promise<TransactionRestResponse> {
		// Make HTTP Request to API
		const response = await this.fetchContent(url);

		// Check if request was successful.
		// Currently only process OK responses, otherwise throw an error
		if (response.status != HttpStatusCodes.OK) {
			throw new Error(`Unexpected error status from client (${response.status})`)
		}
		if (!response.data) {
			throw new Error(`Unexpected error: data is invalid`)
		}

		// Calculate if there is another page after this one
		const nextPageUrl = this.calculateNextPage(url, response.data);
		return new TransactionRestResponse(response, nextPageUrl);
	}
}

export { TransactionRestClient }
