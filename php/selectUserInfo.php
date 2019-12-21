<?php

require 'config.php';


$data = [
    'id'=>$_POST['id']
];

//echo($data['id']);

$sqlSelect = "SELECT patients.surname, patients.firstname, patients.patronym, patients.birthday, patients.disease, room.id, info.street,info.house, info.phone_number, department.name FROM patients inner join info on info.id = patients.info_fk inner join room on room.id = patients.room_fk inner join department on department.id = room.department_fk where patients.id = '$data[id]'";
$query = $pdo->query($sqlSelect);
$row = $query->fetch(PDO::FETCH_OBJ);

$currentUser = [
    "surname"=>$row->surname,
    "name"=>$row->firstname,
    "patronym"=>$row->patronym,
    "disease"=>$row->disease,
    "birthday"=>$row->birthday,
    "room"=>$row->id,
    "street"=>$row->street,
    "house"=>$row->house,
    "phone"=>$row->phone_number,
    "department"=>$row->name
];
        ?>
        <li><?php echo('patient'); ?> </li> 
        <li><?php echo($currentUser[surname]); ?> </li>        
        <li><?php echo($currentUser[name]); ?> </li>        
        <li><?php echo($currentUser[patronym]); ?> </li>        
        <li><?php echo($currentUser[disease]); ?> </li>        
        <li><?php echo($currentUser[birthday]); ?> </li>        
        <li><?php echo($currentUser[room]); ?> </li>        
        <li><?php echo($currentUser[street]); ?> </li>        
        <li><?php echo($currentUser[house]); ?> </li>        
        <li><?php echo($currentUser[phone]); ?> </li>        
        <li><?php echo($currentUser[department]); ?> </li>      

        
        <?php





?>