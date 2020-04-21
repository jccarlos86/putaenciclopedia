<?php
include 'conexion.php';

$texto = $_POST['tx'];
$desc = $_POST['dsc'];
$pais = $_POST['ps'];
// $estado = $_POST['etd'];
$tipo = $_POST['tp'];


//  $insert = $con -> query("insert into Enciclopedia (id, groseria, tipo, descripcion, pais, estado)
//  values ('', '$texto', '$tipo', '$desc', '$pais', '$estado')");
 $insert = $con -> query("insert into Enciclopedia (id, groseria, tipo, descripcion, pais, estado)
 values ('', '$texto', '$tipo', '$desc', '$pais', 'Default')");
 $result;
 if($insert){
   $result = "true";
 }else{
    $result = die("Connection failed: " . mysqli_connect_error());
 }
 echo $result;
 mysqli_close($con);
?>