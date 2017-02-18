<?php
include "database.php";

$db = new Database(connectToDB());

$levelObject = $_GET['levelObject'];
$creatorNickname = $_GET['creatorNickname'];
$levelName = $_GET['levelName'];

try {
	$db->insertLevel($levelName, $creatorNickname, $levelObject);
} catch (Exception $e) {
	echo $e . PHP_EOL;
}

?>