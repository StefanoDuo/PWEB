<?php
include 'utilities.php';
include 'database.php';

$pdo = new PDO('mysql:host=localhost;dbname=PWEB;charset=utf8mb4', 'root', '');
$db = new Database($pdo);
$db->getLevels();
?>