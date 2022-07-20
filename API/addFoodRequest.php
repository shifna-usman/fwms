<?php
session_start();
require_once('./db.php');
$name = $_POST['name'];
$phone = $_POST['phone'];
$adPhone = $_POST['adPhone'];
$address = $_POST['address'];
$landmark = $_POST['landmark'];
$notes = $_POST['notes'];
$requirements = $_POST['requirements'];
$created_at = time();
$userId = $_SESSION["user_id"];

$sql = "INSERT INTO food_request (user_id, creater_name, phone_number,additional_phone,address,created_at,landmark,notes,requirement)
VALUES ('$userId','$name', '$phone', '$adPhone', '$address','$created_at', '$landmark','$notes','$requirements')";


if ($conn->query($sql) === TRUE) {
    echo(json_encode(array("result" => true)));
}
else{
    echo(json_encode(array("result" => false)));
}