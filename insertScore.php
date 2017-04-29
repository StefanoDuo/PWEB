<?php
include 'database.php';
include 'utilities.php';
$db = new Database(connectToDB());
$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
$levelCreatorNickname = isset($_GET['levelCreatorNickname']) ? $_GET['levelCreatorNickname'] : null;
$playerNickname = isset($_GET['playerNickname']) ? $_GET['playerNickname'] : null;
$score = isset($_GET['score']) ? $_GET['score'] : null;
$replay = isset($_GET['replay']) ? $_GET['replay'] : null;
if(isNull($levelName) || isNull($levelCreatorNickname) || isNull($playerNickname) |
   isNull($score) || isNull($replay)) {
	echo '{"error":"One or more fields are empty."}';
   exit();
}
try {
   $result = $db->insertScore($playerNickname, $levelCreatorNickname, $levelName, $score, $replay);
} catch (Exception $e) {
	$result = false;
   echo $e . PHP_EOL;
}
if($result)
	echo '{"error":false}';
else
	echo '{"error":"Something went wrong."}';
?>