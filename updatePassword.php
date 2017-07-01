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
$password = isset($_POST['password']) ? $_POST['password'] : null;
if(isNull($password)) {
	header('Location: ./index.php');
   exit();
}
$password = hashPassword($password);
$db = new Database(connectToDB(ROOT_DIR . '/utilities/php/db.conf'));
try {
   $affectedRows = $db->updatePassword($nickname, $password);
} catch(PDOException $e) {
   $affectedRows = 0;
   echo $e->getMessage() . PHP_EOL;
}
if($affectedRows)
	header('Location: ./profile.php');
else
	header('Location: ./profile.php?passwordError=0');
?>