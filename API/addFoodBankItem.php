<?php
session_start();
require_once('./db.php');
$name = $_POST['name'];
$phone = $_POST['phone'];
$adPhone = $_POST['adPhone'];
$address = $_POST['address'];
$landmark = $_POST['landmark'];
$notes = $_POST['notes'];
$foodItems = $_POST['foodItems'];
$created_at = time();
$userId = $_SESSION["user_id"];

$sql = "INSERT INTO food_bank (user_id, creater_name, phone_number,additional_phone,address,created_at,landmark,notes)
VALUES ('$userId','$name', '$phone', '$adPhone', '$address','$created_at', '$landmark','$notes')";


if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    if(count($foodItems) > 0){
        $itemsql="";
        foreach($foodItems as $key => $item){
            $itemName = $item['itemName'];
            $itemQuantity = $item['itemQuantity'];
            $quantityType = $item['quantityType'];
            $itemsql .= "INSERT INTO food_item_list (food_bank_id, name, quantity,unit)
                    VALUES ('$last_id','$itemName','$itemQuantity','$quantityType');";
        }

        if($itemsql != ""){
            if ($conn->multi_query($itemsql) === TRUE) {
                echo(json_encode(array("result" => true)));
            }
            else{
                echo(json_encode(array("result" => false)));
            }
        }
    }
}else{
    echo(json_encode(array("result" => false)));
}

?>