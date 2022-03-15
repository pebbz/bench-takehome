
import { TransactionRestClient } from '../../../src/modules/TransactionRestClient/TransactionRestClient'
import { HttpStatusCodes } from '../../../src/modules/TransactionRestClient/HttpStatusCodes'

/**
 * Wraps data into a mock wrapper emulating an HTTP request
 */
const wrapWithStatus = (data: any, status: number) => {
	return {
		data: data,
		status: status
	}
}

/**
 * Extends TransactionRestClient and returns various test data and status codes depending on structure of url.
 */
class MockTransactionRestClient extends TransactionRestClient {
	totalTransactionsPerPage: number = 4;

	protected async fetchContent(url: string) {
		switch (url) {
			case "api/test0/1.json":
				return wrapWithStatus(TEST0_EMPTY_PAGE_DATA, HttpStatusCodes.OK);
			case "api/test1/1.json":
				return wrapWithStatus(TEST1_SINGLE_PAGE_DATA, HttpStatusCodes.OK);
			case "api/test2/1.json":
				return wrapWithStatus(TEST2_PG_1_OF_2_DATA, HttpStatusCodes.OK);
			case "api/test2/2.json":
				return wrapWithStatus(TEST2_PG_2_OF_2_DATA, HttpStatusCodes.OK);
			case "api/nodata/1.json":
				return wrapWithStatus(null, HttpStatusCodes.OK);
			case "api/nosuccess/1.json":
				return wrapWithStatus(null, HttpStatusCodes.NOT_FOUND);


			case "dailybalance/test0/1.json":
				return wrapWithStatus(TEST0_EMPTY_PAGE_DATA, HttpStatusCodes.OK);

			case "dailybalance/test1/1.json":
				return wrapWithStatus(DAILYBALANCE_TEST1, HttpStatusCodes.OK);

			case "dailybalance/test2/1.json":
				return wrapWithStatus(DAILYBALANCE_TEST2, HttpStatusCodes.OK);

			case "dailybalance/test3/1.json":
				return wrapWithStatus(DAILYBALANCE_TEST3, HttpStatusCodes.OK);

			case "dailybalance/test4/1.json":
				return wrapWithStatus(DAILYBALANCE_TEST4_DESCENDING_ORDER, HttpStatusCodes.OK);


			case "dailybalance/test5/1.json":
				return wrapWithStatus(TEST2_PG_1_OF_2_DATA, HttpStatusCodes.OK);

			case "dailybalance/test5/2.json":
				return wrapWithStatus(null, HttpStatusCodes.NOT_FOUND);
		}
		return null;
	}
}

const TEST0_EMPTY_PAGE_DATA: any = {
	"totalCount": 0,
	"page": 1,
	"transactions": []
}

const TEST1_SINGLE_PAGE_DATA: any = {
	"totalCount": 3,
	"page": 1,
	"transactions":
		[{
			"Date": "2013-12-17",
			"Ledger": "",
			"Amount": "100.01",
			"Company": "Company 1"
		}, {
			"Date": "2013-12-17",
			"Ledger": "Abc",
			"Amount": "20.22",
			"Company": "Company 2"
		}, {
			"Date": "2013-12-17",
			"Ledger": "Def",
			"Amount": "-3.33",
			"Company": "Company 1"
		}]
}

const TEST2_PG_1_OF_2_DATA: any = {
	"totalCount": 6,
	"page": 1,
	"transactions":
		[{
			"Date": "2013-12-17",
			"Ledger": "",
			"Amount": "1001.01",
			"Company": "Company 1"
		}, {
			"Date": "2013-12-17",
			"Ledger": "Auto Expense",
			"Amount": "202.22",
			"Company": "Company 2"
		}, {
			"Date": "2013-12-17",
			"Ledger": "Cats and Dogs",
			"Amount": "-3.33",
			"Company": "Company 3"
		}, {
			"Date": "2013-12-17",
			"Ledger": "Summer and Winter",
			"Amount": "-46.45",
			"Company": "Company 4"
		}]
}

const TEST2_PG_2_OF_2_DATA: any = {
	"totalCount": 6,
	"page": 2,
	"transactions":
		[{
			"Date": "2013-12-17",
			"Ledger": "",
			"Amount": "1001.01",
			"Company": "Company 1"
		}, {
			"Date": "2013-12-17",
			"Ledger": "Auto Expense",
			"Amount": "202.22",
			"Company": "Company 2"
		}]
}

const DAILYBALANCE_TEST1: any = {
	"totalCount": 2,
	"page": 1,
	"transactions":
		[{
			"Date": "2013-12-17",
			"Ledger": "",
			"Amount": "100.00",
			"Company": "Company 1"
		}, {
			"Date": "2013-12-17",
			"Ledger": "Abc",
			"Amount": "200.00",
			"Company": "Company 2"
		}]
}

const DAILYBALANCE_TEST2: any = {
	"totalCount": 3,
	"page": 1,
	"transactions":
		[{
			"Date": "2013-12-17",
			"Ledger": "",
			"Amount": "100.00",
			"Company": "Company 1"
		}, {
			"Date": "2013-12-17",
			"Ledger": "Abc",
			"Amount": "200.00",
			"Company": "Company 2"
		}, {
			"Date": "2013-12-17",
			"Ledger": "Def",
			"Amount": "-300.00",
			"Company": "Company 1"
		}]
}

const DAILYBALANCE_TEST3: any = {
	"totalCount": 4,
	"page": 1,
	"transactions":
		[
			{
				"Date": "2013-12-12",
				"Ledger": "Office Expense",
				"Amount": "-25.05",
				"Company": "AA OFFICE SUPPLIES"
			},
			{
				"Date": "2013-12-12",
				"Ledger": "Insurance Expense",
				"Amount": "-20",
				"Company": "AA OFFICE SUPPLIES"
			},
			{
				"Date": "2013-12-13",
				"Ledger": "Business Meals & Entertainment Expense",
				"Amount": "-10.5",
				"Company": "MCDONALDS RESTAURANT"
			},
			{
				"Date": "2013-12-14",
				"Ledger": "Credit Card - 1234",
				"Amount": "25",
				"Company": "PAYMENT - THANK YOU"
			}
		]
}

const DAILYBALANCE_TEST4_DESCENDING_ORDER: any = {
	"totalCount": 4,
	"page": 1,
	"transactions":
		[
			{
				"Date": "2013-12-14",
				"Ledger": "Credit Card - 1234",
				"Amount": "25",
				"Company": "PAYMENT - THANK YOU"
			},
			{
				"Date": "2013-12-13",
				"Ledger": "Business Meals & Entertainment Expense",
				"Amount": "-10.5",
				"Company": "MCDONALDS RESTAURANT"
			},
			{
				"Date": "2013-12-12",
				"Ledger": "Office Expense",
				"Amount": "-25.05",
				"Company": "AA OFFICE SUPPLIES"
			},
			{
				"Date": "2013-12-12",
				"Ledger": "Insurance Expense",
				"Amount": "-20",
				"Company": "AA OFFICE SUPPLIES"
			}
		]
}


export { MockTransactionRestClient }
