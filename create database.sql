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
    `levelObject` BLOB NOT NULL,

	PRIMARY KEY (`name`, `creatorNickname`),
	FOREIGN KEY (`creatorNickname`)
		REFERENCES User(`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Level` VALUES ('level1', 'user1', "{\"player\":{\"x\":1,\"y\":1},\"ball\":{\"x\":3,\"y\":1},\"hole\":{\"x\":10,\"y\":10},\"rocks\":[{\"x\":6,\"y\":1},{\"x\":1,\"y\":2},{\"x\":2,\"y\":2},{\"x\":3,\"y\":2},{\"x\":10,\"y\":2},{\"x\":5,\"y\":3},{\"x\":6,\"y\":5},{\"x\":9,\"y\":6},{\"x\":10,\"y\":9},{\"x\":7,\"y\":10}]}"), ('level2', 'user2', '{"player":{"x":1,"y":1},"ball":{"x":3,"y":1},"hole":{"x":10,"y":10},"rocks":[{"x":6,"y":1},{"x":1,"y":2},{"x":2,"y":2},{"x":3,"y":2},{"x":10,"y":2},{"x":5,"y":3},{"x":6,"y":5},{"x":9,"y":6},{"x":10,"y":9},{"x":7,"y":10}]}');



CREATE TABLE `BeatenBy` (
	`playerNickname` VARCHAR(50) NOT NULL,
    `creatorNickname` VARCHAR(50) NOT NULL,
	`levelName` VARCHAR(50) NOT NULL,
	`score` INTEGER,

	PRIMARY KEY (`playerNickname`, `creatorNickname`, `levelName`),
	FOREIGN KEY (`playerNickname`)
		REFERENCES User(`nickname`),
	FOREIGN KEY (`creatorNickname`, `levelName`)
		REFERENCES Level(`creatorNickname`, `name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `BeatenBy` VALUES ('user1', 'user1', 'level1', NULL), ('user2', 'user1', 'level1', NULL), ('user3', 'user2', 'level2', NULL); 