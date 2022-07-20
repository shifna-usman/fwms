<?php

require_once("db.php");

$name = $_POST['name'];
$phone = $_POST['phone'];
$secPhone = $_POST['secPhone'];
$password = $_POST['password'];

if($name == "" || $phone == "" || $password == ""){
    echo(json_encode(array("result" => false, "error" => "required field missing")));
    die();
}

$existingquery = "SELECT phone_number FROM users WHERE phone_number = $phone";
$result = $conn->query($existingquery);
if($result ->num_rows)
{
  echo(json_encode(array("result" => false, "error" => "already_exist")));
  die();
}

$password = md5($password);

$sql = "INSERT INTO users (name,phone_number,secondary_phone_number,password) VALUES ('$name','$phone','$secPhone','$password')";
if ($conn->query($sql) === TRUE) {
    echo(json_encode(array("result" => true)));
  } else {
    echo(json_encode(array("result" => false, "error" => $conn->error)));
  }


?>