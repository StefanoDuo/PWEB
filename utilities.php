<?php
function printHeader($currentPage, $isSessionActive) {
	$index = $currentPage === 'index' ? 'active' : '';
	$levelCreation = $currentPage === 'levelCreation' ? 'active' : '';
	$logout = $currentPage === 'logout' ? 'active' : '';
	$login = $currentPage === 'login' ? 'active' : '';
	$levels = $currentPage === 'levels' ? 'active' : '';
	$leaderboard = $currentPage === 'leaderboard' ? 'active' : '';
	echo '<header>';
	echo '<nav>';
   	echo '<ul class="xWrapper navBar blue">';
    echo 	'<li><a href = "index.php" class="' . $index . '">Home</a></li>';
    if($isSessionActive)
    	echo '<li><a href = "levelCreation.php" class="' . $levelCreation . '">Workshop</a></li>';
    if($isSessionActive)
    	echo '<li><a href = "logout.php" class="' . $logout . '">LogOut</a></li>';
    else
    	echo '<li><a href = "login.php" class="' . $login . '">LogIn / SignUp</a></li>';
    echo 	'<li><a href = "levels.php" class="' . $levels . '">Levels</a></li>';
    echo 	'<li><a href = "leaderboard.php" class="' . $leaderboard . '">Leaderboard</a></li>';
    echo '</ul>';
	echo '</nav>';
	echo '</header>';
}

function printLevelList($db) {
    $result = $db->getLevels();
    echo "<ul>";
    foreach ($result as $key => $value) {
        echo '<li>Level name: <a href="level.php?creatorNickname=' . $value['creatorNickname'] .'&levelName=' . $value['name'] .'">';
        echo $value['name'] . "</a> | Creator: " . $value['creatorNickname'] . '</li>';
    }
    echo "</ul>";
}



?>