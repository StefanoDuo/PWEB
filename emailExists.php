<?php
include 'utilities.php';
include 'database.php';
$email = isset($_GET['email']) ? $_GET['email'] : null;
if(isNull($email)){
   echo '{"emailExists":false,"error":"Email field empty."}';
   exit();
}
$db = new Database(connectToDB());
try {
   $result = $db->emailExists($email);
} catch(Exception $e) {
   $result = false;
   echo $e . PHP_EOL;
}

if(isset($result['emailExists']))
   echo '{"emailExists":true,"error":false}';
else
   echo '{"emailExists":false,"error":false}';
?>