<?php

require 'config.php';

$data = [
    'login'=>$_POST['log'],
    'password'=>$_POST['pas']
];

$sqlDoctor = "SELECT doctor.surname,doctor.firstname,doctor.patronym,doctor.post,doctor.birthday, info.street, info.house, info.phone_number, department.name, department.building_fk, department.main_dep_doctor_fk,doctor.id, laboratory.main_lab_doctor_fk, doctor.department_fk, access.login, access.password, doctor.image from doctor inner join info on info.id = doctor.info_fk left join department ON doctor.department_fk = department.id left join laboratory on laboratory.main_lab_doctor_fk=doctor.id inner join access on access.id = doctor.access_fk 
where (access.login = '$data[login]' and access.password = '$data[password]')";
$query = $pdo->query($sqlDoctor);
$row = $query->fetch(PDO::FETCH_OBJ);

if($row->post == ''){
    $sqlPatient = "SELECT patients.surname, patients.firstname, patients.patronym, patients.birthday, patients.disease, room.id, info.street,info.house, info.phone_number, department.name, access.login,access.password
    FROM patients inner join access on access.id = patients.access_fk
    inner join info on info.id = patients.info_fk
    inner join room on room.id = patients.room_fk
    inner join department on department.id = room.department_fk where access.login = '$data[login]' and access.password = '$data[password]';";
$query = $pdo->query($sqlPatient);
$row = $query->fetch(PDO::FETCH_OBJ);
}

$currentUser =[];
if($row->post){
    $currentUser = [
        'surname'=>$row->surname,
        "name"=>$row->firstname,
        "patronym"=>$row->patronym,
        "post"=>$row->post,
        "birthday"=>$row->birthday,
        "street"=>$row->street,
        "house"=>$row->house,
        "departmentChief"=>$row->main_dep_doctor_fk,
        "laboratoryChief"=>$row->main_lab_doctor_fk,
        "departmentID"=>$row->department_fk,
        "buildingID"=>$row->building_fk,
        "department"=>$row->name,
        "phone"=>$row->phone_number,
        "login"=>$row->login,
        "password" =>$row->password,
        "id"=>$row->id,
        "img"=>$row->image


    ];
    
    ?>
    <li><?php echo('doctor'); ?> </li>        
    <li><?php echo($currentUser[surname]); ?></li>
    <li><?php echo($currentUser[name]); ?></li>
    <li><?php echo($currentUser[patronym]); ?></li>
    <li><?php echo($currentUser[post]); ?></li>
    <li><?php echo($currentUser[birthday]); ?></li>
    <li><?php echo($currentUser[department]); ?></li>
    <li><?php echo($currentUser[phone]); ?></li>
    <li><?php echo($currentUser[login]); ?></li>
    <li><?php echo($currentUser[password]); ?></li> 
    <li><?php echo($currentUser[id]); ?></li> <!-- обязательно -->
    <li><?php echo($currentUser[street]); ?></li> 
    <li><?php echo($currentUser[house]); ?></li> 
    <li><?php echo($currentUser[departmentChief]); ?></li> 
    <li><?php echo($currentUser[laboratoryChief]); ?></li> 
    <li><?php echo($currentUser[departmentID]); ?></li> 
    <li><?php echo($currentUser[img]); ?></li> 


    
    <?php
    //var_dump($currentUser);
    //var_dump($json);

    //var_dump(json($currentUser));
}
//пациент и админ
else if($row->disease){
    $sqlWhoIsADoctor = "SELECT doctor.surname, doctor.firstname, doctor.patronym FROM healing INNER join doctor on healing.doctor_fk = doctor.id where healing.patient_fk = (select patients.id from patients inner join access on patients.access_fk = access.id where access.login = 'pat1');";
    $query = $pdo->query($sqlWhoIsADoctor);
    $patDoctor = $query->fetch(PDO::FETCH_OBJ);
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
        "department"=>$row->name,
        "login"=>$row->login,
        "password"=>$row->password,
        "docSur"=>$patDoctor->surname,
        "docName"=>$patDoctor->firstname,
        "docPat"=>$patDoctor->patronym
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
            <li><?php echo($currentUser[login]); ?> </li>  
            <li><?php echo($currentUser[password]); ?> </li>    
            <li><?php echo($currentUser[docSur]); ?> </li>        
            <li><?php echo($currentUser[docName]); ?> </li>  
            <li><?php echo($currentUser[docPat]); ?> </li>        

            
        
            
            <?php
        
}
else{
        ?>

    <li><?php echo('admin'); ?> </li> 
        <?php

}






?>


