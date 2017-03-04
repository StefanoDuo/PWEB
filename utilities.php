<?php
function printHeader($currentPage, $nickname) {
	$index = $currentPage === 'index' ? 'active' : '';
	$workshop = $currentPage === 'workshop' ? 'active' : '';
	$logout = $currentPage === 'logout' ? 'active' : '';
	$login = $currentPage === 'login' ? 'active' : '';
	$levels = $currentPage === 'levels' ? 'active' : '';
	$profile = $currentPage === 'profile' ? 'active' : '';
	echo '<header>';
	echo '<nav>';
   	echo '<ul class="xWrapper navBar blue">';
    echo 	'<li><a href="index.php" class="' . $index . '">Home</a></li>';
    if($nickname)
    	echo '<li><a href="workshop.php" class="' . $workshop . '">Workshop</a></li>';
    if($nickname)
    	echo '<li><a href="logout.php" class="' . $logout . '">LogOut</a></li>';
    else
    	echo '<li><a href="login.php" class="' . $login . '">LogIn / SignUp</a></li>';
    echo 	'<li><a href="levels.php" class="' . $levels . '">Levels</a></li>';
    if($nickname)
        echo '<li><a href="profile.php" id="nickname" class="' . $profile . '">' . $nickname . '</a></li>';
    echo '</ul>';
	echo '</nav>';
	echo '</header>';
}

function printLevelList($db) {
    $result = $db->getLevels();
    echo '<ul>';
    foreach ($result as $key => $value) {
        echo '<li>Level name: <a href="level.php?creatorNickname=' . $value['creatorNickname'] .'&levelName=' . $value['name'] .'">';
        echo $value['name'] . '</a> | Creator: ' . $value['creatorNickname'] . '</li>';
    }
    echo '</ul>';
}

function printLevelCreatedBy($creatorNickname, $db) {
    $result = $db->getLevelsCreatedBy($creatorNickname);
    echo '<ul>';
    foreach ($result as $key => $value) {
        echo '<li>Level name: <a href="level.php?creatorNickname=' . $creatorNickname .'&levelName=' . $value['name'] . '">' . $value['name'] . '</a></li>';
    }
    echo '</ul>';
}

function printScoresObtainedBy($playerNickname, $db) {
    $result = $db->getScoresObtainedBy($playerNickname);
    echo '<ul>';
    foreach ($result as $key => $value) {
        echo '<li>Level name: <a href="level.php?creatorNickname=' . $value['creatorNickname'];
        echo '&levelName=' . $value['levelName'] . '">' . $value['levelName'] . '</a> | Creator: ' . $value['creatorNickname'];
        echo '| Score: <a href="replay.php?creatorNickname='  . $value['creatorNickname'] . '&levelName=' . $value['levelName'] . '&playerNickname=' . $playerNickname . '">' . $value['score'] . '</a></li>';
    }
    echo '</ul>';
}
?>