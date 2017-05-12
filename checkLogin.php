<?php
include 'database.php';
include 'utilities.php';
session_start();
// this page can't be accessed by users alredy logged in
if(isset($_SESSION['nickname'])) {
	header("Location: /PWEB/index.php");
	exit();
}
$nickname = isset($_POST['nickname']) ? $_POST['nickname'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;
if(isNull($nickname) || isNull($password)) {
	header("Location: /PWEB/login.php?error=0");
	exit();
}
$db = new Database(connectToDB());
try {
	$user = $db->getUser($nickname);
} catch(PDOException $e) {
	$user = null;
   echo $e->getMessage() . PHP_EOL;
}
// if the pair nickname password doesn't match one in the
// database redirects the user to the login page
if(isNull($user) || isNull($user['nickname']) || !verifyPassword($password, $user['password'])) {
	header("Location: /PWEB/login.php?error=2");
	exit();
}
$_SESSION['nickname'] = $nickname;
header('Location: /PWEB/profile.php');
?>