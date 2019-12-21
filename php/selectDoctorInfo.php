<?php

require 'config.php';


$data = [
    'id'=>$_POST['id']
];

//echo($data['id']);

$sqlSelect = "SELECT doctor.surname, doctor.firstname, doctor.patronym, doctor.post, doctor.birthday, department.name, info.street, info.house, info.phone_number FROM doctor inner join department on department.id = doctor.department_fk INNER join info on info.id = doctor.info_fk WHERE doctor.id = '$data[id]';";
$query = $pdo->query($sqlSelect);
$row = $query->fetch(PDO::FETCH_OBJ);

$currentUser = [
    "surname"=>$row->surname,
    "name"=>$row->firstname,
    "patronym"=>$row->patronym,
    "post"=>$row->post,
    "birthday"=>$row->birthday,
    "department"=>$row->name,
    "street"=>$row->street,
    "house"=>$row->house,
    "phone"=>$row->phone_number
];
        ?>
        <li><?php echo($currentUser[surname]); ?> <?php echo($currentUser[name]); ?> <?php echo($currentUser[patronym]); ?></li>        
        <li><?php echo($currentUser[post]); ?> </li>        
        <li><?php echo($currentUser[birthday]); ?> </li>        
        <li><?php echo($currentUser[department]); ?> </li>        
        <li><?php echo($currentUser[street]); ?> </li>        
        <li><?php echo($currentUser[house]); ?> </li>        
        <li><?php echo($currentUser[phone]); ?> </li>    

        
        <?php





?>