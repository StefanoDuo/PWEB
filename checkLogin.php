<?php
	include 'database.php';
   include 'utilities.php';
	$nickname = isset($_POST['nickname']) ? $_POST['nickname'] : null;
	$password = isset($_POST['password']) ? $_POST['password'] : null;
	if(is_null($nickname) || is_null($password)) {
		header("Location: /PWEB/login.php?error=0");
		exit();
	}
	$db = new Database(connectToDB());
	try {
		$user = $db->getUser($nickname, $password);
	} catch(Exception $e) {
		$user = null;
	   echo $e . PHP_EOL;
	}
	// if the pair nickname password doesn't match one in the
	// database redirects the user to the login page
	if(is_null($user) || is_null($user['nickname'])) {
		header("Location: /PWEB/login.php?error=2");
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
<body onLoad="">

<?php printHeader('login', $nickname); ?>

<p>Successfully logged in. You will be redirected in <strong id="counter">5</strong></p>

<?php include 'footer.php' ?>
</body>
</html>