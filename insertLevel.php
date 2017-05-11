<?php
include 'utilities.php';
include 'database.php';
session_start();
if(!isset($_SESSION['nickname'])) {
	echo '{
   	"success":false,
   	"errorMessage":"You need to be logged in"
	}';
   exit();
}
$creatorNickname = isset($_GET['creatorNickname']) ? $_GET['creatorNickname'] : null;
if($creatorNickname !== $_SESSION['nickname']) {
	echo '{
   	"success":false,
   	"errorMessage":"Your identity does\'t match the parameters received"
	}';
   exit();
}
$levelObject = isset($_GET['levelObject']) ? $_GET['levelObject'] : null;
$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
if(isNull($levelObject) || isNull($creatorNickname) || isNull($levelName)) {
	echo '{
   	"success":false,
   	"errorMessage":"One or more fields are empty"
	}';
   exit();
}

$db = new Database(connectToDB());
try {
	$affectedRows = $db->insertLevel($levelName, $creatorNickname, $levelObject);
} catch (PDOException $e) {
	$affectedRows = false;
	if($e->getCode() == 23000)
		$errorMessage = "You alredy created a level with that name";
	else
		$errorMessage = "Something went wrong";
}

if($affectedRows)
	echo '{
   	"success":true,
   	"errorMessage":"null"
	}';
else
	echo '{
   	"success":false,
   	"errorMessage":"' . $errorMessage .'"
	}';
?>