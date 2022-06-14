<?php
	$fechaActual = date("d-m-Y");
	//$JSONData = file_get_contents("php://input");
	//$dataObject = json_decode($JSONData);
	$data = $_POST['data'];

	$file = fopen("./backup/archivo" . $fechaActual . ".txt", "a");

	fputs($file, $data);

	fclose($file);
?>
