<?php
	session_start();

	$creatorNickname = $_GET['creatorNickname'];
	$levelName = $_GET['levelName'];

	if(!isset($creatorNickname) || !isset($levelName)) {
      header("Location: /PWEB/index.php");
      exit();
	}

	include "utilities.php";
	include "database.php";
	$db = new Database(connectToDB());
	try {
		$result = $db->getLevel($levelName, $creatorNickname);
	} catch(Exception $e) {
		echo $e . PHP_EOL;
	}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Level: <?php echo $levelName ?></title>
	<meta charset="utf-8">
  	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="./css/main.css" >
	<script type="text/javascript" src="./js/vector.js"></script>
	<script type="text/javascript" src="./js/matrix.js"></script>
	<script type="text/javascript" src="./js/queue.js"></script>
	<script type="text/javascript" src="./js/game.js"></script>
	<script type="text/javascript" src="./js/sketcher.js"></script>
	<script type="text/javascript" src="./js/input.js"></script>
	<script type="text/javascript" src="./js/ajaxRequest.js"></script>
	<script type="text/javascript" src="./js/level.js"></script>
</head>
<body id="body" onLoad="start()">

<?php
	printHeader("", isset($_SESSION['nickname']) ? $_SESSION['nickname'] : false);
	echo '<input type="hidden" id="levelObject" value="' . htmlspecialchars($result['levelObject']) . '">';
?>

<main class="yWrapper">
	<h1> <?php
		echo 'Level: <span id="levelName">' . $levelName . '</span>. ';
		echo 'Created by <span id="levelCreatorNickname">' . $creatorNickname . '</span>'; ?>
	</h1>
   <div id = "gameField" class="xWrapper"></div>
</main>

<?php include "footer.php" ?>

</body>
</html>