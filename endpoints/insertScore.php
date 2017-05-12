<?php
require '../config.php';
require ROOT_DIR . '/utilities/php/utilities.php';
require ROOT_DIR . '/utilities/php/database.php';
require ROOT_DIR . '/utilities/php/jsonResponse.php';
session_start();
$jsonResponse = new JsonResponse();
if(!isset($_SESSION['nickname'])) {
   $jsonResponse->setOperationSuccess(false);
   $jsonResponse->setErrorMessage('You need to be logged in');
   echo $jsonResponse->getJsonEncoding();
   exit();
}

$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
$levelCreatorNickname = isset($_GET['levelCreatorNickname']) ? $_GET['levelCreatorNickname'] : null;
$playerNickname = isset($_GET['playerNickname']) ? $_GET['playerNickname'] : null;
if($playerNickname !== $_SESSION['nickname']) {
   $jsonResponse->setOperationSuccess(false);
   $jsonResponse->setErrorMessage('Your identity does\'t match the parameter received');
   echo $jsonResponse->getJsonEncoding();
   exit();
}

$score = isset($_GET['score']) ? $_GET['score'] : null;
$replay = isset($_GET['replay']) ? $_GET['replay'] : null;
if(isNull($levelName) || isNull($levelCreatorNickname) || isNull($playerNickname) |
   isNull($score) || isNull($replay)) {
   $jsonResponse->setOperationSuccess(false);
   $jsonResponse->setErrorMessage('One or more fields are empty');
   echo $jsonResponse->getJsonEncoding();
   exit();
}

$db = new Database(connectToDB(ROOT_DIR . '/utilities/php/db.conf'));
try {
   $result = $db->insertScore($playerNickname, $levelCreatorNickname, $levelName, $score, $replay);
} catch (PDOException $e) {
	$result = false;
   echo $e->getMessage() . PHP_EOL;
}
if($result) {
   $jsonResponse->setOperationSuccess(true);
   $jsonResponse->setErrorMessage(null);
} else {
   $jsonResponse->setOperationSuccess(false);
   $jsonResponse->setErrorMessage('Something went wrong');
}
echo $jsonResponse->getJsonEncoding();
?>