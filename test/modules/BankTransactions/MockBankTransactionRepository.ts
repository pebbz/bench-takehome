import { IEntityRepository } from '../../../src/modules/BankTransactions/IEntityRepository'

class MockBankTransactionRepository implements IEntityRepository {
	transactions:any[] = [];

	async initialize(): Promise<void> {
		this.transactions = [];
	}

	async write(transactions: any[]): Promise<void> {
		this.transactions = [...this.transactions, ...transactions];
	}
}

export { MockBankTransactionRepository }
