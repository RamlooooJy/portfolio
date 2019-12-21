<?php 

require 'config.php';


$sqlSelect = "SELECT doctor.id, doctor.surname, doctor.firstname, doctor.patronym, doctor.post, doctor.birthday, info.street, info.phone_number, info.house, department.name FROM doctor inner join info on info.id = doctor.info_fk inner join department on department.id = doctor.department_fk;";



$query = $pdo->query($sqlSelect);
//$res = $query ->execute();
?>
        <tr>
            <th><?php echo 'ID' ?></th>
            <th><?php echo 'ФИО'?></th>
            <th><?php echo 'Дата рождения' ?></th>
            <th><?php echo 'Адрес'?></th>
            <th><?php echo 'Должность'?></th>
            <th><?php echo 'Номер телефона'?></th>
            <th><?php echo 'Отделение'?></th>
        </tr>
<?php
//$res = $query ->execute($data);
$cnt = 0;
    while($row = $query->fetch(PDO::FETCH_OBJ)){
        $cnt++;
        ?>
        <tr>
            <td><?php echo $row->id ?></td>
            <td><?php echo ($row->surname) ?> <?php echo ($row->firstname) ?> <?php echo ($row->patronym) ?></td>
            <td><?php echo $row->birthday ?></td>
            <td><?php echo $row->street?> <?php echo $row->house?></td>
            <td><?php echo $row->post?></td>
            <td><?php echo $row->phone_number?></td>
            <td><?php echo $row->name?></td>
        </tr>
<?php
    }
?>
