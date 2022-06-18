<?php
	$JSONData = file_get_contents("php://input");

	$file = fopen("./tarea.json", "w+");

	fputs($file, $JSONData);

	fclose($file);
?>
