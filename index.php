<?php
	session_start();
	include "utilities.php";
?>

<!DOCTYPE html>
<html>
<head>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css" >
</head>
<body>

<?php printHeader("index", isset($_SESSION['nickname'])); ?>

<!-- will contain game "lore" and tutorial -->
<h1>Soon&trade;</h1>

<?php include "footer.php" ?>

</body>
</html>