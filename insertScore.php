<?php
include "database.php";

$db = new Database(connectToDB());

$levelName = $_GET['levelName'];
$levelCreatorNickname = $_GET['levelCreatorNickname'];
$playerNickname = $_GET['playerNickname'];
$score = $_GET['score'];
$replay = $_GET['replay'];

try {
   $db->insertScore($playerNickname, $levelCreatorNickname, $levelName, $score, $replay);
} catch (Exception $e) {
   echo $e . PHP_EOL;
}
?>