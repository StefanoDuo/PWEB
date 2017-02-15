<?php
include("../database.php");
$db = new Database(connectToDB());

try {
	$result = $db->insertUser('aaa', 'aaa', 'aaa');
	echo $result;
} catch(Exception $e) {
	echo $e->getMessage() . PHP_EOL;
}

try {
	$result = $db->insertUser('bbb', 'bbb', 'bbb');
	echo $result;
} catch(Exception $e) {
	echo $e->getMessage() . PHP_EOL;
}

// checking for multiple primary-key error
try {
	$result = $db->insertUser('aaa', 'aaa', 'aaa');
	echo $result;
} catch(Exception $e) {
	echo $e->getMessage() . PHP_EOL;
}

try {
	$result = $db->insertUser('bbb', 'bbb', 'bbb');
	echo $result;
} catch(Exception $e) {
	echo $e->getMessage() . PHP_EOL;
}

?>