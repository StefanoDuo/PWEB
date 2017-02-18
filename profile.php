<?php
   session_start();
   if(!isset($_SESSION['nickname'])) {
      header("Location: /PWEB/index.php");
      exit();
   }
   include "utilities.php";
   include "database.php";


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
   printHeader("profile", $_SESSION['nickname']);
   echo '<h1>Levels you created</h1>';
   $db = new Database(connectToDB());
   printLevelCreatedBy($_SESSION['nickname'], $db);
   echo '<h1>Levels you completed</h1>';
   printScoresObtainedBy($_SESSION['nickname'], $db);
?>



<?php include "footer.php" ?>

</body>
</html>