<?php
include 'utilities.php';
include 'database.php';
$email = isset($_GET['email']) ? $_GET['email'] : null;
if(isNull($email)){
   echo '{
   	"success":false,
   	"emailExists":false,
   	"errorMessage":"Email field empty"
   }';
   exit();
}
$db = new Database(connectToDB());
try {
   $result = $db->emailExists($email);
} catch(PDOException $e) {
   $result = false;
   echo $e->getMessage() . PHP_EOL;
}

if($result['emailExists'])
   echo '{
   	"success":true,
   	"emailExists":true,
   	"errorMessage":null
	}';
else
   echo '{
   	"success":true,
   	"emailExists":false,
   	"errorMessage":null
   }';
?>