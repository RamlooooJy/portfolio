<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "app";
$data = [
    'id'=>$_POST['id'],
    'dis' =>$_POST['dis'],
    'bir'=>$_POST['bir'],
    'room'=> $_POST['room'],
    'street'=>$_POST['street'],
    'house'=>$_POST['house'],
    'number'=>$_POST['number']
    //'dep'=>$_POST['dep']
];
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sqlUpdate = "UPDATE patients, info set patients.birthday = '".$data[bir]."', patients.disease = '".$data[dis]."', patients.room_fk = '".$data[room]."', info.street='".$data[street]."', info.house='".$data[house]."', info.phone_number='".$data[number]."' where patients.id = '".$data[id]."' and patients.info_fk = info.id";
    // Prepare statement
    $stmt = $conn->prepare($sqlUpdate);
    //echo($sqlUpdate);
    // execute the query
    $stmt->execute();

    // echo a message to say the UPDATE succeeded
    echo $stmt->rowCount()  . " records UPDATED successfully";
    }
catch(PDOException $e)
    {
    echo $sqlUpdate . "<br>" . $e->getMessage();
    }

$conn = null;


?>
