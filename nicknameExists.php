<?php
include 'utilities.php';
include 'database.php';
$nickname = isset($_GET['nickname']) ? $_GET['nickname'] : null;
if(isNull($nickname)){
   echo '{"nicknameExists":true,"error":"Nickname field empty."}';
   exit();
}

$db = new Database(connectToDB());
try {
   $result = $db->nicknameExists($nickname);
} catch(Exception $e) {
   $result = null;
   echo $e . PHP_EOL;
}

if(isset($result['nicknameExists']))
   echo '{"nicknameExists":true,"error":false}';
else
   echo '{"nicknameExists":false,"error":false}';
?>