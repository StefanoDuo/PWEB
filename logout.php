<?php
include 'utilities.php';
session_start();
$nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
// only logged in users can access the logout page
if(isNull($nickname)){
	header('Location: /PWEB/index.php');
	exit();
}
// resets the $_SESSION array
$_SESSION = array();
header('Location: /PWEB/index.php');
exit();
?>