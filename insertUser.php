<?php
	session_start();
	// sign up page can't be accessed by logged in user
	if(isset($_SESSION['nickname'])) {
		header("Location: /PWEB/index.php");
		exit();
	}

	include "database.php";
	checkPOST();
	include "utilities.php";

	$db = new Database(connectToDB());

	$nickname = $_POST['nickname'];
	$email = $_POST['email'];
	$password = $_POST['password'];

	try {
		$result = $db->insertUser($nickname, $email, $password);
	} catch(Exception $e) {
		echo $e->getMessage() . PHP_EOL;
	}
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

<?php printHeader("levelCreation", isset($nickname) ? $nickname : false); ?>

<p>You will be redirected in <strong id="counter">5</strong></p>

<?php include "footer.php"; ?>
</body>
</html>