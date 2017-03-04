<?php
	session_start();

	$creatorNickname = $_GET['creatorNickname'];
	$levelName = $_GET['levelName'];
	$playerNickname = $_GET['playerNickname'];

	if(!isset($creatorNickname) || !isset($levelName) || !isset($playerNickname)) {
      header("Location: /PWEB/index.php");
      exit();
	}

	include "utilities.php";
	include "database.php";
	$db = new Database(connectToDB());
	try {
		$levelObject = $db->getLevel($levelName, $creatorNickname)['levelObject'];
		$replay = $db->getReplay($playerNickname, $creatorNickname, $levelName)['replay'];
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
	<script type="text/javascript" src="./js/replay.js"></script>
</head>
<body id="body" onLoad="start()">

<?php
	printHeader("", isset($_SESSION['nickname']) ? $_SESSION['nickname'] : false);
	echo '<input type="hidden" id="levelObject" value="' . htmlspecialchars($levelObject) . '">';
	echo '<input type="hidden" id="replay" value="' . htmlspecialchars($replay) . '">';
?>

<main class="xWrapper">
	<div class="">
		<h1>
			<?php 
				echo 'Level: <span id="levelName">' . $levelName . '</span>. ';
				echo 'Created by <span id="levelCreatorNickname">' . $creatorNickname . '</span>';
			?>
		</h1>
	   <div id = "gameField" class="xWrapper"></div>
   </div>
   <div class="yWrapper">
   	<input type="range" min=100 max=500 id="replaySpeed">
   	<a id="start" class="button gray">Start</a>
   	<a id="pause" class="button gray">Pause</a>
   	<a id="previous" class="button gray">Previous</a>
   	<a id="next" class="button gray">Next</a>
	</div>
</main>

<?php include "footer.php" ?>

</body>
</html>