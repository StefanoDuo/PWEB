<?php
   include 'utilities.php';
   include 'database.php';
	session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
   $id = isset($_GET['id']) ? $_GET['id'] : null;
	if(isNull($id)) {
      header('Location: /PWEB/index.php');
      exit();
   }

	$db = new Database(connectToDB());
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
	
	$levelTitle = 'Level: <span id="levelName">' . htmlspecialchars($levelName) . '</span>. ' .
		'Created by <span id="levelCreatorNickname">' . htmlspecialchars($creatorNickname) . '</span>';
	$levelObject = '<input type="hidden" id="levelObject" value="' . urlencode($levelObject) . '">';
	$replay = '<input type="hidden" id="replay" value="' . urlencode($replay['replay']) . '">';
?>

<!DOCTYPE html>
<html>
<head>
	<title>Level: <?php echo htmlspecialchars($levelName); ?></title>
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
	printHeader('', $nickname);
	echo $levelObject;
	echo $replay;
?>

<main class="xWrapper">
   <div class="yWrapper">
		<h1><?php echo $levelTitle ?></h1>
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

<?php include 'footer.php' ?>

</body>
</html>