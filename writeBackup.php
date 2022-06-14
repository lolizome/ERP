<?php
	$fechaActual = date("d") . date("m") . date("Y") . date("H") . date("i") . date("s");

	$JSONData = file_get_contents("php://input");

	$file = fopen("./backup/backup_" . $fechaActual . ".txt", "a");

	fputs($file, $JSONData);

	fclose($file);
?>
