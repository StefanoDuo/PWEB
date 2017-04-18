DROP DATABASE IF EXISTS `PWEB`;
CREATE DATABASE `PWEB`;
USE `PWEB`;


CREATE TABLE `User` (
	`nickname` VARCHAR(50) NOT NULL,
	`email` VARCHAR(50),
	`password` VARCHAR(50),

	PRIMARY KEY (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `User` VALUES ('user1', 'email1', 'user1'), ('user2', 'email2', 'user2'), ('user3', 'email3', 'user3');



CREATE TABLE `Level` (
	`name` VARCHAR(50) NOT NULL,
	`creatorNickname` VARCHAR(50) NOT NULL,
	`levelObject` TEXT NOT NULL,

	PRIMARY KEY (`name`, `creatorNickname`),
	FOREIGN KEY (`creatorNickname`)
		REFERENCES User(`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Level` VALUES ('level1', 'user1', '{"player":{"x":0,"y":0},"ball":{"x":1,"y":1},"hole":{"x":4,"y":5},"rocks":[{"x":0,"y":1},{"x":3,"y":2},{"x":1,"y":3},{"x":4,"y":4},{"x":2,"y":5},{"x":5,"y":7},{"x":3,"y":8}]}'), ('level2', 'user2', '{"player":{"x":0,"y":0},"ball":{"x":2,"y":1},"hole":{"x":5,"y":4},"rocks":[{"x":1,"y":0},{"x":3,"y":1},{"x":7,"y":2},{"x":2,"y":3},{"x":1,"y":7},{"x":6,"y":8}]}');



CREATE TABLE `BeatenBy` (
	`playerNickname` VARCHAR(50) NOT NULL,
    `stamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`creatorNickname` VARCHAR(50) NOT NULL,
	`levelName` VARCHAR(50) NOT NULL,
	`score` INTEGER NOT NULL,
	`replay` TEXT NOT NULL,

	PRIMARY KEY (`playerNickname`, `stamp`),
	FOREIGN KEY (`playerNickname`)
		REFERENCES User(`nickname`),
	FOREIGN KEY (`creatorNickname`, `levelName`)
		REFERENCES Level(`creatorNickname`, `name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;