<?php
require 'config.php';
require ROOT_DIR . '/utilities/php/utilities.php';
require ROOT_DIR . '/utilities/php/database.php';
session_start();
if(!isset($_SESSION['nickname'])) {
	header('Location: ./index.php');
   exit();
}
$nickname = $_SESSION['nickname'];
$email = isset($_POST['email']) ? $_POST['email'] : null;
if(isNull($email)) {
	header('Location: ./index.php');
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
	header('Location: ./profile.php');
else
	header('Location: ./profile.php?emailError=0');
?>