<?php
function getDBConnectionInfo($fileLocation) {
    $credentials = array();
    $configString = file_get_contents($fileLocation);
    $lines = explode(PHP_EOL, $configString);
    foreach($lines as $value) {
        $option = explode('=', $value);
        $credentials[$option[0]] = $option[1];
    }
    return $credentials;
}

function getDefaultResponse() {
    return array(
       'success' => false,
       'errorMessage' => 'Something went wrong',
       'scores' => null,
       'creatorNickname' => null,
       'levelName' => null
    );
}

function connectToDB() {
    $fileLocation = 'db.conf';
    $credentials = getDBConnectionInfo($fileLocation);
    $hostname = $credentials['hostname'];
    $database = $credentials['database'];
    $pdo = new PDO("mysql:dbname=$database;host=$hostname", $credentials['user'], $credentials['password']);
    return $pdo;
}

function isNull($variable, $checkEmptyString = true) {
    return is_null($variable) || ($checkEmptyString && $variable === '');
}

function printHeader($currentPage, $nickname) {
    $classes = array(
        'index' => '',
        'workshop' => '',
        'logout' => '',
        'login' => '',
        'levels' => '',
        'profile' => ''
    );
	$classes[$currentPage] = 'active';
	echo '<header>';
	echo '<nav>';
   	echo '<ul class="xWrapper navBar blue">';
    echo 	'<li><a href="index.php" class="' . $classes['index'] . '">Home</a></li>';
    if($nickname)
    	echo '<li><a href="workshop.php" class="' . $classes['workshop'] . '">Workshop</a></li>';
    if($nickname)
    	echo '<li><a href="logout.php" class="' . $classes['logout'] . '">LogOut</a></li>';
    else
    	echo '<li><a href="login.php" class="' . $classes['login'] . '">LogIn / SignUp</a></li>';
    echo 	'<li><a href="levels.php" class="' . $classes['levels'] . '">Levels</a></li>';
    if($nickname)
        echo '<li><a href="profile.php" id="nickname" class="' . $classes['profile'] . '">' . htmlspecialchars($nickname) . '</a></li>';
    echo '</ul>';
	echo '</nav>';
	echo '</header>';
}

function printLevelsList($levels) {
    echo '<ul>';
    foreach ($levels as $key => $value) {
        echo '<li>Level name: <a href="play.php?creatorNickname=' . urlencode($value['creatorNickname']) .'&levelName=' . urlencode($value['name']) .'">';
        echo htmlspecialchars($value['name']) . '</a> | Creator: ' . htmlspecialchars($value['creatorNickname']);
        echo ' <button class="button gray" id="' . htmlspecialchars($value['creatorNickname']) .'-' . htmlspecialchars($value['name']) . '">Show scores</button></li>';
    }
    echo '</ul>';
}

function printLevelsCreatedBy($creatorNickname, $levels) {
    echo '<ul>';
    foreach ($levels as $key => $value) {
        echo '<li>Level name: <a href="play.php?creatorNickname=' . urlencode($creatorNickname);
        echo '&levelName=' . urlencode($value['name']) . '">' . htmlspecialchars($value['name']) . '</a> | ';
        echo '<a href="deleteLevel.php?levelName=' . urlencode($value['name']) . '&creatorNickname=' . urlencode($creatorNickname) . '">Delete</a></li>';
    }
    echo '</ul>';
}

function printUserScores($playerNickname, $scores) {
    echo '<ul>';
    foreach ($scores as $key => $value) {
        echo '<li>Level name: <a href="play.php?creatorNickname=' . urlencode($value['creatorNickname']);
        echo '&levelName=' . urlencode($value['levelName']) . '">' . htmlspecialchars($value['levelName']);
        echo '</a> | Creator: ' . htmlspecialchars($value['creatorNickname']);
        echo '| Score: <a href="replay.php?creatorNickname=' . urlencode($value['creatorNickname']);
        echo '&levelName=' . urlencode($value['levelName']) . '&playerNickname=' . urlencode($playerNickname);
        echo '&stamp=' . urlencode($value['stamp']) . '">' . $value['score'] . '</a></li>';
    }
    echo '</ul>';
}
?>