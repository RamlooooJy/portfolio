<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "app";
require 'config.php';



$data = [
    'id'=>$_POST['id'],
    'post' =>$_POST['post'],
    'bir'=>$_POST['bir'],
    'dep'=> $_POST['dep'],
    'street'=>$_POST['street'],
    'house'=>$_POST['house'],
    'number'=>$_POST['number']
];

try {
    // set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $query=$pdo->query("SELECT department.id from department where department.name = '$data[dep]'");
    $query->setFetchMode(PDO::FETCH_ASSOC);
    $row=$query->fetch();
    $depId=$row['id'];

    $sqlUpdate = "UPDATE doctor, info set doctor.birthday = '".$data[bir]."', doctor.post = '".$data[post]."', doctor.department_fk = '$depId', info.street='".$data[street]."', info.house='".$data[house]."', info.phone_number='".$data[number]."' where doctor.id = '".$data[id]."' and doctor.info_fk = info.id";
    // Prepare statement
    $stmt = $pdo->prepare($sqlUpdate);
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
