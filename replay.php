<?php
   require 'config.php';
   require ROOT_DIR . '/utilities/php/utilities.php';
   require ROOT_DIR . '/utilities/php/database.php';
	session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
   $id = isset($_GET['id']) ? $_GET['id'] : null;
	if(isNull($id)) {
      header('Location: ./index.php');
      exit();
   }

	$db = new Database(connectToDB(ROOT_DIR . '/utilities/php/db.conf'));
	try {
		$replay = $db->getReplay($id);
	} catch(PDOException $e) {
      $replay = null;
		echo $e->getMessage() . PHP_EOL;
	}
	$levelName = $replay['levelName'];
	$creatorNickname = $replay['creatorNickname'];
   try {
      $levelObject = $db->getLevel($levelName, $creatorNickname)['levelObject'];
   } catch(PDOException $e) {
      $levelObject = null;
      echo $e->getMessage() . PHP_EOL;
   }
	
	$levelTitle = '<span id="levelName">' . htmlspecialchars($levelName) . '</span>';
		'Created by <span id="levelCreatorNickname">' . htmlspecialchars($creatorNickname) . '</span>';
	$levelObject = '<input type="hidden" id="levelObject" value="' . urlencode($levelObject) . '">';
	$replay = '<input type="hidden" id="replay" value="' . urlencode($replay['replay']) . '">';
?>

<!DOCTYPE html>
<html lang="en-US">
<head>
	<title>The Maze: <?php echo htmlspecialchars($levelName); ?></title>
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
	<script type="text/javascript" src="./resources/js/replay.js"></script>
</head>
<body id="body" onLoad="start()">

<?php
	printHeader('', $nickname);
	echo $levelObject;
	echo $replay;
?>

<main class="xWrapper">
   <div class="yWrapper">
		<h1><?php echo $levelTitle ?></h1>
	   <div id = "gameField" class="xWrapper relative"></div>
   </div>
   <div class="yWrapper">
      <input type="range" min="100" max="500" step="100" id="replaySpeed">
      <button id="start" class="raisedButton secondaryDark">Start</button>
      <button id="pause" class="raisedButton secondaryDark" disabled>Pause</button>
      <button id="next" class="raisedButton secondaryDark">Next</button>
      <button id="previous" class="raisedButton secondaryDark" disabled>Back</button>
      <button id="reset" class="raisedButton secondaryDark" disabled>Reset</button>
   </div>
</main>

<?php include 'footer.php' ?>

</body>
</html>