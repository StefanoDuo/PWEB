<?php
include 'utilities.php';
include 'database.php';
$levelObject = isset($_GET['levelObject']) ? $_GET['levelObject'] : null;
$creatorNickname = isset($_GET['creatorNickname']) ? $_GET['creatorNickname'] : null;
$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
if(isNull($levelObject) || isNull($creatorNickname) || isNull($levelName)) {
	echo '{"error":"One or more fields are empty."}';
   exit();
}

$db = new Database(connectToDB());
try {
	$result = $db->insertLevel($levelName, $creatorNickname, $levelObject);
} catch (Exception $e) {
	$result = false;
	echo $e . PHP_EOL;
}

if($result)
	echo '{"error":false}';
else
	echo '{"error":"Something went wrong."}';
?>