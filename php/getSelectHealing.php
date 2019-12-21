<?php

require 'config.php';




//echo($data['id']);

$sqlSelect = "SELECT doctor.id, doctor.surname, doctor.firstname FROM doctor";
$query = $pdo->query($sqlSelect);
$row = $query->fetch(PDO::FETCH_OBJ);
?>
<div class="doc">
<?php

    while($row = $query->fetch(PDO::FETCH_OBJ)){
        ?>
        <option><?php echo $row->id,'-', $row->surname,$row->firstname ?> </option> 
<?php
    }
?>
</div>
<?php
$sqlSelect = "SELECT patients.id, patients.surname, patients.firstname FROM patients";
$query = $pdo->query($sqlSelect);
$row2= $query->fetch(PDO::FETCH_OBJ);
?>
<div class="pat">
<?php

    while($row2 = $query->fetch(PDO::FETCH_OBJ)){
        ?>
        <option><?php echo $row2->id,'-', $row2->surname,$row2->firstname ?> </option> 
<?php
    }
?>
</div>

<?php


?>
