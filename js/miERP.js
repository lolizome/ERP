import StoreHouseApp from './storehouse/storehouseApp.js';

$(function () {
	history.replaceState({action: 'init'}, null);
});

const historyActions = {
	init: () => {
		StoreHouseApp.handleInit();
	},
	productsStoreList: (event) => {
		StoreHouseApp.handleProductsStoreList(event.state.store);
	},
	productsCategoryList: (event) => {
		StoreHouseApp.handleProductsCategoryList(event.state.category);
	},
	newProduct: (event) => {
		StoreHouseApp.handleNewProductForm();
	},
	newCategory: (event) => {
		StoreHouseApp.handleNewCategoryForm();
	},
	newStore: (event) => {
		StoreHouseApp.handleNewStoreForm();
	},
	removeProduct: (event) => {
		StoreHouseApp.handleRemoveProductForm();
	},
	removeCategory: (event) => {
		StoreHouseApp.handleRemoveCategoryForm();
	},
	removeStore: (event) => {
		StoreHouseApp.handleRemoveStoreForm();
	}
	//showProduct: (event) => StoreHouseApp.handleShowProduct(event.state.serial)
}

window.addEventListener('popstate', function(event) {
	if(event.state) {
		historyActions[event.state.action](event);
	}
});

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
