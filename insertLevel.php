<?php
include 'utilities.php';
include 'database.php';
include 'jsonResponse.php';
session_start();
$jsonReponse = new JsonResponse();
if(!isset($_SESSION['nickname'])) {
	$jsonReponse->setOperationSuccess(false);
	$jsonReponse->setErrorMessage('You need to be logged in');
	echo $jsonReponse->getJsonEncoding();
   exit();
}

$creatorNickname = isset($_GET['creatorNickname']) ? $_GET['creatorNickname'] : null;
if($creatorNickname !== $_SESSION['nickname']) {
	$jsonReponse->setOperationSuccess(false);
	$jsonReponse->setErrorMessage('Your identity does\'t match the parameters received');
	echo $jsonReponse->getJsonEncoding();
   exit();
}

$levelObject = isset($_GET['levelObject']) ? $_GET['levelObject'] : null;
$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
if(isNull($levelObject) || isNull($creatorNickname) || isNull($levelName)) {
	$jsonReponse->setOperationSuccess(false);
	$jsonReponse->setErrorMessage('One or more fields are empty');
	echo $jsonReponse->getJsonEncoding();
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

if($affectedRows) {
	$jsonReponse->setOperationSuccess(true);
	$jsonReponse->setErrorMessage(null);
}
else {
	$jsonReponse->setOperationSuccess(false);
	$jsonReponse->setErrorMessage($errorMessage);
}
echo $jsonReponse->getJsonEncoding();
?>