<?php

require 'config.php';

$data = [
    'sur'=>$_POST['surname'],
    'name'=>$_POST['name'],
    'pat'=>$_POST['patronym'],
    'bir'=>$_POST['birthday'],
    'dis'=>$_POST['disease'],
    'room'=>$_POST['room'],
    'street'=>$_POST['street'],
    'house'=>$_POST['house'],
    'phone'=>$_POST['phone'],
    'log'=>$_POST['login'],
    'pas'=>$_POST['password']


];


$query=$pdo->query("SELECT COUNT(*) as count FROM patients");
$query->setFetchMode(PDO::FETCH_ASSOC);
$row=$query->fetch();
$members=$row['count'];

$query=$pdo->query("SELECT COUNT(*) as count FROM doctor");
$query->setFetchMode(PDO::FETCH_ASSOC);
$row=$query->fetch();
$members2=$row['count'];

$id = $members + $members2 + 3; // login's and passport's id



try{
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sqlInsert = "INSERT INTO access VALUES ('$id', '$data[log]', '$data[pas]')";
    // use exec() because no results are returned
    $pdo->exec($sqlInsert);
    echo "New record access created successfully";
    try{
        $sqlInsert = "INSERT INTO info (street, house, phone_number) VALUES ('$data[street]', '$data[house]', '$data[phone]')";
        // use exec() because no results are returned
        $pdo->exec($sqlInsert);
        echo "New record info created successfully";
        
        $idInfo = $pdo->lastInsertId();

        try{
            $sqlInsert = "INSERT INTO patients (surname, firstname, patronym, birthday, disease, room_fk, info_fk, access_fk) VALUES ('$data[sur]', '$data[name]', '$data[pat]', '$data[bir]', '$data[dis]', '$data[room]', '$idInfo', '$id' )";
            // use exec() because no results are returned
            $pdo->exec($sqlInsert);
            echo "New record patients created successfully";
        }
        catch(PDOException $er){
            $pdo->exec("DELETE from access where id = $id");
            $pdo->exec("DELETE from info where id = $idInfo");
            echo $sqlInsert . "<br>" . $er->getMessage();
        }
    }
    catch(PDOException $o){
        $pdo->exec("DELETE from access where id = $id");
        echo $sqlInsert . "<br>" . $o->getMessage();
    }
    }
catch(PDOException $e)
    {
    echo $sqlInsert . "<br>" . $e->getMessage();
    }

$pdo = null;

?>