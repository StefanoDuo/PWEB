<?php
   require 'config.php';
   require ROOT_DIR . '/utilities/php/utilities.php';
	session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
?>

<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>placeholder, a game</title>
   <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
	<link rel="stylesheet" href="./resources/css/main.css" >
</head>
<body>

<?php printHeader("index", $nickname); ?>

<main>
	<div class="card">
		<h1>Objective</h1>
		<p><span class="playerTutorial inline"></span> That's you, an adventurer in search of fortune.</p>
		<p>Your quest is to push this <span class="ballTutorial box inline"></span> chest full of treasures into the <span class="holeTutorial inline"></span> hole which leads out of the level.</p>
		<p>Be careful once you push the chest it will travel until it hits a <span class="rockTutorial inline"></span> rock or the level walls.</p>
		<p>Every action increases your score, and the lower the score the better, therefore think carefully before acting.</p>
	</div>

	<div class="card">
		<h1>Controls</h1>
		<p>Use <kbd class="kbd">W</kbd><kbd class="kbd">A</kbd><kbd class="kbd">S</kbd><kbd class="kbd">D</kbd> to move.</p>
		<p><kbd class="kbd">Q</kbd> undoes your last move, you can keep going back until you've actions to undo.</p>
		<p>Until you make a new move you can redo the actions you've undone with <kbd class="kbd">E</kbd>.</p>
		<p>To help you keep track of your previous moves there can be up to 5 arrows representing the direction you character
			will move if you press <kbd class="kbd">Q</kbd>, the same goes for the redoable actions.</p>
		<p>The arrow at the top is the first move that will be undone.</p>
		<p>If the arrow has an orange background then the ball will move instead of your character.</p>
		<p><kbd class="kbd">R</kbd> resets the level to its starting configuration.</p>
	</div>

	<div class="card">
		<h1>Never lose your progress</h1>
		<p>Don't be afraid to take a break and come back later, the game automatically remembers where you left.</p>
	</div>

	<div class="card">
		<h1>Register and sign in</h1>
		<p>Once you are logged in every time you beat a level your score and replay will be visible to everyone.
			If you aren't logged in the score and replay are first saved locally and then uploaded after you log in.</p>
		<p>You will also have access to the workshop where you can create new levels.</p>
	</div>

</main>

<?php include 'footer.php' ?>

</body>
</html>