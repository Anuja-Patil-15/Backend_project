CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`Role` varchar(20),
	`contact` varchar(20),
	`email` varchar(50),
	`Password` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
