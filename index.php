<?php
	session_start();
	include "utilities.php";
?>

<!DOCTYPE html>
<html>
<head>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css" >
	<script type="text/javascript" src="./js/vector.js"></script>
	<script type="text/javascript" src="./js/matrix.js"></script>
	<script type="text/javascript" src="./js/queue.js"></script>
	<script type="text/javascript" src="./js/game.js"></script>
	<script type="text/javascript" src="./js/sketcher.js"></script>
	<script type="text/javascript" src="./js/input.js"></script>
	<script type="text/javascript" src="./js/index.js"></script>
</head>
<body id="body" onLoad="start()">

<?php printHeader("index", isset($_SESSION['nickname'])); ?>

<main class="xWrapper">
   <div id = "gameField" class="xWrapper"></div>
</main>

<?php include "footer.php" ?>

</body>
</html>