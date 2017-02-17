<?php
	include "database.php";
   	include "utilities.php";
	checkPOST();

	$db = new Database(connectToDB());

	$nickname = htmlspecialchars($_POST['nickname']);
	$password = htmlspecialchars($_POST['password']);

	$result = $db->getUser($nickname);

	// if the pair nickname password doesn't match one in the
	// database redirects the user to the login page
	if(is_null($result['nickname'])) {
		header("Location: /PWEB/login.php");
		exit();
	}

	session_start();
	$_SESSION['nickname'] = $nickname;
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Successful Login</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css">
	<script type="text/javascript" src="./js/redirect.js"></script>
</head>
<body onLoad="start()">

<?php printHeader("login", isset($_SESSION['nickname'])); ?>

<p>Successfully logged in. You will be redirected in <strong id="counter">5</strong></p>

<?php include "footer.php" ?>
</body>
</html>