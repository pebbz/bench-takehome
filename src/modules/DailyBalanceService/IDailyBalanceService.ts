import { DailyBalance } from "./DailyBalance";

interface IDailyBalanceService {
	calculate(transactions: any): Promise<DailyBalance[]>
}

export { IDailyBalanceService }
