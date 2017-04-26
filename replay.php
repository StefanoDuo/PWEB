<?php
	session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
	$creatorNickname = isset($_GET['creatorNickname']) ? $_GET['creatorNickname'] : null;
	$levelName = isset($_GET['levelName']) ? $_GET['levelName'] : null;
	$playerNickname = isset($_GET['playerNickname']) ? $_GET['playerNickname'] : null;
	$stamp = isset($_GET['stamp']) ? $_GET['stamp'] : null;
	if(is_null($creatorNickname) || is_null($levelName) || is_null($playerNickname) || is_null($stamp)) {
      header("Location: /PWEB/index.php");
      exit();
   }

	include "utilities.php";
	include "database.php";
	$db = new Database(connectToDB());
   try {
      $levelObject = $db->getLevel($levelName, $creatorNickname)['levelObject'];
   } catch(Exception $e) {
      $levelObject = null;
      echo $e . PHP_EOL;
   }
	try {
		$replay = $db->getReplay($playerNickname, $stamp)['replay'];
	} catch(Exception $e) {
      $replay = null;
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
	<script type="text/javascript" src="./js/backgroundSketcher.js"></script>
	<script type="text/javascript" src="./js/input.js"></script>
	<script type="text/javascript" src="./js/ajaxRequest.js"></script>
	<script type="text/javascript" src="./js/replay.js"></script>
</head>
<body id="body" onLoad="start()">

<?php
	printHeader("", $nickname);
	echo '<input type="hidden" id="levelObject" value="' . urlencode($levelObject) . '">';
	echo '<input type="hidden" id="replay" value="' . urlencode($replay) . '">';
?>

<main class="xWrapper">
   <div class="yWrapper">
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
      <button id="start" class="button gray">Start</button>
      <button id="pause" class="button gray" disabled>Pause</button>
      <button id="reset" class="button gray" disabled>Reset</button>
      <button id="previous" class="button gray" disabled>Previous</button>
      <button id="next" class="button gray">Next</button>
   </div>
   
</main>

<?php include "footer.php" ?>

</body>
</html>