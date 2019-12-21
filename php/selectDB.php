<?php 

require 'config.php';


$data = [
    'id'=>$_POST['id']
    //''=>$_POST['password']
];




$sqlSelect = "SELECT patients.id, patients.surname, patients.firstname, 
patients.patronym, patients.birthday, patients.disease, department.name, info.phone_number,
info.street,info.house  
from patients 
INNER join room on room.id = patients.room_fk 
INNER join department on department.id =room.department_fk 
INNER join info on patients.info_fk =info.id
INNER join healing on patients.id = healing.patient_fk where healing.doctor_fk='$data[id]';";



$query = $pdo->query($sqlSelect);
//$res = $query ->execute();

//$res = $query ->execute($data);
$cnt = 0;
    while($row = $query->fetch(PDO::FETCH_OBJ)){
        $cnt++;
        ?>
        <tr>
            <td><?php echo $row->id ?></td>
            <td><?php echo ($row->surname) ?> <?php echo ($row->firstname) ?> <?php echo ($row->lastname) ?></td>
            <td><?php echo $row->birthday ?></td>
            <td><?php echo $row->street?> <?php echo $row->house?></td>
            <td><?php echo $row->disease?></td>
            <td><?php echo $row->phone_number?></td>
        </tr>
<?php
    }
?>
