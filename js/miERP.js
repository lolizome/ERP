//import * as StoreHouseTest from './storehouse/storehouseTest.js';
import './storehouse/storehouseApp.js';

function showResultLayer(){
	// Mostramos capa de ejemplos
	let examples = $('#examples');
	let examplesRows = examples.children();
	examplesRows.hide();
	$(examplesRows[examplesRows.length - 1]).show();
	$('#result').empty();

	// Invocación de ejemplos
	$$result.clear();
}

showResultLayer();
