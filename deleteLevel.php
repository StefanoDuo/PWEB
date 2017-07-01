<?php
require 'config.php';
require ROOT_DIR . '/utilities/php/utilities.php';
require ROOT_DIR . '/utilities/php/database.php';
session_start();
$creatorNickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
$levelName = isset($_POST['levelName']) ? $_POST['levelName'] : null;
if(isNull($creatorNickname) || isNull($levelName)) {
	header('Location: ./index.php');
   exit();
}

$db = new Database(connectToDB(ROOT_DIR . '/utilities/php/db.conf'));
try {
   $level = $db->getLevel($levelName, $creatorNickname);
} catch(PDOException $e) {
   $level = null;
   echo $e->getMessage() . PHP_EOL;
}
if(isNull($level)) {
	header('Location: ./index.php');
   exit();
}
try {
   $affectedRows = $db->deleteLevel($creatorNickname, $levelName);
} catch(Exception $e) {
   $affectedRows = 0;
   echo $e . PHP_EOL;
}
if($affectedRows)
	header('Location: ./profile.php');
else
	header('Location: ./profile.php?levelError=0');
?>