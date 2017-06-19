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
		0 => 'One field was empty',
		1 => 'Something went wrong',
		2 => "User doesn't exists or the password doesn't match",
	);
	$errorNumber = isset($_GET['error']) ? $_GET['error'] : null;
	$loginErrorMessage = '';
	$signupErrorMessage = '';
	if(!isNull($errorNumber) && isset($errors[$errorNumber])) {
		if($errorNumber == 1)
			$signupErrorMessage = '<p>' . $errors[$errorNumber] . '</p>';
		else
			$loginErrorMessage = '<p>' . $errors[$errorNumber] . '</p>';
	}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Login / Signup</title>
   <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
	<link rel="stylesheet" href="./resources/css/main.css" >
	<script type="text/javascript" src="./utilities/js/ajaxRequest.js"></script>
	<script type="text/javascript" src="./resources/js/login.js"></script>
</head>
<body onLoad="start()">

<?php printHeader('login', $nickname); ?>

<main class="yWrapper">
	<div class="card">
	<h1>Login</h1>
	<form action="checkLogin.php" method="post">
		<input type="text" required autofocus name="nickname" placeholder="Nickname">
		<input type="password" required name="password" placeholder="Password">
		<button type="submit" value="submit" class="raisedButton secondaryDark">Submit</button>
	</form>
	<?php echo $loginErrorMessage ?>
	</div>

	<div class="card">
	<h1>Signup</h1>
	<form action="insertUser.php" method="post">
		<input type="text" name="nickname" id="nickname" required placeholder="Nickname">
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