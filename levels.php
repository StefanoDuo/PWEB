<?php
	session_start();
	include "utilities.php";
	include "database.php";
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
   $db = new Database(connectToDB());
   try {
      $levels = $db->getLevels();
   } catch(Exception $e) {
      $levels = null;
      echo $e . PHP_EOL;
   }
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

<?php printHeader("levels", $nickname); ?>

<main class="yWrapper">
	<?php printLevelList($levels); ?>
</main>

<?php include "footer.php" ?>

</body>
</html>