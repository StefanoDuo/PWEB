DELIMITER $$

DROP PROCEDURE IF EXISTS getUser $$
CREATE PROCEDURE getUser(IN _userNickname VARCHAR(50))
BEGIN
    SELECT U.*
    FROM User U
    WHERE U.nickname = _userNickname;
END $$


DROP PROCEDURE IF EXISTS updateEmail $$
CREATE PROCEDURE updateEmail(IN _userNickname VARCHAR(50), IN _email VARCHAR(50))
BEGIN
    UPDATE User U
    SET U.email = _email
    WHERE U.nickname = _userNickname;
END $$


DROP PROCEDURE IF EXISTS updatePassword $$
CREATE PROCEDURE updatePassword(IN _userNickname VARCHAR(50), IN _password VARCHAR(255))
BEGIN
    UPDATE `User`
    SET `password` = _password
    WHERE `nickname` = _userNickname;
END $$


DROP PROCEDURE IF EXISTS deleteLevel $$
CREATE PROCEDURE deleteLevel(IN _creatorNickname VARCHAR(50), IN _levelName VARCHAR(50))
BEGIN
	DELETE FROM `Level`
    WHERE creatorNickname = _creatorNickname
		AND name = _levelName;
END $$


DROP PROCEDURE IF EXISTS emailExists $$
CREATE PROCEDURE emailExists(IN _email VARCHAR(50))
BEGIN
    SELECT *
    FROM (
        SELECT true as emailExists
        FROM User U
        WHERE U.email = _email
        UNION
            SELECT false as emailExists
    ) AS T
    LIMIT 1;
END $$


DROP PROCEDURE IF EXISTS getLevels $$
CREATE PROCEDURE getLevels()
BEGIN
	SELECT L.name, L.creatorNickname, L.levelObject
    FROM Level L;
END $$


DROP PROCEDURE IF EXISTS getLevelsCreatedBy $$
CREATE PROCEDURE getLevelsCreatedBy(IN _creatorNickname VARCHAR(50))
BEGIN
	SELECT L.name
    FROM Level L
    WHERE L.creatorNickname = _creatorNickname;
END $$


DROP PROCEDURE IF EXISTS getLevel $$
CREATE PROCEDURE getLevel(IN _creatorNickname VARCHAR(50), IN _levelName VARCHAR(50))
BEGIN
	SELECT L.*
    FROM Level L
    WHERE L.name = _levelName
		AND L.creatorNickname = _creatorNickname;
END $$


DROP PROCEDURE IF EXISTS getUnbeatedLevel $$
CREATE PROCEDURE getUnbeatedLevel(IN _playerNickname VARCHAR(50), IN _creatorNickname VARCHAR(50),
								  IN _levelName VARCHAR(50))
BEGIN
    SELECT L.*
    FROM Level L
    LEFT OUTER JOIN (
        SELECT BB.*
        FROM BeatenBy BB
        WHERE BB.playerNickname = _playerNickname
    ) AS B ON L.name = B.levelName
    WHERE B.levelName IS NULL
    AND (
        L.creatorNickname <> _creatorNickname
        OR L.name <> _levelName
    ) ORDER BY RAND()
    LIMIT 1;
END $$


DROP PROCEDURE IF EXISTS getUserScores $$
CREATE PROCEDURE getUserScores(IN _playerNickname VARCHAR(50))
BEGIN
	SELECT B.levelName, B.creatorNickname, B.score, B.stamp
    FROM BeatenBy B
    WHERE B.playerNickname = _playerNickname;
END $$


DROP PROCEDURE IF EXISTS getLevelScores $$
CREATE PROCEDURE getLevelScores(IN _creatorNickname VARCHAR(50), IN _levelName VARCHAR(50),
								IN _resultLimit INT)
BEGIN
    SELECT B.playerNickname, B.score, B.stamp
    FROM BeatenBy B
    WHERE B.creatorNickname = _creatorNickname
        AND B.levelName = _levelName
	ORDER BY B.score ASC
	LIMIT _resultLimit;
END $$


DROP PROCEDURE IF EXISTS getReplay $$
CREATE PROCEDURE getReplay(IN _playerNickname VARCHAR(50), IN _stamp TIMESTAMP)
BEGIN
	SELECT B.replay	
    FROM BeatenBy B
    WHERE B.playerNickname = _playerNickname
		AND B.stamp = _stamp;
END $$


DROP PROCEDURE IF EXISTS insertLevel $$
CREATE PROCEDURE insertLevel(IN _levelName VARCHAR(50), IN _creatorNickname VARCHAR(50),
							 IN _levelObject BLOB)
BEGIN
	INSERT INTO `Level`(`name`, `creatorNickname`, `levelObject`)
		VALUE (_levelName, _creatorNickname, _levelObject);
END $$


DROP PROCEDURE IF EXISTS insertUser $$
CREATE PROCEDURE insertUser(IN _nickname VARCHAR(50), IN _email VARCHAR(50),
							IN _password VARCHAR(255))
BEGIN
	INSERT INTO `User`(`nickname`, `email`, `password`)
		VALUE (_nickname, _email, _password);
END $$


DROP PROCEDURE IF EXISTS insertScore $$
CREATE PROCEDURE insertScore(IN _playerNickname VARCHAR(50), IN _levelCreatorNickname VARCHAR(50),
							 IN _levelName VARCHAR(50), IN _score INTEGER, IN _replay TEXT)
BEGIN
	INSERT INTO `BeatenBy`(`playerNickname`, `creatorNickname`, `levelName`, `score`, `replay`)
		VALUE (_playerNickname, _levelCreatorNickname, _levelName, _score, _replay);
END $$

DELIMITER ;