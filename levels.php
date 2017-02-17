<?php
	session_start();
	include "utilities.php";
	include "database.php";
?>

<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>Levels list</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css" >
</head>
<body>

<?php printHeader("levels", isset($_SESSION['nickname'])); ?>

<main class="yWrapper">
	<?php printLevelList(new Database(connectToDB())); ?>
</main>

<?php include "footer.php" ?>

</body>
</html>