DROP PROCEDURE IF EXISTS getUser;
DROP PROCEDURE IF EXISTS getLevels;
DROP PROCEDURE IF EXISTS getLevel;
DROP PROCEDURE IF EXISTS insertLevel;
DROP PROCEDURE IF EXISTS insertUser;
DROP PROCEDURE IF EXISTS insertScore;

DELIMITER $$

CREATE PROCEDURE getUser(IN _userNickname VARCHAR(50))
BEGIN
	SELECT U.*
    FROM User U
    WHERE U.nickname = _userNickname;
END $$

CREATE PROCEDURE getLevels()
BEGIN
	SELECT L.name, L.creatorNickname
    FROM Level L;
END $$

CREATE PROCEDURE getLevel(IN _creatorNickname VARCHAR(50), IN _levelName VARCHAR(50))
BEGIN
	SELECT L.*
    FROM Level L
    WHERE L.name = _levelName
		AND L.creatorNickname = _creatorNickname;
END $$

CREATE PROCEDURE insertLevel(IN _levelName VARCHAR(50), IN _creatorNickname VARCHAR(50), IN _levelObject BLOB)
BEGIN
	INSERT INTO `Level`(`name`, `creatorNickname`, `levelObject`)
		VALUE (_levelName, _creatorNickname, _levelObject);
END $$

CREATE PROCEDURE insertUser(IN _nickname VARCHAR(50), IN _email VARCHAR(50), IN _password VARCHAR(50))
BEGIN
	INSERT INTO `User`(`nickname`, `email`, `password`)
		VALUE (_nickname, _email, _password);
END $$

CREATE PROCEDURE insertScore(IN _playerNickname VARCHAR(50), IN _levelCreatorNickname VARCHAR(50),
	IN _levelName VARCHAR(50), IN _score INTEGER)
BEGIN
	INSERT INTO `BeatenBy`(`playerNickname`, `creatorNickname`, `levelName`, `score`)
		VALUE (_playerNickname, _levelCreatorNickname, _levelName, _score);
END $$

DELIMITER ;
