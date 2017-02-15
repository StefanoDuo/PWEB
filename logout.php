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
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css" >
	<script type="text/javascript" src="./js/redirect.js"></script>
</head>
<body onLoad="start()">

<?php
	printHeader("logout", isset($_SESSION['nickname']));
	// resets the $_SESSION array
	$_SESSION = array();
?>

<p>Successfully logged out. You will be redirected in <strong id="counter">5</strong></p>

<?php include "footer.php" ?>
</body>
</html>