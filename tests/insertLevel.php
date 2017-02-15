<?php
include("../database.php");
$db = new Database(connectToDB());

try {
	$result = $db->insertLevel('aaa', 'user1', 'aaa');
	echo $result . PHP_EOL;
} catch(Exception $e) {
	echo $e->getMessage() . PHP_EOL;
}

try {
	$result = $db->insertLevel('bbb', 'user2', 'bbb');
	echo $result . PHP_EOL;
} catch(Exception $e) {
	echo $e->getMessage() . PHP_EOL;
}

try {
	$result = $db->insertLevel('bbb', 'user1', 'aaa');
	echo $result . PHP_EOL;
} catch(Exception $e) {
	echo $e->getMessage() . PHP_EOL;
}

// checking for multiple primary-key error
try {
	$result = $db->insertLevel('aaa', 'user1', 'bbb');
	echo $result . PHP_EOL;
} catch(Exception $e) {
	echo $e->getMessage() . PHP_EOL;
}

try {
	$result = $db->insertLevel('bbb', 'user1', 'bbb');
	echo $result . PHP_EOL;
} catch(Exception $e) {
	echo $e->getMessage() . PHP_EOL;
}

?>