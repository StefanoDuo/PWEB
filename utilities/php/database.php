<?php
class Database {
	private $pdo;

	// the constructor requires an initialized pdo object
	public function __construct($pdoObject) {
		$this->pdo = $pdoObject;
		$this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}

	public function getUser($nickname) {
		$query = $this->pdo->prepare('CALL getUser(:nickname);');
		$query->bindValue(':nickname', $nickname, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return isset($rows[0]) ? $rows[0] : null;
	}

	public function deleteLevel($creatorNickname, $levelName) {
		$query = $this->pdo->prepare('CALL deleteLevel(:creatorNickname, :levelName);');
		$query->bindValue(':creatorNickname', $creatorNickname, PDO::PARAM_STR);
		$query->bindValue(':levelName', $levelName, PDO::PARAM_STR);
		$query->execute();
		$affectedRows = $query->rowCount();
		return $affectedRows;
	}

	public function updateEmail($nickname, $email) {
		$query = $this->pdo->prepare('CALL updateEmail(:nickname, :email);');
		$query->bindValue(':nickname', $nickname, PDO::PARAM_STR);
		$query->bindValue(':email', $email, PDO::PARAM_STR);
		$query->execute();
		$affectedRows = $query->rowCount();
		return $affectedRows;
	}

	public function updatePassword($nickname, $password) {
		$query = $this->pdo->prepare('CALL updatePassword(:nickname, :password);');
		$query->bindValue(':nickname', $nickname, PDO::PARAM_STR);
		$query->bindValue(':password', $password, PDO::PARAM_STR);
		$query->execute();
		$affectedRows = $query->rowCount();
		return $affectedRows;
	}

	public function emailExists($email) {
		$query = $this->pdo->prepare('CALL emailExists(:email);');
		$query->bindValue(':email', $email, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return isset($rows[0]) ? $rows[0] : null;
	}

	public function getLevels() {
		$query = $this->pdo->prepare('CALL getLevels();');
		$query->execute();
		$rows = $query->fetchAll();
		return $rows;
	}

	public function getLevelsCreatedBy($creatorNickname) {
		$query = $this->pdo->prepare('CALL getLevelsCreatedBy(:creatorNickname);');
		$query->bindValue(':creatorNickname', $creatorNickname, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return $rows;
	}

	public function getLevel($levelName, $creatorNickname) {
		$query = $this->pdo->prepare('CALL getLevel(:creatorNickname, :levelName);');
		$query->bindValue(':creatorNickname', $creatorNickname, PDO::PARAM_STR);
		$query->bindValue(':levelName', $levelName, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return isset($rows[0]) ? $rows[0] : null;
	}

	// the primary key of the current level is needed to avoid receiving the current level as the next
	public function getUnbeatedLevel($playerNickname, $levelName, $creatorNickname) {
		$query = $this->pdo->prepare('CALL getUnbeatedLevel(:playerNickname, :creatorNickname, :levelName);');
		$query->bindValue(':playerNickname', $playerNickname, PDO::PARAM_STR);
		$query->bindValue(':creatorNickname', $creatorNickname, PDO::PARAM_STR);
		$query->bindValue(':levelName', $levelName, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return isset($rows[0]) ? $rows[0] : null;
	}

	public function getLevelScores($creatorNickname, $levelName, $resultLimit = 5) {
		$query = $this->pdo->prepare('CALL getLevelScores(:creatorNickname, :levelName, :resultLimit);');
		$query->bindValue(':creatorNickname', $creatorNickname, PDO::PARAM_STR);
		$query->bindValue(':levelName', $levelName, PDO::PARAM_STR);
		$query->bindValue(':resultLimit', $resultLimit, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll();
		return $rows;
	}

	public function getUserScores($playerNickname) {
		$query = $this->pdo->prepare('CALL getUserScores(:playerNickname);');
		$query->bindValue(':playerNickname', $playerNickname, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return $rows;
	}

	public function getReplay($id) {
		$query = $this->pdo->prepare('CALL getReplay(:id);');
		$query->bindValue(':id', $id, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return isset($rows[0]) ? $rows[0] : null;
	}

	public function insertLevel($levelName, $creatorNickname, $levelObject) {
		$query = $this->pdo->prepare('CALL insertLevel(:levelName, :creatorNickname, :levelObject);');
		$query->bindValue(':levelName', $levelName, PDO::PARAM_STR);
		$query->bindValue(':creatorNickname', $creatorNickname, PDO::PARAM_STR);
		$query->bindValue(':levelObject', $levelObject, PDO::PARAM_STR);
		$query->execute();
		$affectedRows = $query->rowCount();
		return $affectedRows;
	}

	public function insertUser($nickname, $email, $password) {
		$query = $this->pdo->prepare('CALL insertUser(:nickname, :email, :password);');
		$query->bindValue(':nickname', $nickname, PDO::PARAM_STR);
		$query->bindValue(':email', $email, PDO::PARAM_STR);
		$query->bindValue(':password', $password, PDO::PARAM_STR);
		$query->execute();
		$affectedRows = $query->rowCount();
		return $affectedRows;
	}

	public function insertScore($playerNickname, $levelCreatorNickname, $levelName, $score, $replay) {
		$query = $this->pdo->prepare('CALL insertScore(:playerNickname, :levelCreatorNickname, :levelName, :score, :replay);');
		$query->bindValue(':playerNickname', $playerNickname, PDO::PARAM_STR);
		$query->bindValue(':levelCreatorNickname', $levelCreatorNickname, PDO::PARAM_STR);
		$query->bindValue(':levelName', $levelName, PDO::PARAM_STR);
		$query->bindValue(':score', $score, PDO::PARAM_INT);
		$query->bindValue(':replay', $replay, PDO::PARAM_STR);
		$query->execute();
		$affectedRows = $query->rowCount();
		return $affectedRows;
	}
}
?>