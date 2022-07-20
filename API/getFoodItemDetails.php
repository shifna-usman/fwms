<?php

require_once('./db.php');
$id = $_GET['id'];

if($id == "" || $id == null){
    echo(json_encode(array("result" => false, "error" => "id missing")));
    die();
}

$sql = "SELECT *  FROM  food_item_list where food_bank_id = $id";
$result = $conn->query($sql);
$response= array();
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    array_push($response,array("name" => $row['name'],"quantity" => $row['quantity'],"unit" => $row['unit']));
  } 
}
echo(json_encode($response));


?>