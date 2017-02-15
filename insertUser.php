<?php
	session_start();
	if(isset($_SESSION['nickname'])) {
		header("Location: /PWEB/index.php");
		exit();
	}

	include "database.php";
	checkPOST();
	include "utilities.php";

	$db = new Database(connectToDB());

	$nickname = htmlspecialchars($_POST['nickname']);
	$email = htmlspecialchars($_POST['email']);
	$password = htmlspecialchars($_POST['password']);

	try {
		$result = $db->insertUser($nickname, $email, $password);
		echo $result ? 'Success!' : 'Failure!';
	} catch(Exception $e) {
		echo $e->getMessage() . PHP_EOL;
	}
?>

<!DOCTYPE html>
<html>
<head>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css" >
	<script type="text/javascript" src="./js/redirect.js"></script>
</head>
<body onLoad="start()">

<?php printHeader("levelCreation", isset($_SESSION['nickname'])); ?>

<p>You will be redirected in <strong id="counter">5</strong></p>

<?php include "footer.php" ?>
</body>
</html>