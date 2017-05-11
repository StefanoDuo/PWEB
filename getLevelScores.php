<?php
include 'database.php';
include 'utilities.php';
$creatorNickname = isset($_GET['creatorNickname']) ? $_GET['creatorNickname'] : null;
$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
$jsonResponse = getDefaultResponse();
$jsonResponse['scores'] = null;
$jsonResponse['creatorNickname'] = null;
$jsonResponse['levelName'] = null;

if(isNull($creatorNickname) || isNull($levelName)) {
   $jsonResponse['errorMessage'] = 'One or more fields are empty';
	echo json_encode($jsonResponse);
	exit();
}
$jsonResponse['creatorNickname'] = htmlspecialchars($creatorNickname);
$jsonResponse['levelName'] = htmlspecialchars($levelName);

$db = new Database(connectToDB());
try {
   $scores = $db->getLevelScores($creatorNickname, $levelName);
} catch(PDOException $e) {
   $scores = null;
   echo $e->getMessage() . PHP_EOL;
}

if($scores) {
   $jsonResponse['success'] = true;
   $jsonResponse['errorMessage'] = null;
   $jsonResponse['scores'] = $scores;
}
else {
   $jsonResponse['success'] = false;
   $jsonResponse['errorMessage'] = 'No scores';
   $jsonResponse['scores'] = null;
}
echo json_encode($jsonResponse);
?>