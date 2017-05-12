<?php
require 'config.php';
require ROOT_DIR . '/utilities/php/utilities.php';
require ROOT_DIR . '/utilities/php/database.php';
session_start();
// sign up page can't be accessed by logged in user
if(isset($_SESSION['nickname'])) {
	header("Location: /PWEB/index.php");
	exit();
}
$nickname = isset($_POST['nickname']) ? $_POST['nickname'] : null;
$email = isset($_POST['email']) ? $_POST['email'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;
if(isNull($nickname) || isNull($email) || isNull($password)) {
	header("Location: /PWEB/login.php?error=0");
	exit();
}

$password = hashPassword($password);
$db = new Database(connectToDB(ROOT_DIR . '/utilities/php/db.conf'));
try {
	$affectedRows = $db->insertUser($nickname, $email, $password);
} catch(PDOException $e) {
	$affectedRows = false;
	echo $e->getMessage() . PHP_EOL;
}
if(!$affectedRows) {
	header("Location: /PWEB/login.php?error=1");
	exit();
}
$_SESSION['nickname'] = $nickname;
header('Location: /PWEB/profile.php');
?>