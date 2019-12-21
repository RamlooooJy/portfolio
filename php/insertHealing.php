<?php 
require 'config.php';


$data = [
    'doc'=>$_POST['idDoc'],
    'pat'=>$_POST['idPat']
];


try{
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sqlInsert = "INSERT INTO healing(patient_fk, doctor_fk) VALUES ( '$data[pat]', '$data[doc]')";
    // use exec() because no results are returned
    $pdo->exec($sqlInsert);
    echo "New record access created successfully <br>" ;
}
catch(PDOException $e)
    {
    echo $sqlInsert . "<br>" . $e->getMessage();
    }

$pdo = null;


?>