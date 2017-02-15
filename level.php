<?php
	session_start();
	include "utilities.php";
	include "database.php";

	$db = new Database(connectToDB());

	$creatorNickname = $_GET['creatorNickname'];
	$levelName = $_GET['levelName'];

	if(!isset($creatorNickname) || !isset($levelName))
		echo 'ERROR. One of the value is undefined' . PHP_EOL;

	try {
		$result = $db->getLevel($levelName, $creatorNickname);
	} catch(Exception $e) {
		echo $e . PHP_EOL;
	}
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

<?php
	printHeader("", isset($_SESSION['nickname']));
	echo '<input type="hidden" id="levelObject" value="' . $result['levelObject'] . '">';
?>

<main class="xWrapper">
   <div id = "gameField" class="xWrapper"></div>
</main>

<?php include "footer.php" ?>

</body>
</html>