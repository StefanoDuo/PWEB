<?php
include 'database.php';
include 'utilities.php';
session_start();
// sign up page can't be accessed by logged in user
if(isset($_SESSION['nickname'])) {
	header("Location: /PWEB/index.php");
	exit();
}
$nickname = isset($_GET['nickname']) ? $_GET['nickname'] : null;
$email = isset($_GET['email']) ? $_GET['email'] : null;
$password = isset($_GET['password']) ? $_GET['password'] : null;
if(isNull($nickname) || isNull($email) || isNull($password)) {
	header("Location: /PWEB/login.php?error=0");
	exit();
}

$db = new Database(connectToDB());
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