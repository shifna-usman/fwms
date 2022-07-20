<?php
session_start();
require_once("db.php");
$phone = $_POST['phone'];
$password = $_POST['password'];

if($phone == "" || $password == ""){
    echo(json_encode(array("result" => false, "error" => "required field missing")));
    die();
}

$password = md5($password);

$sql = "SELECT * FROM users WHERE phone_number = '$phone'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if($row["password"] == $password){
            $_SESSION["user_id"] = $row["id"];
            echo(json_encode(array("result" => true)));
        }
        else{
            echo(json_encode(array("result" => false, "error" => "password not match")));
        }
    }
}
else {
    echo(json_encode(array("result" => false, "error" => "user not found")));
}

?>