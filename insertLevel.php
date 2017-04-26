<?php
include "database.php";
$db = new Database(connectToDB());
$levelObject = isset($_GET['levelObject']) ? $_GET['levelObject'] : null;
$creatorNickname = isset($_GET['creatorNickname']) ? $_GET['creatorNickname'] : null;
$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
if(is_null($levelObject) || is_null($creatorNickname) || is_null($levelName))
   exit();
try {
	$db->insertLevel($levelName, $creatorNickname, $levelObject);
} catch (Exception $e) {
	echo $e . PHP_EOL;
}
?>