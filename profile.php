<?php
   session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
   if(is_null($nickname)) {
      header("Location: /PWEB/index.php");
      exit();
   }
   include "utilities.php";
   include "database.php";
   $db = new Database(connectToDB());
   try {
      $levels = $db->getLevelsCreatedBy($nickname);
   } catch(Exception $e) {
      $levels = null;
      echo $e . PHP_EOL;
   }
   try {
      $scores = $db->getScoresObtainedBy($nickname);
   } catch(Exception $e) {
      $scores = null;
      echo $e . PHP_EOL;
   }
?>

<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>Your profile</title>
   <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
   <link rel="stylesheet" href="./css/main.css" >
</head>
<body>

<?php
   printHeader("profile", $nickname);
   echo '<h1>Levels you created</h1>';
   printLevelsCreatedBy($nickname, $levels);
   echo '<h1>Levels you completed</h1>';
   printScoresObtainedBy($nickname, $scores);
?>

<?php include "footer.php" ?>

</body>
</html>