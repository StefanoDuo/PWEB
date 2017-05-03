<?php
class Database {
	private $pdo;
   private $errorString1;
   private $errorString2;

	// the constructor requires an initialized mysqli object
	public function __construct($pdoObject) {
		$this->pdo = $pdoObject;
		$this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $this->errorString1 = 'An error occurred executing the query.' . PHP_EOL . 'Error message: ';
      $this->errorString2 = PHP_EOL . 'Error number: ';
	}

	public function getUser($nickname, $password) {
		$query = $this->pdo->prepare('CALL getUser(:nickname, :password);');
		$query->bindValue(':nickname', $nickname, PDO::PARAM_STR);
		$query->bindValue(':password', $password, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return $rows[0];
	}

	public function nicknameExists($nickname) {
		$query = $this->pdo->prepare('CALL nicknameExists(:nickname);');
		$query->bindValue(':nickname', $nickname, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return $rows[0];
	}

	public function emailExists($email) {
		$query = $this->pdo->prepare('CALL emailExists(:email);');
		$query->bindValue(':email', $email, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return $rows[0];
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
		return $rows[0];
	}

	// the primary key of the current level is needed to avoid receiving the current level as the next
	public function getUnbeatedLevel($playerNickname, $levelName, $creatorNickname) {
		$query = $this->pdo->prepare('CALL getUnbeatedLevel(:playerNickname, :creatorNickname, :levelName);');
		$query->bindValue(':playerNickname', $playerNickname, PDO::PARAM_STR);
		$query->bindValue(':creatorNickname', $creatorNickname, PDO::PARAM_STR);
		$query->bindValue(':levelName', $levelName, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return $rows ? $rows[0] : null;
	}

	public function getScoresObtainedBy($playerNickname) {
		$query = $this->pdo->prepare('CALL getScoresObtainedBy(:playerNickname);');
		$query->bindValue(':playerNickname', $playerNickname, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return $rows;
	}

	public function getReplay($playerNickname, $stamp) {
		$query = $this->pdo->prepare('CALL getReplay(:playerNickname, :stamp);');
		$query->bindValue(':playerNickname', $playerNickname, PDO::PARAM_STR);
		$query->bindValue(':stamp', $stamp, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll();
		return $rows[0];
	}

	public function insertLevel($levelName, $creatorNickname, $levelObject) {
		$query = $this->pdo->prepare('CALL insertLevel(:levelName, :creatorNickname, :levelObject);');
		$query->bindValue(':levelName', $levelName, PDO::PARAM_STR);
		$query->bindValue(':creatorNickname', $creatorNickname, PDO::PARAM_STR);
		$query->bindValue(':levelObject', $levelObject, PDO::PARAM_STR);
		return $query->execute();
	}

	public function insertUser($nickname, $email, $password) {
		$query = $this->pdo->prepare('CALL insertUser(:nickname, :email, :password);');
		$query->bindValue(':nickname', $nickname, PDO::PARAM_STR);
		$query->bindValue(':email', $email, PDO::PARAM_STR);
		$query->bindValue(':password', $password, PDO::PARAM_STR);
		return $query->execute();
	}

	public function insertScore($playerNickname, $levelCreatorNickname, $levelName, $score, $replay) {
		$query = $this->pdo->prepare('CALL insertScore(:playerNickname, :levelCreatorNickname, :levelName, :score, :replay);');
		$query->bindValue(':playerNickname', $playerNickname, PDO::PARAM_STR);
		$query->bindValue(':levelCreatorNickname', $levelCreatorNickname, PDO::PARAM_STR);
		$query->bindValue(':levelName', $levelName, PDO::PARAM_STR);
		$query->bindValue(':score', $score, PDO::PARAM_INT);
		$query->bindValue(':replay', $replay, PDO::PARAM_STR);
		return $query->execute();
	}
}
?>