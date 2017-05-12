<?php
require 'config.php';
require ROOT_DIR . '/utilities/php/utilities.php';
require ROOT_DIR . '/utilities/php/database.php';
session_start();
if(!isset($_SESSION['nickname'])) {
	header('Location: /PWEB/index.php');
   exit();
}
$nickname = $_SESSION['nickname'];
$email = isset($_POST['email']) ? $_POST['email'] : null;
if(isNull($email)) {
	header('Location: /PWEB/index.php');
   exit();
}

$db = new Database(connectToDB(ROOT_DIR . '/utilities/php/db.conf'));
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