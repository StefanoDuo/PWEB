<?php
	session_start();
	include 'database.php';
	include 'utilities.php';
	// sign up page can't be accessed by logged in user
	if(isset($_SESSION['nickname'])) {
		header("Location: /PWEB/index.php");
		exit();
	}
	$nickname = isset($_POST['nickname']) ? $_POST['nickname'] : null;
	$email = isset($_POST['email']) ? $_POST['email'] : null;
	$password = isset($_POST['password']) ? $_POST['password'] : null;
	if(isNull($nickname) || isNull($email) || isNull($password)) {
		header("Location: /PWEB/login.php?error=0");
		exit();
	}

	$db = new Database(connectToDB());
	try {
		$success = $db->insertUser($nickname, $email, $password);
	} catch(Exception $e) {
		$success = false;
		echo $e->getMessage() . PHP_EOL;
	}
	if(!$success) {
		header("Location: /PWEB/login.php?error=1");
		exit();
	}
	$_SESSION['nickname'] = $nickname;
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Successful Signup</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css" >
	<script type="text/javascript" src="./js/redirect.js"></script>
</head>
<body onLoad="start()">

<?php printHeader('levelCreation', $nickname); ?>

<p>You will be redirected in <strong id="counter">5</strong></p>

<?php include 'footer.php' ?>
</body>
</html>