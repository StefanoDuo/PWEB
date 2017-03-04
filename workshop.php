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
   <script type="text/javascript" src="./js/sketcher.js"></script>
   <script type="text/javascript" src="./js/ajaxRequest.js"></script>
   <script type="text/javascript" src="./js/workshop.js"></script>
</head>
<body id="body" onLoad="start()">

<?php printHeader("workshop", isset($nickname) ? $nickname : false); ?>

<main class="xWrapper">
   <div id="gameField" class="xWrapper"></div>
   <div class="yWrapper">
      <input type="text" id="levelName">
      <a id="player" class="button gray">Player</a>
      <a id="ball" class="button gray">Ball</a>
      <a id="hole" class="button gray">Hole</a>
      <a id="rock" class="button gray">Rock</a>
      <a id="reset" class="button gray">Reset</a>
      <a id="save" class="button gray">Save</a>
   </div>
</main>

<?php include "footer.php" ?>

</body>
</html>