import * as assert from 'assert';

import { DailyBalanceService } from '../src/modules/DailyBalanceService/DailyBalanceService';
import { TransactionService } from '../src/modules/TransactionService/TransactionService';
import { BankTransactionRepository } from '../src/modules/BankTransactions/BankTransactionRepository'
import { MockTransactionRestClient } from './modules/TransactionRestClient/MockTransactionRestClient'
import { DailyBalance } from '../src/modules/DailyBalanceService/DailyBalance';

const TIMEOUT = 1000;
const DBPATH = (process.env.PATH_DATABASE??"")

describe("Transaction Daily Balances Tests", () => {
	const mockClient = new MockTransactionRestClient();
	const repoTransaction = new BankTransactionRepository();
	const serviceTransaction = new TransactionService(mockClient, repoTransaction)
	const serviceDailyBalance = new DailyBalanceService();

	beforeEach(async() => {
		// Before each test, clear out unit test database
		if (DBPATH.indexOf("unittest") < 0) {
			throw "Error: PATH_DATABASE is not configured to point to unittest database!"
		}
	})

	it('When transactions are empty then daily balance should be empty',
		async () => {
			// arrange
			const expected:any[] = []
			await serviceTransaction.process('dailybalance/test0/1.json');

			// act
			const actual = await serviceDailyBalance.calculate();

			// assert
			assert.deepEqual(actual, expected);
		}
		, TIMEOUT);

	it('When transactions consist of multiple positive amounts for a single day then daily balance should contain a single day with a positive value',
		async () => {
			// arrange
			const expected: any[] = [
				new DailyBalance(new Date("2013-12-17"), 300.00),
			]
			await serviceTransaction.process('dailybalance/test1/1.json');

			// act
			const actual = await serviceDailyBalance.calculate();

			// assert
			assert.deepEqual(actual, expected);
		}
		, TIMEOUT);

	it('When transactions consist of multiple positive and negative amounts for a single day then daily balance should contain a single day with a zero balance',
		async () => {
			// arrange
			const expected: any[] = [
				new DailyBalance(new Date("2013-12-17"), 0),
			]
			await serviceTransaction.process('dailybalance/test2/1.json');

			// act
			const actual = await serviceDailyBalance.calculate();

			// assert
			assert.deepEqual(actual, expected);
		}
		, TIMEOUT);


	it('When multiple transactions across multiple days then daily balance should have multiple days',
		async () => {
			// arrange
			const expected = [
				new DailyBalance(new Date("2013-12-12"), -45.05),
				new DailyBalance(new Date("2013-12-13"), -55.55),
				new DailyBalance(new Date("2013-12-14"), -30.55)
			]
			await serviceTransaction.process('dailybalance/test3/1.json');

			// act
			const actual = await serviceDailyBalance.calculate();

			// assert
			assert.deepEqual(actual, expected);
		}
		, TIMEOUT);

	it('When multiple transactions across multiple days in descending order then daily balance should have multiple days',
		async () => {
			// arrange
			const expected = [
				new DailyBalance(new Date("2013-12-12"), -45.05),
				new DailyBalance(new Date("2013-12-13"), -55.55),
				new DailyBalance(new Date("2013-12-14"), -30.55)
			]
			await serviceTransaction.process('dailybalance/test4/1.json');

			// act
			const actual = await serviceDailyBalance.calculate();

			// assert
			assert.deepEqual(actual, expected);
		}
		, TIMEOUT);
});
