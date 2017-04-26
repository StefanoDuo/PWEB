<?php
	session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
	if(!is_null($nickname)) {
		header("Location: /PWEB/index.php");
		exit();
	}
	include "utilities.php";
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Login / Signup</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css">
	<script type="text/javascript" src="./js/ajaxRequest.js"></script>
	<script type="text/javascript" src="./js/login.js"></script>
</head>
<body onLoad="start()">

<?php printHeader("login", $nickname); ?>

<main class="yWrapper">
	<form action="checkLogin.php" method="post">
	<fieldset>
		<legend>Login</legend>
		<label>Nickname <input type="text" required name="nickname"></label>
		<label>Password <input type="password" required name="password"></label>
	</fieldset>
		<input type="submit" value="submit">
	</form>

	<p id="error"></p>

	<form action="insertUser.php" method="post">
	<fieldset>
		<legend>Create your account</legend>
		<label>Nickname <input type="text" required name="nickname" id="nickname"></label>
		<label>Email <input type="email" name="email" id="email"></label>
		<label>Password <input type="password" required name="password"></label>
	</fieldset>
		<input type="submit" value="submit">
	</form>
</main>

<?php include "footer.php" ?>

</body>
</html>