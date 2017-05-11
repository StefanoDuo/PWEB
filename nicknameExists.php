<?php
include 'utilities.php';
include 'database.php';
$nickname = isset($_GET['nickname']) ? $_GET['nickname'] : null;
if(isNull($nickname)){
	echo '{
   	"success":false,
   	"errorMessage":"Nickname field empty",
   	"nicknameExists":null
	}';
   exit();
}

$db = new Database(connectToDB());
try {
   $result = $db->getUser($nickname);
} catch(PDOException $e) {
   $result = null;
   echo $e->getMessage() . PHP_EOL;
}

if($result)
	echo '{
   	"success":true,
   	"errorMessage":null,
   	"nicknameExists":true
	}';
else
	echo '{
   	"success":true,
   	"errorMessage":null,
   	"nicknameExists":false
	}';
?>