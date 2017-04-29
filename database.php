<?php
class Database {
	private $mysqli;
   private $errorString1;
   private $errorString2;

	// the constructor requires an initialized mysqli object
	public function __construct($mysqliObject) {
		$this->mysqli = $mysqliObject;
      $this->errorString1 = 'An error occurred executing the query.' . PHP_EOL . 'Error message: ';
      $this->errorString2 = PHP_EOL . 'Error number: ';
	}

	public function __destruct() {
		$this->mysqli->close();
	}

	// transforms the result set of a query into an array of
	// associative arrays, each represents a row of the result
	private function fetchResultSet($result) {
		$rows = array();
		while($buffer = $result->fetch_assoc()) {
			$rows[] = $buffer;
		}
		$result->free_result();
		return $rows;
	}

	// used on query that can return only 1 row (condition on primary key)
	// this directly returns an associative array instead of an array of
	// associative arrays with only 1 element
	private function fetchResult($result) {
		$row = $result->fetch_assoc();
		$result->free_result();
		return $row;
	}

	// stored procedure returs always one extra empty result set to 
	// communicate the client that there are no more result set, it's
	// needed because a stored procedure can return multiple result sets
	// while a single query can return only 1
	private function clearExtraResultSets() {
		while($this->mysqli->more_results()) {
		    $this->mysqli->next_result();
		    if($result = $this->mysqli->store_result())
		        $res->free_result();
		}
	}

	public function getUser($nickname) {
		// real_query() returns false if the query execution failed, true otherwise
		$success = $this->mysqli->real_query("CALL getUser('$nickname');");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		// store_result() returns false if either the query didn't produce a result
		// (eg. INSERT statement) or if the execution failed, that can't be happening
		// for us because we check for execution fails with real_query()
		$queryResult = $this->mysqli->store_result();
		if(!$queryResult)
			return null;
		$result = $this->fetchResult($queryResult);
		$this->clearExtraResultSets();
		return $result;
	}

	public function nicknameExists($nickname) {
		// real_query() returns false if the query execution failed, true otherwise
		$success = $this->mysqli->real_query("CALL nicknameExists('$nickname');");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		// store_result() returns false if either the query didn't produce a result
		// (eg. INSERT statement) or if the execution failed, that can't be happening
		// for us because we check for execution fails with real_query()
		$queryResult = $this->mysqli->store_result();
		if(!$queryResult)
			return null;
		$result = $this->fetchResult($queryResult);
		$this->clearExtraResultSets();
		return $result;
	}

	public function emailExists($email) {
		// real_query() returns false if the query execution failed, true otherwise
		$success = $this->mysqli->real_query("CALL emailExists('$email');");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		// store_result() returns false if either the query didn't produce a result
		// (eg. INSERT statement) or if the execution failed, that can't be happening
		// for us because we check for execution fails with real_query()
		$queryResult = $this->mysqli->store_result();
		if(!$queryResult)
			return null;
		$result = $this->fetchResult($queryResult);
		$this->clearExtraResultSets();
		return $result;
	}

	public function getLevels() {
		$success = $this->mysqli->real_query("CALL getLevels();");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		$queryResult = $this->mysqli->store_result();
		if(!$queryResult)
			return null;
		$result = $this->fetchResultSet($queryResult);
		$this->clearExtraResultSets();
		return $result;
	}

	public function getLevelsCreatedBy($creatorNickname) {
		$success = $this->mysqli->real_query("CALL getLevelsCreatedBy('$creatorNickname');");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		$queryResult = $this->mysqli->store_result();
		if(!$queryResult)
			return null;
		$result = $this->fetchResultSet($queryResult);
		$this->clearExtraResultSets();
		return $result;
	}

	public function getLevel($levelName, $creatorNickname) {
		$success = $this->mysqli->real_query("CALL getLevel('$creatorNickname', '$levelName');");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		$queryResult = $this->mysqli->store_result();
		if(!$queryResult)
			return null;
		$result = $this->fetchResult($queryResult);
		$this->clearExtraResultSets();
		return $result;
	}

	// the primary key of the current level is needed to avoid receiving the current level as the next
	public function getUnbeatedLevel($playerNickname, $levelName, $creatorNickname) {
		$success = $this->mysqli->real_query("CALL getUnbeatedLevel('$playerNickname', '$creatorNickname', '$levelName');");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		$queryResult = $this->mysqli->store_result();
		if(!$queryResult)
			return null;
		$result = $this->fetchResult($queryResult);
		$this->clearExtraResultSets();
		return $result;
	}

	public function getScoresObtainedBy($playerNickname) {
		$success = $this->mysqli->real_query("CALL getScoresObtainedBy('$playerNickname');");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		$queryResult = $this->mysqli->store_result();
		if(!$queryResult)
			return null;
		$result = $this->fetchResultSet($queryResult);
		$this->clearExtraResultSets();
		return $result;
	}

	public function getReplay($playerNickname, $stamp) {
		$success = $this->mysqli->real_query("CALL getReplay('$playerNickname', '$stamp');");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		$queryResult = $this->mysqli->store_result();
		if(!$queryResult)
			return null;
		$result = $this->fetchResult($queryResult);
		$this->clearExtraResultSets();
		return $result;
	}

	public function insertLevel($levelName, $creatorNickname, $levelObject) {
		$success = $this->mysqli->real_query("CALL insertLevel('$levelName', '$creatorNickname', '$levelObject');");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		// there isn't any need to call either fetchResult or free_result because
		// data manipulation queries can only return false; still need to 
		// store_result though, otherwise the next query will throw an error
		$result = $this->mysqli->store_result();
		// if no exception were thrown at this point the query went through
		// successfully meaning $result is null, we return true to communicate that
		return true;
	}

	public function insertUser($nickname, $email, $password) {
		$success = $this->mysqli->real_query("CALL insertUser('$nickname', '$email', '$password');");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		$result = $this->mysqli->store_result();
		return true;
	}

	public function insertScore($playerNickname, $levelCreatorNickname, $levelName, $score, $replay) {
		$success = $this->mysqli->real_query("CALL insertScore('$playerNickname', '$levelCreatorNickname', '$levelName', $score, '$replay');");
		if(!$success)
			throw new Exception($this->errorString1 . $this->mysqli->error . $this->errorString2 . $this->mysqli->errno . PHP_EOL);
		$result = $this->mysqli->store_result();
		return true;
	}
}
?>