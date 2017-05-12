<?php
require '../config.php';
require ROOT_DIR . '/utilities/php/utilities.php';
require ROOT_DIR . '/utilities/php/database.php';
require ROOT_DIR . '/utilities/php/jsonResponse.php';
$email = isset($_GET['email']) ? $_GET['email'] : null;
$jsonResponse = new JsonResponse();
$jsonResponse->setElement('emailExists', false);
if(isNull($email)){
   $jsonResponse->setOperationSuccess(false);
   $jsonResponse->setErrorMessage('Email field empty');
   echo $jsonResponse->getJsonEncoding();
   exit();
}

$db = new Database(connectToDB(ROOT_DIR . '/utilities/php/db.conf'));
try {
   $result = $db->emailExists($email);
} catch(PDOException $e) {
   $result = false;
   echo $e->getMessage() . PHP_EOL;
}

$jsonResponse->setOperationSuccess(true);
$jsonResponse->setErrorMessage(null);
if($result['emailExists'])
   $jsonResponse->setElement('emailExists', true);
else
   $jsonResponse->setElement('emailExists', false);

echo $jsonResponse->getJsonEncoding();
?>