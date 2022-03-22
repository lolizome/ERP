import StoreHouseApp from './storehouse/storehouseApp.js';

const historyActions = {
	init: () => {
		StoreHouseApp.handleInit();
	},
	productsStoreList: (event) => {
		StoreHouseApp.handleProductsStoreList(event.state.store);
	},
	productsCategoryList: (event) => StoreHouseApp.handleProductsCategoryList(event.state.category),
	showProduct: (event) => StoreHouseApp.handleShowProduct(event.state.serial)
}

window.addEventListener('popstate', function(event) {
	if(event.state) {
		historyActions[event.state.action](event);
	}
});
console.log(history.state);

history.replaceState({action: 'init'}, null);

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

//showResultLayer();
