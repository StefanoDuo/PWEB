<?php
	include 'utilities.php';
	session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
	if(!is_null($nickname)) {
		header('Location: /PWEB/index.php');
		exit();
	}
	$errors = array(
		0 => 'One field was empty',
		1 => 'Something went wrong',
		2 => "User doesn't exists or the password doesn't match"
	);
	$errorNumber = isset($_GET['error']) ? $_GET['error'] : null;
	if(isNull($errorNumber))
		$errorMessage = '';
	else if(isset($errors[$errorNumber]))
		$errorMessage = '<p>' . $errors[$errorNumber] . '</p>';
	else
		$errorMessage = '';
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

<?php printHeader('login', $nickname); ?>

<main class="yWrapper">
	<form action="checkLogin.php" method="post">
	<fieldset>
		<legend>Login</legend>
		<label>Nickname <input type="text" required autofocus name="nickname"></label>
		<label>Password <input type="password" required name="password"></label>
		<input type="submit" value="submit">
	</fieldset>
	</form>

	<p id="error"></p>

	<form action="insertUser.php" method="post">
	<fieldset>
		<legend>Create your account</legend>
		<label>Nickname <input type="text" name="nickname" id="nickname" required></label>
		<label>Email <input type="email" name="email" id="email" required></label>
		<label>Password <input type="password" required name="password"></label>
		<input type="submit" value="submit">
	</fieldset>
	</form>
	<?php echo $errorMessage ?>
</main>

<?php include 'footer.php' ?>

</body>
</html>