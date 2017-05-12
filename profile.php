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
      0 => "That's your current email",
   );
   $passwordErrors = array(
      0 => "Something went wrong",
   );
   $levelErrors = array(
      0 => "Somebody alredy played that level, therefore it can't be deleted",
   );

   $passwordErrorNumber = isset($_GET['passwordError']) ? $_GET['passwordError'] : null;
   if(isNull($passwordErrorNumber))
      $passwordErrorMessage = '';
   else if(isset($passwordErrors[$passwordErrorNumber]))
      $passwordErrorMessage = '<p>' . $passwordErrors[$passwordErrorNumber] . '</p>';
   else
      $passwordErrorMessage = '';

   $emailErrorNumber = isset($_GET['emailError']) ? $_GET['emailError'] : null;
   if(isNull($emailErrorNumber))
      $emailErrorMessage = '';
   else if(isset($emailErrors[$emailErrorNumber]))
      $emailErrorMessage = '<p>' . $emailErrors[$emailErrorNumber] . '</p>';
   else
      $emailErrorMessage = '';

   $levelErrorNumber = isset($_GET['levelError']) ? $_GET['levelError'] : null;
   if(isNull($levelErrorNumber))
      $levelErrorMessage = '';
   else if(isset($levelErrors[$levelErrorNumber]))
      $levelErrorMessage = '<p>' . $levelErrors[$levelErrorNumber] . '</p>';
   else
      $levelErrorMessage = '';
?>

<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>Your profile</title>
   <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
   <link rel="stylesheet" href="./resources/css/main.css" >
   <script type="text/javascript" src="./utilities/js/ajaxRequest.js"></script>
   <script type="text/javascript" src="./resources/js/profile.js"></script>
</head>
<body>
   <?php
      printHeader('profile', $nickname);
      echo '<h1>Levels created</h1>';
      printLevelsCreatedBy($nickname, $levels);
      echo $levelErrorMessage;
      echo '<h1>Levels completed</h1>';
      printUserScores($nickname, $scores);
   ?>
   <form action="updateEmail.php" method="post">
      <fieldset>
         <legend>Update your email</legend>
         <label>Email <input type="email" name="email" id="email" required value="<?php echo htmlspecialchars($user['email']); ?>"></label>
         <input type="submit" value="submit" id="updateEmail">
      </fieldset>
   </form>
      <?php echo $emailErrorMessage; ?>
   <form action="updatePassword.php" method="post">
      <fieldset>
         <legend>Update your password</legend>
         <label>Password <input type="password" name="password" id="password" required></label>
         <input type="submit" value="submit" id="updatePassword">
      </fieldset>
   </form>
      <?php echo $passwordErrorMessage; ?>
<?php include 'footer.php' ?>
</body>
</html>