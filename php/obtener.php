<?php
include 'conexion.php';

$result;
$jsonArray = array();

$query = "SELECT groseria, tipo, descripcion, pais FROM Enciclopedia";
$sel = $con ->query($query);
if($sel){
    while($row = mysqli_fetch_array($sel)){
        $texto = $row['groseria'];
        $tipo = $row['tipo'];
        $desc = $row['descripcion'];
        $pais = $row['pais'];
        $jsonArray[] = array('Texto' => $texto, 'Tipo' => $tipo, 'Descripcion' => $desc, 'Pais' => $pais);
    }
    $result = json_encode($jsonArray);
}else{
    $result = die("Connection failed: " . mysqli_connect_error());
}

echo $result;
mysqli_close($con);

?>