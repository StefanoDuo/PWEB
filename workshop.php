<?php
   session_start();
   $nickname = $_SESSION['nickname'];
   if(!isset($nickname)) {
      header("Location: /PWEB/index.php");
      exit();
   }
   include "utilities.php";
?>

<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>Level Creation</title>
   <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
   <link rel="stylesheet" href="./css/main.css" >
   <script type="text/javascript" src="./js/matrix.js"></script>
   <script type="text/javascript" src="./js/vector.js"></script>
   <script type="text/javascript" src="./js/BackgroundSketcher.js"></script>
   <script type="text/javascript" src="./js/ajaxRequest.js"></script>
   <script type="text/javascript" src="./js/workshop.js"></script>
</head>
<body id="body" onLoad="start()">

<?php printHeader("workshop", isset($nickname) ? $nickname : false); ?>

<main class="xWrapper">
   <div id="gameField" class="xWrapper"></div>
   <div class="yWrapper">
      <input type="text" id="levelName">
      <button id="player" class="button gray">Player</button>
      <button id="ball" class="button gray">Ball</button>
      <button id="hole" class="button gray">Hole</button>
      <button id="rock" class="button gray">Rock</button>
      <button id="reset" class="button gray">Reset</button>
      <button id="save" class="button gray">Save</button>
   </div>
</main>

<?php include "footer.php" ?>

</body>
</html>