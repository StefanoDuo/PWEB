<?php
include 'database.php';
include 'utilities.php';
include 'jsonResponse.php';
$creatorNickname = isset($_GET['creatorNickname']) ? $_GET['creatorNickname'] : null;
$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
$jsonResponse = new JsonResponse();
$jsonResponse->setElement('scores', null);
$jsonResponse->setElement('creatorNickname', null);
$jsonResponse->setElement('levelName', null);

if(isNull($creatorNickname) || isNull($levelName)) {
   $jsonResponse->setOperationSuccess(false);
   $jsonResponse->setErrorMessage('One or more fields are empty');
	echo $jsonResponse->getJsonEncoding();
	exit();
}
$jsonResponse->setElement('creatorNickname', htmlspecialchars($creatorNickname));
$jsonResponse->setElement('levelName', htmlspecialchars($levelName));

$db = new Database(connectToDB());
try {
   $scores = $db->getLevelScores($creatorNickname, $levelName);
} catch(PDOException $e) {
   $scores = null;
   echo $e->getMessage() . PHP_EOL;
}

if($scores) {
   $jsonResponse->setOperationSuccess(true);
   $jsonResponse->setErrorMessage(null);
   $jsonResponse->setElement('scores', $scores);
} else {
   $jsonResponse->setOperationSuccess(false);
   $jsonResponse->setErrorMessage('No scores');
   $jsonResponse->setElement('scores', null);
}
echo $jsonResponse->getJsonEncoding();
?>