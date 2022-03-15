/**
 * Interface to manage repository of entity objects
 */
interface IEntityRepository {
	initialize():Promise<void>

	write(transactions: any[]): Promise<void>
}
export { IEntityRepository }
