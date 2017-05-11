<?php
include 'database.php';
include 'utilities.php';
session_start();
$creatorNickname = isset($_GET['creatorNickname']) ? $_GET['creatorNickname'] : null;
$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
if(isNull($creatorNickname) || isNull($levelName)) {
	header('Location: /PWEB/index.php');
   exit();
}
$db = new Database(connectToDB());
// first we check if the level exists and if it does
// if the user logged in is the creator of the level
try {
   $level = $db->getLevel($levelName, $creatorNickname);
} catch(PDOException $e) {
   $level = null;
   echo $e->getMessage() . PHP_EOL;
}
if(isNull($level) || $level['creatorNickname'] !== $_SESSION['nickname']) {
	header('Location: /PWEB/index.php');
   exit();
}
try {
   $affectedRows = $db->deleteLevel($creatorNickname, $levelName);
} catch(Exception $e) {
   $affectedRows = 0;
   echo $e . PHP_EOL;
}
if($affectedRows)
	header('Location: /PWEB/profile.php');
else
	header('Location: /PWEB/profile.php?levelError=0');
?>