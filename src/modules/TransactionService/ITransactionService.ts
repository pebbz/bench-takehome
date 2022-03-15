/**
 * Transaction Service
 */
interface ITransactionService {
	process(url: string): Promise<void>;
}

export { ITransactionService }
