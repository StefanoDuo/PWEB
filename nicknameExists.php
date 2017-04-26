<?php
   $nickname = isset($_GET['nickname']) ? $_GET['nickname'] : null;
   if(is_null($nickname)){
      header("Location: /PWEB/index.php");
      exit();
   }
   include "database.php";
   $db = new Database(connectToDB());
   try {
      $result = $db->nicknameExists($nickname);
   } catch(Exception $e) {
      $result = null;
      echo $e . PHP_EOL;
   }

   if(isset($result['nicknameExists']))
      echo '{"nicknameExists":true}';
   else
      echo '{"nicknameExists":false}';
?>