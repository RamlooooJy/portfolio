<?php 
require 'config.php';



$data = [
    'sur'=>$_POST['surname'],
    'name'=>$_POST['name'],
    'pat'=>$_POST['patronym'],
    'bir'=>$_POST['birthday'],
    'post'=>$_POST['post'],
    'street'=>$_POST['street'],
    'house'=>$_POST['house'],
    'phone'=>$_POST['phone'],
    'log'=>$_POST['login'],
    'pas'=>$_POST['password'],
    'dep'=>$_POST['department']
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
    echo "New record access created successfully <br>" ;
    try{
        $sqlInsert = "INSERT INTO info (street, house, phone_number) VALUES ('$data[street]', '$data[house]', '$data[phone]')";
        // use exec() because no results are returned
        $pdo->exec($sqlInsert);
        echo "New record info created successfully";
        
        $idInfo = $pdo->lastInsertId();
        try{
            $query=$pdo->query("SELECT department.id from department where '$data[dep]' = department.name;");
            $query->setFetchMode(PDO::FETCH_ASSOC);
            $row2=$query->fetch();
            $dep=$row2['id'];
        }
        catch(PDOException $qwe){
            echo "<br>" . $qwe->getMessage();

        }

        try{
            $query=$pdo->query("SELECT COUNT(*) as count FROM doctor");
            $query->setFetchMode(PDO::FETCH_ASSOC);
            $row=$query->fetch();
            $docID=$row['count'] +1;

            $sqlInsert = "INSERT INTO doctor (id,surname, firstname, patronym, post, birthday, department_fk, access_fk, info_fk) VALUES ('$docID','$data[sur]', '$data[name]', '$data[pat]', '$data[post]', '$data[bir]', '$dep', '$id', '$idInfo' )";
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