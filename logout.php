<?php
	session_start();
	include 'utilities.php';
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
	// only logged in users can access the logout page
	if(is_null($nickname)){
		header('Location: /PWEB/index.php');
		exit();
	}
	// resets the $_SESSION array
	$_SESSION = array();
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Successful Logout</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css" >
	<script type="text/javascript" src="./js/redirect.js"></script>
</head>
<body onLoad="start()">

<?php printHeader('logout', $nickname); ?>

<p>Successfully logged out. You will be redirected in <strong id="counter">5</strong></p>

<?php include 'footer.php' ?>
</body>
</html>