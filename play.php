<?php
	session_start();
   include 'utilities.php';
   include 'database.php';
	$creatorNickname = isset($_GET['creatorNickname']) ? $_GET['creatorNickname'] : null;
	$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
	$playerNickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
	if(isNull($creatorNickname) || isNull($levelName)) {
      header('Location: /PWEB/index.php');
      exit();
	}

	$db = new Database(connectToDB());
	try {
		$currentLevel = $db->getLevel($levelName, $creatorNickname);
	} catch(Exception $e) {
		$currentLevel = null;
		echo $e . PHP_EOL;
	}
	try {
		$nextLevel = $db->getUnbeatedLevel($playerNickname, $levelName, $creatorNickname);
	} catch(Exception $e) {
		$nextLevel = null;
		echo $e . PHP_EOL;
	}
	if(is_null($nextLevel))
		$nextButton = '<button class="button gray" disabled>You\'ve beaten all levels</button>';
	else {
		$nextButton = '<a class="button gray" href="play.php?creatorNickname=' . urlencode($nextLevel['creatorNickname']);
		$nextButton .= '&levelName=' . $nextLevel['name'] .'">Next Level</a>';
	}
	$levelTitle = 'Level: <span id="levelName">' . $levelName . '</span>. ' .
		'Created by <span id="levelCreatorNickname">' . $creatorNickname . '</span>';
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
	<script type="text/javascript" src="./js/backgroundSketcher.js"></script>
	<script type="text/javascript" src="./js/input.js"></script>
	<script type="text/javascript" src="./js/ajaxRequest.js"></script>
	<script type="text/javascript" src="./js/localSaves.js"></script>
	<script type="text/javascript" src="./js/play.js"></script>
</head>
<body id="body" onLoad="start()">

<?php
	printHeader('', $playerNickname);
	echo '<input type="hidden" id="levelObject" value="' . urlencode($currentLevel['levelObject']) . '">';
?>

<main class="yWrapper">
	<div class="xWrapper">
		<ul id="undo"></ul>
		<div class="yWrapper">
			<h1><?php echo $levelTitle?></h1>
			<div id="gameField" class="xWrapper relative">
				<div class="absolute hidden shadowDrop yWrapper" id="shadowDrop">
					<h2>Congratulations</h2>
					<p>Score <span id="score2">0</span></p>
					<div class="xWrapper">
						<?php echo $nextButton ?>
						<button class="button gray" id="playAgain">Play Again</button>
					</div>
				</div>
			</div>
			<p id="score">0</p>
		</div>
		<ul id="redo"></ul>
	</div>
</main>

<?php include 'footer.php' ?>

</body>
</html>