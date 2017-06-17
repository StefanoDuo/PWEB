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
		<p><span class="player box inline"></span> You're a cute little red cube.</p>
		<p>Your quest is to push this <span class="ball box inline"></span> yellow cube into the <span class="hole box inline"></span> green one.</p>
		<p>Every action increases your score therefore think carefully before acting.</p>
	</div>

	<div class="card">
		<h1>Controls</h1>
		<p>Use <kbd class="kbd">W</kbd><kbd class="kbd">A</kbd><kbd class="kbd">S</kbd><kbd class="kbd">D</kbd> to move.</p>
		<p><kbd class="kbd">Q</kbd> undoes your last move.</p>
		<p>Until you make a new move you can redo the action you've undone with <kbd class="kbd">E</kbd>.</p>
		<p><kbd class="kbd">R</kbd> resets the platform to its starting configuration.</p>
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