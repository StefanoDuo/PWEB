DROP PROCEDURE IF EXISTS getUser;
DROP PROCEDURE IF EXISTS getLevels;
DROP PROCEDURE IF EXISTS getLevelsCreatedBy;
DROP PROCEDURE IF EXISTS getLevel;
DROP PROCEDURE IF EXISTS getScoresObtainedBy;
DROP PROCEDURE IF EXISTS getReplay;
DROP PROCEDURE IF EXISTS insertLevel;
DROP PROCEDURE IF EXISTS insertUser;
DROP PROCEDURE IF EXISTS insertScore;

DELIMITER $$

CREATE PROCEDURE getUser(IN _userNickname VARCHAR(50))
BEGIN
	SELECT U.nickname
    FROM User U
    WHERE U.nickname = _userNickname;
END $$

CREATE PROCEDURE getLevels()
BEGIN
	SELECT L.name, L.creatorNickname, L.levelObject
    FROM Level L;
END $$

CREATE PROCEDURE getLevelsCreatedBy(IN _creatorNickname VARCHAR(50))
BEGIN
	SELECT L.name
    FROM Level L
    WHERE L.creatorNickname = _creatorNickname;
END $$

CREATE PROCEDURE getLevel(IN _creatorNickname VARCHAR(50), IN _levelName VARCHAR(50))
BEGIN
	SELECT L.*
    FROM Level L
    WHERE L.name = _levelName
		AND L.creatorNickname = _creatorNickname;
END $$

CREATE PROCEDURE getScoresObtainedBy(IN _playerNickname VARCHAR(50))
BEGIN
	SELECT B.levelName, B.creatorNickname, B.score
    FROM BeatenBy B
    WHERE B.playerNickname = _playerNickname;
END $$

CREATE PROCEDURE getReplay(IN _playerNickname VARCHAR(50), IN _creatorNickname VARCHAR(50), IN _levelName VARCHAR(50))
BEGIN
	SELECT B.replay	
    FROM BeatenBy B
    WHERE B.playerNickname = _playerNickname
		AND B.creatorNickname = _creatorNickname
        AND B.levelName = _levelName;
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
	IN _levelName VARCHAR(50), IN _score INTEGER, IN _replay TEXT)
BEGIN
	INSERT INTO `BeatenBy`(`playerNickname`, `creatorNickname`, `levelName`, `score`, `replay`)
		VALUE (_playerNickname, _levelCreatorNickname, _levelName, _score, _replay);
END $$

DELIMITER ;
