DROP DATABASE IF EXISTS `PWEB`;
CREATE DATABASE `PWEB`;
USE `PWEB`;
SET `SQL_SAFE_UPDATES` = 0;


CREATE TABLE `User` (
	`nickname` VARCHAR(50) NOT NULL,
	`email` VARCHAR(50) UNIQUE NOT NULL,
	`password` VARCHAR(255) NOT NULL,

	PRIMARY KEY (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
-- the passwords are user1 and user2 
INSERT INTO `User` VALUES ('user1', 'user1@email.com', '$2y$10$GHXVtTWQCTq2OGBtmrrX/.4YMCrXagen.XrtS5zU4Z/jAhNxgn5g.'), ('user2', 'user2@email.com', '$2y$10$BHM99VSbUpl0qrwcxU/pRe.iMoh8xLwb3j6cLkZbJ8ie8zUHO7Sny');



CREATE TABLE `Level` (
	`name` VARCHAR(50) NOT NULL,
	`creatorNickname` VARCHAR(50) NOT NULL,
	`levelObject` TEXT NOT NULL,

	PRIMARY KEY (`name`, `creatorNickname`),
	FOREIGN KEY (`creatorNickname`)
		REFERENCES User(`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Level` VALUES ('The Maze', 'user1', '{"player":{"x":0,"y":0},"ball":{"x":2,"y":1},"hole":{"x":9,"y":0},"rocks":[{"x":6,"y":0},{"x":7,"y":0},{"x":8,"y":0},{"x":6,"y":1},{"x":7,"y":1},{"x":8,"y":1},{"x":0,"y":2},{"x":1,"y":2},{"x":3,"y":2},{"x":4,"y":2},{"x":6,"y":2},{"x":7,"y":2},{"x":0,"y":3},{"x":4,"y":3},{"x":0,"y":4},{"x":4,"y":4},{"x":0,"y":5},{"x":2,"y":5},{"x":4,"y":5},{"x":9,"y":5},{"x":0,"y":6},{"x":7,"y":6},{"x":9,"y":6},{"x":2,"y":7},{"x":3,"y":7},{"x":4,"y":7},{"x":5,"y":7},{"x":9,"y":7},{"x":9,"y":8},{"x":0,"y":9},{"x":1,"y":9},{"x":2,"y":9},{"x":3,"y":9},{"x":4,"y":9},{"x":5,"y":9},{"x":6,"y":9},{"x":9,"y":9}]}'),
	('A bunch of rocks', 'user3', '{"player":{"x":0,"y":0},"ball":{"x":8,"y":3},"hole":{"x":5,"y":11},"rocks":[{"x":3,"y":0},{"x":7,"y":1},{"x":16,"y":1},{"x":13,"y":2},{"x":2,"y":3},{"x":14,"y":3},{"x":5,"y":4},{"x":12,"y":4},{"x":17,"y":4},{"x":16,"y":5},{"x":2,"y":6},{"x":3,"y":6},{"x":6,"y":6},{"x":12,"y":6},{"x":1,"y":7},{"x":15,"y":7},{"x":5,"y":8},{"x":17,"y":8},{"x":2,"y":9},{"x":4,"y":9},{"x":11,"y":9},{"x":18,"y":10},{"x":15,"y":11},{"x":9,"y":12},{"x":13,"y":12},{"x":3,"y":14},{"x":8,"y":15},{"x":19,"y":15},{"x":1,"y":16},{"x":4,"y":16},{"x":13,"y":17},{"x":17,"y":17},{"x":3,"y":18},{"x":5,"y":18},{"x":9,"y":18},{"x":11,"y":18},{"x":16,"y":18}]}')


CREATE TABLE `BeatenBy` (
	`playerNickname` VARCHAR(50) NOT NULL,
    `id` CHAR(36) NOT NULL,
	`creatorNickname` VARCHAR(50) NOT NULL,
	`levelName` VARCHAR(50) NOT NULL,
	`score` INTEGER NOT NULL,
	`replay` TEXT NOT NULL,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`playerNickname`)
		REFERENCES User(`nickname`),
	FOREIGN KEY (`creatorNickname`, `levelName`)
		REFERENCES Level(`creatorNickname`, `name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;