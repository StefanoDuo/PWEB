<?php
   $email = isset($_GET['email']) ? $_GET['email'] : null;
   if(is_null($email)){
      header("Location: /PWEB/index.php");
      exit();
   }
   include "database.php";
   $db = new Database(connectToDB());
   try {
      $result = $db->emailExists($email);
   } catch(Exception $e) {
      $result = false;
      echo $e . PHP_EOL;
   }

   if(isset($result['emailExists']))
      echo '{"emailExists":true}';
   else
      echo '{"emailExists":false}';

?>