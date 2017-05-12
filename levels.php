<?php
   require 'config.php';
   require ROOT_DIR . '/utilities/php/utilities.php';
   require ROOT_DIR . '/utilities/php/database.php';
   session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
   $db = new Database(connectToDB(ROOT_DIR . '/utilities/php/db.conf'));
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
   <script type="text/javascript" src="./utilities/js/ajaxRequest.js"></script>
   <script type="text/javascript" src="./resources/js/levels.js"></script>
   <link rel="stylesheet" href="./resources/css/main.css" >
</head>
<body onLoad="start()">

<?php printHeader('levels', $nickname); ?>

<main class="yWrapper">
	<?php printLevelsList($levels); ?>
</main>

<?php include 'footer.php' ?>

</body>
</html>