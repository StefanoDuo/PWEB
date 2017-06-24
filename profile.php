<?php
   require 'config.php';
   require ROOT_DIR . '/utilities/php/utilities.php';
   require ROOT_DIR . '/utilities/php/database.php';
   session_start();
   $nickname = isset($_SESSION['nickname']) ? $_SESSION['nickname'] : null;
   if(is_null($nickname)) {
      header("Location: /PWEB/index.php");
      exit();
   }

   $db = new Database(connectToDB(ROOT_DIR . '/utilities/php/db.conf'));
   try {
      $levels = $db->getLevelsCreatedBy($nickname);
   } catch(PDOException $e) {
      $levels = null;
      echo $e->getMessage() . PHP_EOL;
   }
   try {
      $scores = $db->getUserScores($nickname);
   } catch(PDOException $e) {
      $scores = null;
      echo $e->getMessage() . PHP_EOL;
   }
   try {
      $user = $db->getUser($nickname);
   } catch(PDOException $e) {
      $user = null;
      echo $e->getMessage() . PHP_EOL;
   }

   $emailErrors = array(
      0 => "That's your current email.",
   );
   $passwordErrors = array(
      0 => "Something went wrong.",
   );
   $levelErrors = array(
      0 => "Somebody alredy played that level, therefore it can't be deleted.",
   );

   $passwordErrorNumber = isset($_GET['passwordError']) ? $_GET['passwordError'] : null;
   if(isNull($passwordErrorNumber))
      $passwordErrorMessage = '';
   else if(isset($passwordErrors[$passwordErrorNumber]))
      $passwordErrorMessage = '<span class="errorMessage">' . $passwordErrors[$passwordErrorNumber] . '</span>';
   else
      $passwordErrorMessage = '';

   $emailErrorNumber = isset($_GET['emailError']) ? $_GET['emailError'] : null;
   if(isNull($emailErrorNumber))
      $emailErrorMessage = '';
   else if(isset($emailErrors[$emailErrorNumber]))
      $emailErrorMessage = '<span class="errorMessage" id="emailErrorMessage">' . $emailErrors[$emailErrorNumber] . '</span>';
   else
      $emailErrorMessage = '';

   $levelErrorNumber = isset($_GET['levelError']) ? $_GET['levelError'] : null;
   if(isNull($levelErrorNumber))
      $levelErrorMessage = '';
   else if(isset($levelErrors[$levelErrorNumber]))
      $levelErrorMessage = '<span class="errorMessage">' . $levelErrors[$levelErrorNumber] . '</span>';
   else
      $levelErrorMessage = '';
?>

<!DOCTYPE html>
<html lang="en-US">
<head>
   <meta charset="utf-8">
   <title>The Maze: your profile</title>
   <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
   <link rel="stylesheet" href="./resources/css/main.css" >
   <script type="text/javascript" src="./utilities/js/ajaxRequest.js"></script>
   <script type="text/javascript" src="./resources/js/profile.js"></script>
</head>
<body onload="start()">
   <?php
      printHeader('profile', $nickname);
      echo '<main>';
      echo '<div class="card">';
      echo '<h1>Your levels</h1>';
      printLevelsCreatedBy($nickname, $levels);
      echo $levelErrorMessage;
      echo '</div>';
      echo '<div class="card">';
      echo '<h1>Levels completed</h1>';
      printUserScores($nickname, $scores);
      echo '</div>';
   ?>
   <div class="card" id="emailCard">
      <h1>Update your email</h1>
      <form action="updateEmail.php" method="post">
         <input type="email" name="email" id="email" required placeholder="New email">
         <button type="submit" value="submit" id="updateEmail" class="raisedButton secondaryDark">Submit</button>
      </form>
      <?php echo $emailErrorMessage; ?>
   </div>

   <div class="card">
      <h1>Update your password</h1>
      <form action="updatePassword.php" method="post">
         <input type="password" name="password" id="password" required placeholder="New password">
         <button type="submit" value="submit" id="updatePassword" class="raisedButton secondaryDark">Submit</button>
      </form>
      <?php echo $passwordErrorMessage; ?>
   </div>
   </main>
<?php include 'footer.php' ?>
</body>
</html>