<?php
   require 'config.php';
   require ROOT_DIR . '/utilities/php/utilities.php';
	session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
?>

<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>placeholder, a game</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./resources/css/main.css" >
</head>
<body>

<?php printHeader("index", $nickname); ?>

<!-- will contain game "lore" and tutorial -->
<h1>Soon&trade;</h1>

<?php include 'footer.php' ?>

</body>
</html>