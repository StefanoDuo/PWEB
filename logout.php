<?php
	session_start();
	if(!isset($_SESSION['nickname'])){
		header("Location: /PWEB/index.php");
		exit();
	}
	include "utilities.php";
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Successful Logout</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css" >
	<script type="text/javascript" src="./js/redirect.js"></script>
</head>
<body onLoad="start()">

<?php
	// resets the $_SESSION array
	$_SESSION = array();
	printHeader("logout", isset($_SESSION['nickname']));
?>

<p>Successfully logged out. You will be redirected in <strong id="counter">5</strong></p>

<?php include "footer.php" ?>
</body>
</html>