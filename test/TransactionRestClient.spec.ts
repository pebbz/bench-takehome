import * as assert from 'assert';

import { MockTransactionRestClient } from './modules/TransactionRestClient/MockTransactionRestClient'

const TIMEOUT = 1000;

describe("Transaction Rest Client Tests", () => {
	const mockClient = new MockTransactionRestClient();

	it('When client requests endpoint with 0 records then transactions should be empty and there is no next page',
		async () => {
			// arrange

			// act
			const actual = await mockClient.get("api/test0/1.json");

			// assert
			assert.deepEqual(actual.transactions.length, 0)
			assert.deepEqual(actual.nextPage, null)
		}
		, TIMEOUT);

	it('When client requests endpoint with 1 page of records then transactions should be size 3 and there is no next page',
		async () => {
			// arrange

			// act
			const actual = await mockClient.get('api/test1/1.json');

			// assert
			assert.deepEqual(actual.transactions.length, 3)
			assert.deepEqual(actual.nextPage, null)
		}
		, TIMEOUT);

	it('When client requests endpoint with page 1 of 2 pages then transactions should be size 4 and there is a next page',
		async () => {
			// arrange

			// act
			const actual = await mockClient.get('api/test2/1.json');

			// assert
			assert.deepEqual(actual.transactions.length, 4)
			assert.deepEqual(actual.nextPage, 'api/test2/2.json')
		}
		, TIMEOUT);

	it('When client requests endpoint with page 2 of 2 pages then transactions should be size 2 and there is no next page',
		async () => {
			// arrange

			// act
			const actual = await mockClient.get('api/test2/2.json');

			// assert
			assert.deepEqual(actual.transactions.length, 2)
			assert.deepEqual(actual.nextPage, null)
		}
		, TIMEOUT);

	it('When client requests endpoint with invalid data then an exception should be thrown',
		async () => {
			// arrange

			// act & assert
			await assert.rejects(async () => {
				await mockClient.get('api/nodata/1.json')
			}, Error)
		}
		, TIMEOUT);

	it('When client requests endpoint with a status not OK (200) then an exception should be thrown',
		async () => {
			// arrange

			// act & assert
			await assert.rejects(async()=>{
				await mockClient.get('api/nosuccess/1.json')
			}, Error)
		}
		, TIMEOUT);
});
