<?php
   require 'config.php';
   require ROOT_DIR . '/utilities/php/utilities.php';
   session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
   if(isNull($nickname)) {
      header('Location: ./index.php');
      exit();
   }
?>

<!DOCTYPE html>
<html lang="en-US">
<head>
   <meta charset="utf-8">
   <title>The Maze: workshop</title>
   <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
   <link rel="stylesheet" href="./resources/css/main.css" >
   <script type="text/javascript" src="./utilities/js/matrix.js"></script>
   <script type="text/javascript" src="./utilities/js/vector.js"></script>
   <script type="text/javascript" src="./utilities/js/backgroundSketcher.js"></script>
   <script type="text/javascript" src="./utilities/js/ajaxRequest.js"></script>
   <script type="text/javascript" src="./utilities/js/queue.js"></script>
   <script type="text/javascript" src="./utilities/js/set.js"></script>
   <script type="text/javascript" src="./utilities/js/game.js"></script>
   <script type="text/javascript" src="./resources/js/workshop.js"></script>
</head>
<body id="body" onLoad="start()">

<?php printHeader("workshop", $nickname); ?>

<main>
   <div class="xWrapper workshop">
      <div class="yWrapper">
         <input type="text" id="levelName" required placeholder="Level name" maxlength="30">
         <div id="gameField" class="xWrapper"></div>
         <span id="errorMessage" class="errorMessage"> </span>
      </div>
      <div class="yWrapper workshopButtons">
         <button id="player" class="raisedButton secondaryDark">Player</button>
         <button id="ball" class="raisedButton secondaryDark">Chest</button>
         <button id="hole" class="raisedButton secondaryDark">Hole</button>
         <button id="rock" class="raisedButton secondaryDark">Rock</button>
         <button id="reset" class="raisedButton secondaryDark">Reset</button>
         <button id="save" class="raisedButton secondaryDark">Save</button>
      </div>
   </div>
</main>

<?php include 'footer.php' ?>

</body>
</html>