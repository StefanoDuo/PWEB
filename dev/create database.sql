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

INSERT INTO `Level` VALUES ('level1', 'user1', '{&quot;player&quot;:{&quot;x&quot;:0,&quot;y&quot;:0},&quot;ball&quot;:{&quot;x&quot;:1,&quot;y&quot;:1},&quot;hole&quot;:{&quot;x&quot;:4,&quot;y&quot;:5},&quot;rocks&quot;:[{&quot;x&quot;:0,&quot;y&quot;:1},{&quot;x&quot;:3,&quot;y&quot;:2},{&quot;x&quot;:1,&quot;y&quot;:3},{&quot;x&quot;:4,&quot;y&quot;:4},{&quot;x&quot;:2,&quot;y&quot;:5},{&quot;x&quot;:5,&quot;y&quot;:7},{&quot;x&quot;:3,&quot;y&quot;:8}]}'), ('level2', 'user2', '{&quot;player&quot;:{&quot;x&quot;:0,&quot;y&quot;:0},&quot;ball&quot;:{&quot;x&quot;:2,&quot;y&quot;:1},&quot;hole&quot;:{&quot;x&quot;:5,&quot;y&quot;:4},&quot;rocks&quot;:[{&quot;x&quot;:1,&quot;y&quot;:0},{&quot;x&quot;:3,&quot;y&quot;:1},{&quot;x&quot;:7,&quot;y&quot;:2},{&quot;x&quot;:2,&quot;y&quot;:3},{&quot;x&quot;:1,&quot;y&quot;:7},{&quot;x&quot;:6,&quot;y&quot;:8}]}');



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