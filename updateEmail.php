<?php
include 'database.php';
include 'utilities.php';
session_start();
if(!isset($_SESSION['nickname'])) {
	header('Location: /PWEB/index.php?kdsodk');
   exit();
}
$nickname = $_SESSION['nickname'];
$email = isset($_POST['email']) ? $_POST['email'] : null;
if(isNull($email)) {
	header('Location: /PWEB/index.php?kdsodkjj22992929');
   exit();
}

$db = new Database(connectToDB());
try {
   $affectedRows = $db->updateEmail($nickname, $email);
} catch(PDOException $e) {
   $affectedRows = 0;
   echo $e->getMessage() . PHP_EOL;
}
if($affectedRows)
	header('Location: /PWEB/profile.php');
else
	header('Location: /PWEB/profile.php?emailError=0');
?>