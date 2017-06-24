<?php
   require 'config.php';
   require ROOT_DIR . '/utilities/php/utilities.php';
	session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
	if(!is_null($nickname)) {
		header('Location: /PWEB/index.php');
		exit();
	}
	$errors = array(
		0 => 'One field was empty.',
		1 => 'Something went wrong.',
		2 => "User doesn't exists or the password doesn't match.",
	);
	$errorNumber = isset($_GET['error']) ? $_GET['error'] : null;
	$loginErrorMessage = '';
	$signupErrorMessage = '';
	if(!isNull($errorNumber) && array_key_exists($errorNumber, $errors)) {
		if($errorNumber == 1)
			$signupErrorMessage = '<span id="signupError" class="errorMessage">' . $errors[$errorNumber] . '</span>';
		else
			$loginErrorMessage = '<span id="loginError" class="errorMessage">' . $errors[$errorNumber] . '</span>';
	}
?>

<!DOCTYPE html>
<html lang="en-US">
<head>
	<meta charset="utf-8">
	<title>The Maze: register and login</title>
   <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
	<link rel="stylesheet" href="./resources/css/main.css" >
	<script type="text/javascript" src="./utilities/js/ajaxRequest.js"></script>
	<script type="text/javascript" src="./resources/js/login.js"></script>
</head>
<body onLoad="start()">

<?php printHeader('login', $nickname); ?>

<main class="yWrapper">
	<div class="card" id="login">
		<h1>Login</h1>
		<form action="checkLogin.php" method="post">
			<input type="text" required autofocus name="nickname" placeholder="Nickname" maxlength="10">
			<input type="password" required name="password" placeholder="Password">
			<button type="submit" value="submit" class="raisedButton secondaryDark">Submit</button>
		</form>
		<?php echo $loginErrorMessage ?>
	</div>

	<div class="card" id="signup">
		<h1>Signup</h1>
		<form action="insertUser.php" method="post">
			<input type="text" name="nickname" id="nickname" required placeholder="Nickname" maxlength="10">
			<input type="email" name="email" id="email" required placeholder="Email">
			<input type="password" required name="password" placeholder="Password">
			<button type="submit" value="submit" class="raisedButton secondaryDark">Submit</button>
		</form>
		<?php echo $signupErrorMessage ?>
	</div>
</main>

<?php include 'footer.php' ?>

</body>
</html>