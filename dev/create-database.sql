DROP DATABASE IF EXISTS `PWEB`;
CREATE DATABASE `PWEB`;
USE `PWEB`;
SET `SQL_SAFE_UPDATES` = 0;



CREATE TABLE `User` (
	`nickname` VARCHAR(10) NOT NULL,
	`email` VARCHAR(50) UNIQUE NOT NULL,
	`password` VARCHAR(255) NOT NULL,

	PRIMARY KEY (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- the passwords are 'newuser', 'user1' and 'user2' 
INSERT INTO `User` VALUES ('newuser', 'newuser@email.com', '$2y$10$YVWpHhws46C0s2rLJkaexeQSa/IAjbrGvS2k4IibtV8/qgSyuq1Di'),
   ('user1', 'user1@email.com', '$2y$10$GHXVtTWQCTq2OGBtmrrX/.4YMCrXagen.XrtS5zU4Z/jAhNxgn5g.'),
	('user2', 'user2@email.com', '$2y$10$BHM99VSbUpl0qrwcxU/pRe.iMoh8xLwb3j6cLkZbJ8ie8zUHO7Sny');



CREATE TABLE `Level` (
	`name` VARCHAR(30) NOT NULL,
	`creatorNickname` VARCHAR(10) NOT NULL,
	`levelObject` TEXT NOT NULL,

	PRIMARY KEY (`name`, `creatorNickname`),
	FOREIGN KEY (`creatorNickname`)
		REFERENCES User(`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Level` VALUES ('Hidden hole', 'user2', '{"player":{"x":0,"y":0},"ball":{"x":2,"y":4},"hole":{"x":7,"y":13},"rocks":[{"x":2,"y":0},{"x":3,"y":0},{"x":4,"y":0},{"x":7,"y":0},{"x":10,"y":0},{"x":18,"y":0},{"x":19,"y":0},{"x":7,"y":1},{"x":9,"y":1},{"x":12,"y":1},{"x":14,"y":1},{"x":15,"y":1},{"x":16,"y":1},{"x":19,"y":1},{"x":0,"y":2},{"x":1,"y":2},{"x":4,"y":2},{"x":5,"y":2},{"x":7,"y":2},{"x":12,"y":2},{"x":4,"y":3},{"x":5,"y":3},{"x":17,"y":3},{"x":5,"y":4},{"x":13,"y":4},{"x":17,"y":4},{"x":18,"y":4},{"x":5,"y":5},{"x":13,"y":5},{"x":8,"y":6},{"x":0,"y":7},{"x":10,"y":7},{"x":17,"y":7},{"x":0,"y":8},{"x":7,"y":8},{"x":17,"y":8},{"x":0,"y":9},{"x":6,"y":9},{"x":7,"y":9},{"x":9,"y":9},{"x":6,"y":10},{"x":10,"y":10},{"x":17,"y":10},{"x":6,"y":11},{"x":6,"y":12},{"x":8,"y":12},{"x":11,"y":12},{"x":16,"y":12},{"x":6,"y":13},{"x":8,"y":13},{"x":6,"y":14},{"x":7,"y":14},{"x":8,"y":14},{"x":9,"y":14},{"x":10,"y":14},{"x":19,"y":15},{"x":3,"y":16},{"x":0,"y":17},{"x":11,"y":17},{"x":12,"y":17},{"x":13,"y":17},{"x":2,"y":18},{"x":3,"y":18},{"x":4,"y":18},{"x":18,"y":18},{"x":19,"y":18},{"x":11,"y":19},{"x":12,"y":19},{"x":14,"y":19},{"x":18,"y":19},{"x":19,"y":19}],"ballMovingDirection":{"x":0,"y":0}}'),
   ('Circles', 'user1', '{"player":{"x":0,"y":0},"ball":{"x":2,"y":1},"hole":{"x":11,"y":7},"rocks":[{"x":3,"y":0},{"x":9,"y":0},{"x":0,"y":1},{"x":7,"y":1},{"x":13,"y":1},{"x":17,"y":2},{"x":2,"y":3},{"x":6,"y":4},{"x":11,"y":4},{"x":13,"y":5},{"x":8,"y":6},{"x":1,"y":7},{"x":5,"y":7},{"x":14,"y":8},{"x":18,"y":8},{"x":9,"y":9},{"x":12,"y":9},{"x":4,"y":10},{"x":16,"y":11},{"x":19,"y":11},{"x":6,"y":12},{"x":15,"y":12},{"x":9,"y":13},{"x":12,"y":13},{"x":3,"y":14},{"x":19,"y":14},{"x":12,"y":16},{"x":0,"y":17},{"x":2,"y":17},{"x":10,"y":17},{"x":18,"y":17},{"x":7,"y":18},{"x":13,"y":18},{"x":17,"y":19}],"ballMovingDirection":{"x":0,"y":0}}'),
   ('A bunch of rocks', 'user2', '{"player":{"x":0,"y":0},"ball":{"x":8,"y":3},"hole":{"x":5,"y":11},"rocks":[{"x":3,"y":0},{"x":7,"y":1},{"x":16,"y":1},{"x":13,"y":2},{"x":2,"y":3},{"x":14,"y":3},{"x":5,"y":4},{"x":12,"y":4},{"x":17,"y":4},{"x":16,"y":5},{"x":2,"y":6},{"x":3,"y":6},{"x":6,"y":6},{"x":12,"y":6},{"x":1,"y":7},{"x":15,"y":7},{"x":5,"y":8},{"x":17,"y":8},{"x":2,"y":9},{"x":4,"y":9},{"x":11,"y":9},{"x":18,"y":10},{"x":15,"y":11},{"x":9,"y":12},{"x":13,"y":12},{"x":3,"y":14},{"x":8,"y":15},{"x":19,"y":15},{"x":1,"y":16},{"x":4,"y":16},{"x":13,"y":17},{"x":17,"y":17},{"x":3,"y":18},{"x":5,"y":18},{"x":9,"y":18},{"x":11,"y":18},{"x":16,"y":18}],"ballMovingDirection":{"x":0,"y":0}}');



CREATE TABLE `BeatenBy` (
	`playerNickname` VARCHAR(10) NOT NULL,
   `id` CHAR(36) NOT NULL,
	`creatorNickname` VARCHAR(10) NOT NULL,
	`levelName` VARCHAR(30) NOT NULL,
	`score` INTEGER NOT NULL,
	`replay` TEXT NOT NULL,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`playerNickname`)
		REFERENCES User(`nickname`),
	FOREIGN KEY (`creatorNickname`, `levelName`)
		REFERENCES Level(`creatorNickname`, `name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `BeatenBy` VALUES ('user2', '9875c9f0-56c7-11e7-93fa-90e6ba2536dd', 'user2', 'Hidden hole', '124', '["DOWN","LEFT","UP","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","DOWN","DOWN","RIGHT","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","UP","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","DOWN","DOWN","LEFT","LEFT","UP","DOWN","DOWN","LEFT","LEFT","LEFT","LEFT","UP","UP","RIGHT","RIGHT","LEFT","UP","RIGHT","UP","UP","UP","UP","LEFT","DOWN","LEFT","LEFT","LEFT","LEFT","LEFT","UP","RIGHT","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","RIGHT","DOWN","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","UP","LEFT","UP","UP","UP","RIGHT","DOWN","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","LEFT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","DOWN","RIGHT"]'),
   ('user2', '7e9f5c52-56c7-11e7-93fa-90e6ba2536dd', 'user2', 'Hidden hole', '164', '["DOWN","LEFT","UP","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","DOWN","DOWN","RIGHT","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","UP","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","DOWN","DOWN","LEFT","LEFT","UP","DOWN","DOWN","LEFT","LEFT","LEFT","LEFT","UP","UP","RIGHT","RIGHT","LEFT","UP","RIGHT","UP","UP","UP","UP","LEFT","DOWN","LEFT","LEFT","LEFT","LEFT","LEFT","UP","RIGHT","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","RIGHT","DOWN","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","LEFT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","UP","RIGHT","RIGHT","RIGHT","UP","LEFT","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","LEFT","LEFT","LEFT","LEFT","DOWN","DOWN","RIGHT","RIGHT","LEFT","LEFT","DOWN","DOWN","RIGHT","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","RIGHT","DOWN"]'),
   ('user2', '549f9f49-56c5-11e7-93fa-90e6ba2536dd', 'user1', 'Circles', '121', '["UP","LEFT","DOWN","LEFT","LEFT","LEFT","DOWN","RIGHT","DOWN","DOWN","LEFT","UP","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","DOWN","RIGHT","DOWN","DOWN","DOWN","RIGHT","UP","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","UP","LEFT","UP","UP","UP","UP","RIGHT","DOWN","RIGHT","RIGHT","RIGHT","DOWN","LEFT","LEFT","UP","DOWN","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","UP","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","LEFT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","LEFT","UP","LEFT","LEFT","UP","RIGHT","RIGHT","DOWN","DOWN","RIGHT"]'),
   ('user2', '347b4cdf-56c5-11e7-93fa-90e6ba2536dd', 'user1', 'Circles', '51', '["RIGHT","UP","LEFT","UP","UP","UP","UP","UP","UP","UP","RIGHT","DOWN","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","LEFT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","LEFT","UP","LEFT","LEFT","LEFT","LEFT","DOWN","RIGHT","DOWN","DOWN","DOWN","RIGHT","UP","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","RIGHT"]'),
   ('user2', '2ab2e699-56c5-11e7-93fa-90e6ba2536dd', 'user1', 'Circles', '82', '["UP","LEFT","DOWN","LEFT","LEFT","LEFT","DOWN","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","UP","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","UP","LEFT","UP","UP","UP","LEFT","DOWN","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","DOWN","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","UP","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","LEFT","DOWN","DOWN","RIGHT","RIGHT"]'),
   ('user2', '2332ff7a-56c2-11e7-93fa-90e6ba2536dd', 'user2', 'A bunch of rocks', '79', '["UP","LEFT","DOWN","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","DOWN","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","UP","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","UP","LEFT","UP","UP","UP","UP","UP","LEFT","DOWN","LEFT","LEFT","LEFT","LEFT","LEFT","DOWN","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","RIGHT","DOWN","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","DOWN"]'),
   ('user1', 'fa2339ef-56bc-11e7-93fa-90e6ba2536dd', 'user2', 'A bunch of rocks', '105', '["LEFT","DOWN","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","DOWN","DOWN","LEFT","LEFT","UP","LEFT","UP","UP","LEFT","UP","RIGHT","UP","UP","UP","UP","RIGHT","DOWN","RIGHT","RIGHT","RIGHT","UP","LEFT","UP","UP","UP","LEFT","DOWN","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","UP","UP","RIGHT","RIGHT","UP","RIGHT","DOWN","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","UP","LEFT","UP","UP","UP","UP","UP","LEFT","DOWN","LEFT","LEFT","LEFT","LEFT","LEFT","DOWN","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","RIGHT","DOWN","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","RIGHT","RIGHT"]'),
   ('user1', '1f0c0348-56bd-11e7-93fa-90e6ba2536dd', 'user2', 'A bunch of rocks', '133', '["LEFT","DOWN","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","LEFT","UP","LEFT","LEFT","LEFT","LEFT","LEFT","DOWN","DOWN","DOWN","RIGHT","RIGHT","UP","RIGHT","DOWN","RIGHT","UP","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","LEFT","DOWN","DOWN","DOWN","LEFT","UP","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","LEFT","UP","LEFT","LEFT","DOWN","DOWN","RIGHT","DOWN","RIGHT","RIGHT","DOWN","RIGHT","UP","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","UP","LEFT","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","UP","RIGHT","DOWN","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","DOWN","LEFT","LEFT","DOWN","LEFT","UP","LEFT","LEFT","LEFT","LEFT","LEFT","DOWN","RIGHT","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","RIGHT","RIGHT","DOWN","RIGHT","RIGHT","RIGHT","RIGHT","DOWN","RIGHT","RIGHT"]');
