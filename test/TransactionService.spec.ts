import * as assert from 'assert';

import { MockTransactionRestClient } from './modules/TransactionRestClient/MockTransactionRestClient'
import { MockBankTransactionRepository } from './modules/BankTransactions/MockBankTransactionRepository'
import { TransactionService } from '../src/modules/TransactionService/TransactionService';

const TIMEOUT = 1000;

describe("Transaction Service Tests", () => {
	it('When service processes single-page transactions then total transactions should be size 3',
		async () => {
			// arrange
			const mockClient = new MockTransactionRestClient();
			const repoTransaction = new MockBankTransactionRepository();
			const serviceTransaction = new TransactionService(mockClient, repoTransaction)

			// act
			await serviceTransaction.process('api/test1/1.json');

			// assert
			assert.deepEqual(repoTransaction.transactions.length, 3)
		}
		, TIMEOUT);

	it('When service processes multi-page transactions then total transactions should be size 6',
		async () => {
			// arrange
			const mockClient = new MockTransactionRestClient();
			const repoTransaction = new MockBankTransactionRepository();
			const serviceTransaction = new TransactionService(mockClient, repoTransaction)

			// act
			await serviceTransaction.process('api/test2/1.json');

			// assert
			assert.deepEqual(repoTransaction.transactions.length, 6)
		}
		, TIMEOUT);
});
