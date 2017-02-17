<?php
   session_start();
   include "utilities.php";
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Signup</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css" >
</head>
<body>

<?php printHeader("levelCreation", isset($_SESSION['nickname'])); ?>

<main class="yWrapper">
	<form action="insertUser.php" method="post">
	<fieldset>
	<legend>Create your account</legend>

	<label>Nickname <input type="text" required name="nickname"></</label>
	<label>Email <input type="email" name="email"></</label>
	<label>Password <input type="password" required name="password"></</label>

	</fieldset>

	<input type="submit" value="submit">
	</form>
</main>

<?php include "footer.php" ?>

</body>
</html>