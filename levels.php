<?php
	include 'utilities.php';
	include 'database.php';
   session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
   $db = new Database(connectToDB());
   try {
      $levels = $db->getLevels();
   } catch(PDOException $e) {
      $levels = null;
      echo $e->getMessage() . PHP_EOL;
   }
?>

<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>Levels list</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
   <script type="text/javascript" src="./js/ajaxRequest.js"></script>
   <script type="text/javascript" src="./js/levels.js"></script>
	<link rel="stylesheet" href="./css/main.css" >
</head>
<body onLoad="start()">

<?php printHeader('levels', $nickname); ?>

<main class="yWrapper">
	<?php printLevelsList($levels); ?>
</main>

<?php include 'footer.php' ?>

</body>
</html>