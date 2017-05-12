<?php
include 'utilities.php';
include 'database.php';
include 'jsonResponse.php';
$jsonResponse = new JsonResponse();
$jsonResponse->setElement('nicknameExists', null);
$nickname = isset($_GET['nickname']) ? $_GET['nickname'] : null;
if(isNull($nickname)){
   $jsonResponse->setOperationSuccess(false);
   $jsonResponse->setErrorMessage('Nickname field empty');
   echo $jsonResponse->getJsonEncoding();
   exit();
}

$db = new Database(connectToDB());
try {
   $result = $db->getUser($nickname);
} catch(PDOException $e) {
   $result = null;
   echo $e->getMessage() . PHP_EOL;
}

$jsonResponse->setOperationSuccess(true);
$jsonResponse->setErrorMessage(null);
$jsonResponse->setElement('nicknameExists', (bool)$result);
echo $jsonResponse->getJsonEncoding();
?>