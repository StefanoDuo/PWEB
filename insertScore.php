<?php
include "database.php";
$db = new Database(connectToDB());
$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
$levelCreatorNickname = isset($_GET['levelCreatorNickname']) ? $_GET['levelCreatorNickname'] : null;
$playerNickname = isset($_GET['playerNickname']) ? $_GET['playerNickname'] : null;
$score = isset($_GET['score']) ? $_GET['score'] : null;
$replay = isset($_GET['replay']) ? $_GET['replay'] : null;
if(is_null($levelName) || is_null($levelCreatorNickname) || is_null($playerNickname) |
   is_null($score) || is_null($replay))
   exit();
try {
   $db->insertScore($playerNickname, $levelCreatorNickname, $levelName, $score, $replay);
} catch (Exception $e) {
   echo $e . PHP_EOL;
}
?>