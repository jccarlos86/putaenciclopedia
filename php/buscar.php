<?php
include 'conexion.php';

$texto = $_POST['tx'];
$pais = $_POST['ps'];
// $estado = $_POST['etd'];

$result;
// $query = "SELECT groseria FROM Enciclopedia WHERE groseria = '$texto' AND pais = '$pais' AND 'estado' = '$estado'";
$query = "SELECT groseria FROM Enciclopedia WHERE groseria = '$texto' AND pais = '$pais'";
$sel = $con ->query($query);
    if($sel){
        $row_cnt = $sel->num_rows;
        if($row_cnt > 0) {
            $result = "true";
        }else{
            $result = "false";
        }
    }else{
        $result = die("Connection failed: " . mysqli_connect_error());
    }
echo $result;
mysqli_close($con);
?>