class DailyBalance {
	date: Date;
	balance: number;
	constructor(date: Date, balance: number) {
		this.date = date;

		// Beware of Floating point precision errors which takes numbers such as 0.1 * 0.2 and return 0.020000000000000004 instead of 0.02
		// https://www.geeksforgeeks.org/floating-point-number-precision-in-javascript/
		// Need to round balance to 2 decimal points
		this.balance = Math.round(balance * 100) / 100
	}
}

export { DailyBalance }
