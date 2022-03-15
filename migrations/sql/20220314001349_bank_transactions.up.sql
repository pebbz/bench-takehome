CREATE TABLE `bank_transactions` (
	`id` integer not null primary key autoincrement,
	`date` date,
	`ledger` varchar(255),
	`amount` decimal(18,4),
	`company` varchar(255)
);
