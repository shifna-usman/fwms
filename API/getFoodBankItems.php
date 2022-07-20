<?php
date_default_timezone_set('Asia/Kolkata');
require_once('./db.php');

$sql = "SELECT *  FROM food_bank";
$result = $conn->query($sql);
$response= array();
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $formattedTime = date('d/m/Y h:i:s A',$row['created_at']);
    array_push($response,array("id" => $row['id'],"name" => $row['creater_name'],"phone_number" => $row['phone_number'],
    "additional_phone" => $row['additional_phone'],"address" => nl2br($row['address']),"notes" => nl2br($row['notes']),"landmark" => nl2br($row['landmark']),"created_at" => $formattedTime));
  } 
}
echo(json_encode($response));



?>