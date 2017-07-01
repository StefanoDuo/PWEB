<?php
   require 'config.php';
   require ROOT_DIR . '/utilities/php/utilities.php';
   require ROOT_DIR . '/utilities/php/database.php';
	session_start();
	$creatorNickname = isset($_GET['creatorNickname']) ? $_GET['creatorNickname'] : null;
	$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
	$playerNickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
	if(isNull($creatorNickname) || isNull($levelName)) {
      header('Location: ./index.php');
      exit();
	}

	$db = new Database(connectToDB(ROOT_DIR . '/utilities/php/db.conf'));
	try {
		$currentLevel = $db->getLevel($levelName, $creatorNickname);
	} catch(PDOException $e) {
		$currentLevel = null;
		echo $e->getMessage() . PHP_EOL;
	}
	try {
		$nextLevel = $db->getUnbeatedLevel($playerNickname, $levelName, $creatorNickname);
	} catch(PDOException $e) {
		$nextLevel = null;
		echo $e->getMessage() . PHP_EOL;
	}
	if(is_null($nextLevel))
		$nextButton = '<button class="raisedButton secondaryDark" disabled>You\'ve beaten all levels</button>';
	else {
		$nextButton = '<a class="raisedButton secondaryDark" href="play.php?creatorNickname=' . urlencode($nextLevel['creatorNickname']);
		$nextButton .= '&levelName=' . urlencode($nextLevel['name']) .'">Next Level</a>';
	}
	$levelTitle = '<span id="levelName">' . htmlspecialchars($levelName) . '</span>';
	$levelCreator = '<input type="hidden" id="levelCreatorNickname" value="' . htmlspecialchars($creatorNickname) . '">';
	$levelObject = '<input type="hidden" id="levelObject" value="' . urlencode($currentLevel['levelObject']) . '">';
?>

<!DOCTYPE html>
<html lang="en-US">
<head>
	<title>The Maze: <?php echo htmlspecialchars($levelName) ?></title>
	<meta charset="utf-8">
   <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
	<link rel="stylesheet" href="./resources/css/main.css" >
	<script type="text/javascript" src="./utilities/js/vector.js"></script>
	<script type="text/javascript" src="./utilities/js/matrix.js"></script>
	<script type="text/javascript" src="./utilities/js/queue.js"></script>
	<script type="text/javascript" src="./utilities/js/game.js"></script>
	<script type="text/javascript" src="./utilities/js/backgroundSketcher.js"></script>
	<script type="text/javascript" src="./utilities/js/foregroundSketcher.js"></script>
	<script type="text/javascript" src="./utilities/js/input.js"></script>
	<script type="text/javascript" src="./utilities/js/ajaxRequest.js"></script>
	<script type="text/javascript" src="./utilities/js/localSaves.js"></script>
	<script type="text/javascript" src="./resources/js/play.js"></script>
	<style type="text/css">
		#playField{
			background: url(./resources/img/<?php echo $randomBackground; ?>);
		}
	</style>
</head>
<body id="body" onLoad="start()">

<?php
	printHeader('', $playerNickname);
	echo $levelObject;
?>

<main class="yWrapper">
	<div class="xWrapper alignTop">
		<div class="yWrapper movesContainer">
			<p>UNDO</p>
			<ul id="undo" class="movesTracker"></ul>
		</div>
		<div class="yWrapper">
			<h1><?php echo $levelTitle?></h1>
			<?php echo $levelCreator ?>
			<div class="relative">
				<div id="gameField" class="xWrapper"></div>
				<div class="absolute hidden shadowDrop yWrapper" id="shadowDrop">
					<h2>Congratulations</h2>
					<div class="xWrapper">
						<?php echo $nextButton ?>
						<button class="raisedButton secondaryDark" id="playAgain">Play Again</button>
					</div>
				</div>
			</div>
			<p id="score" class="bigText">0</p>
		</div>
		<div class="yWrapper movesContainer">
			<p>REDO</p>
			<ul id="redo" class="movesTracker"></ul>
		</div>
	</div>
</main>

<?php include 'footer.php' ?>

</body>
</html>