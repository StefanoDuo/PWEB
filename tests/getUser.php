<?php
include("../database.php");
$db = new Database(connectToDB());

try {
	$result = $db->getUser('user1');
	echo $result['nickname'] . PHP_EOL;
} catch(Exception $e) {
	echo $e->getMessage() . PHP_EOL;
}

try {
	$result = $db->getUser('user2');
	echo $result['nickname'] . PHP_EOL;
} catch(Exception $e) {
	echo $e->getMessage() . PHP_EOL;
}
?>