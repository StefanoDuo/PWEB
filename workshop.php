<?php
   require 'config.php';
   require ROOT_DIR . '/utilities/php/utilities.php';
   session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
   if(isNull($nickname)) {
      header('Location: /PWEB/index.php');
      exit();
   }
?>

<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>Level Creation</title>
   <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
   <link rel="stylesheet" href="./resources/css/main.css" >
   <script type="text/javascript" src="./utilities/js/matrix.js"></script>
   <script type="text/javascript" src="./utilities/js/vector.js"></script>
   <script type="text/javascript" src="./utilities/js/backgroundSketcher.js"></script>
   <script type="text/javascript" src="./utilities/js/ajaxRequest.js"></script>
   <script type="text/javascript" src="./resources/js/workshop.js"></script>
</head>
<body id="body" onLoad="start()">

<?php printHeader("workshop", $nickname); ?>

<main class="xWrapper">
   <div id="gameField" class="xWrapper"></div>
   <div class="yWrapper">
      Level Name <input type="text" id="levelName" required>
      <button id="player" class="button gray">Player</button>
      <button id="ball" class="button gray">Ball</button>
      <button id="hole" class="button gray">Hole</button>
      <button id="rock" class="button gray">Rock</button>
      <button id="reset" class="button gray">Reset</button>
      <button id="save" class="button gray">Save</button>
      <p id="errorMessage"></p>
   </div>
</main>

<?php include 'footer.php' ?>

</body>
</html>