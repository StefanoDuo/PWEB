<?php
function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

function getDBConnectionInfo($fileLocation) {
    $credentials = array();
    $configString = file_get_contents($fileLocation);
    $lines = explode(PHP_EOL, $configString);
    foreach($lines as $value) {
        if(strlen($value) > 0) {
            $option = explode('=', $value);
            $credentials[$option[0]] = $option[1];
        }
    }
    return $credentials;
}

function connectToDB($fileLocation) {
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
	$classes[$currentPage] = 'secondaryDark';
	echo '<header>';
	echo '<nav class="primary">';
   	echo '<ul class="xWrapper navBar">';
    echo 	'<li><a href="index.php" class="' . $classes['index'] . '">Home</a></li>';
    if($nickname)
    	echo '<li><a href="workshop.php" class="' . $classes['workshop'] . '">Workshop</a></li>';
    if($nickname)
    	echo '<li><a href="logout.php" class="' . $classes['logout'] . '">Logout</a></li>';
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
        echo '<li class="card">';
            echo '<h1>' . htmlspecialchars($value['name']) . '</h1>';
            echo '<p>Created by ' . htmlspecialchars($value['creatorNickname']) . '</p>';
            echo '<a href="play.php?creatorNickname=' . urlencode($value['creatorNickname']) . '&levelName='
                . urlencode($value['name']) .'" class="flatButton primaryDarkText">Play</a>';
            echo '<button class="flatButton" id="' . htmlspecialchars($value['creatorNickname']) .'-'
                . htmlspecialchars($value['name']) . '">Show scores</button>';
        echo '</li>';
    }
    echo '</ul>';
}

function printLevelsCreatedBy($creatorNickname, $levels) {
    echo '<table>';
    echo '<thead>';
    echo '<tr>';
    echo '<th>Level</th>';
    echo '<th class="centerText">Delete</th>';
    echo '<th></th>';
    echo '<th></th>';
    echo '</tr>';
    echo '</thead>';
    echo '<tbody>';
    foreach ($levels as $key => $value) {
        echo '<form action="deleteLevel.php" method="post">';
        echo '<tr>';
            echo '<td>' . htmlspecialchars($value['name']) . '</td>';
            
                echo '<td><input type="checkbox" name="levelName" required value="' . $value['name'] . '"></td>';
                echo '<td><button type="submit" value="submit" name="deleteLevel" class="flatButton">Delete</button></td>';
            echo '<td><a href="play.php?creatorNickname=' . urlencode($creatorNickname) . '&levelName=';
            echo urlencode($value['name']) . '" class="flatButton primaryDarkText">Play</a></td>';
        echo '</tr>';
        echo '</form>';
    }
    echo '</tbody>';
    echo '</table>';
}

function printUserScores($playerNickname, $scores) {
    echo '<table>';
    echo '<thead>';
    echo '<tr>';
    echo '<th>Level</th>';
    echo '<th>Creator</th>';
    echo '<th>Score</th>';
    echo '<th></th>';
    echo '<th></th>';
    echo '</tr>';
    echo '</thead>';
    echo '<tbody>';
    foreach ($scores as $key => $value) {
        echo '<tr>';
            echo '<td>' . htmlspecialchars($value['levelName']) . '</td>';
            echo '<td>' . htmlspecialchars($value['creatorNickname']) . '</td>';
            echo '<td>' . htmlspecialchars($value['score']) . '</td>';
            echo '<td><a href="replay.php?id=' . urlencode($value['id']) . '" class="flatButton">Replay</a></td>';
            echo '<td><a href="play.php?creatorNickname=' . urlencode($value['creatorNickname']) . '&levelName=';
            echo urlencode($value['levelName']) . '" class="flatButton primaryDarkText">Play</a></td>';
        echo '</tr>';
    }
    echo '</tbody>';
    echo '</table>';
}
?>