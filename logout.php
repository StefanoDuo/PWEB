<?php
require 'config.php';
require ROOT_DIR . '/utilities/php/utilities.php';
session_start();
$nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
// only logged in users can access the logout page
if(isNull($nickname)){
	header('Location: ./index.php');
	exit();
}
// resets the $_SESSION array
$_SESSION = array();
header('Location: ./index.php');
exit();
?>