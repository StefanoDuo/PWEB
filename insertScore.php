<?php
include 'database.php';
include 'utilities.php';
session_start();
if(!isset($_SESSION['nickname'])) {
	echo '{
   	"success":false,
   	"errorMessage":"You need to be logged in"
	}';
   exit();
}
$db = new Database(connectToDB());
$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
$levelCreatorNickname = isset($_GET['levelCreatorNickname']) ? $_GET['levelCreatorNickname'] : null;
$playerNickname = isset($_GET['playerNickname']) ? $_GET['playerNickname'] : null;
if($playerNickname !== $_SESSION['nickname']) {
	echo '{
   	"success":false,
   	"errorMessage":"Your identity does\'t match the parameter received"
	}';
   exit();
}
$score = isset($_GET['score']) ? $_GET['score'] : null;
$replay = isset($_GET['replay']) ? $_GET['replay'] : null;
if(isNull($levelName) || isNull($levelCreatorNickname) || isNull($playerNickname) |
   isNull($score) || isNull($replay)) {
	echo '{
   	"success":false,
   	"errorMessage":"One or more fields are empty"
	}';
   exit();
}
try {
   $result = $db->insertScore($playerNickname, $levelCreatorNickname, $levelName, $score, $replay);
} catch (PDOException $e) {
	$result = false;
   echo $e->getMessage() . PHP_EOL;
}
if($result)
	echo '{
   	"success":true,
   	"errorMessage":null
	}';
else
	echo '{
   	"success":false,
   	"errorMessage":"Something went wrong"
	}';
?>