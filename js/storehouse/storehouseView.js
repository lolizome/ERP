import StoreHouse from './storehouseModel.js';
import {
	newProductValidation,
	newCategoryValidation,
	newStoreValidation
} from '../validation.js';

class StoreHouseView {
	// scrollElement -> punto donde se sitúa la vista en la página
	#executeHandler(handler, handlerArguments, scrollElement, data, url, event) {
		handler(...handlerArguments);
		$(scrollElement).get(0).scrollIntoView();
		history.pushState(data, null, url);
		event.preventDefault();
	}

	constructor() {
		this.main = $('main');
		this.productWindow = [];
		this.stores = $('#stores');
		this.categories = $('#categories');
		this.menu = $('.navbar-nav');
		this.bRemove = $('#bDelete');
	}

	bindInit(handler) {
		$('#init').click((event) => {
			this.#executeHandler(handler, [], 'body', {action: 'init'}, '#', event);
		});
		$('#logo').click((event) => {
			this.#executeHandler(handler, [], 'body', {action: 'init'}, '#', event);
		});
	}

	// Muestra las tiendas existentes
	showStores(stores) {
		this.main.empty();
		if (this.stores.children().children().length > 1) this.stores.children().remove();
		let container = $('<div id="store-list" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>');
		for (let [key] of stores) {
			container.append(`<div class="col mb-5 stores">
				<div class="card h-100">
					<a data-store="${key.cif}" class="btn-link disabled" href="#product-list">
						<div class="sto-list-image">
							<img class="card-img-top" src="https://via.placeholder.com/450x300.jpg?text=${key.name}" alt="..." />
						</div>
						<div class="card-body p-4">
							<div class="text-center">
								<h5 class="fw-bolder">${key.name}</h5>
								<h6>${key.address}</h6>
							</div>
						</div>
					</a>
				</div>
			</div>`);
		}
		this.stores.append(container);

		// Botones de atrás y adelante del historial de la página
		let bBack = $('<button class="btn btn-primary m-1 atras">Atrás</button>');
		bBack.click(function (event){
			window.history.back();
		});
		this.stores.prepend(bBack);
		let bForward = $('<button class="btn btn-primary m-1 adelante">Adelante</button>');
		bForward.click(function (event){
			window.history.forward();
		});
		bBack.after(bForward);
	}

/*
	showProduct(product, message){
		this.main.empty();
		if (this.categories.children().length > 1) this.categories.children()[1].remove();
		let container;
		if (product){
			container = $(`<div id="single-product" class="${product.constructor.name}-style container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					<div class="col-md-10">
						<div id="${product.constructor.name}" class="card">
							<div class="row">
								<div class="col-md-4 images">
									<div class="p-3">
										<div class="text-center p-4"> <img id="main-image" src="${product.images}"/> </div>
									</div>
								</div>
								<div class="col-md-4 verticalLine"></div>
								<div class="col-md-4 product">
									<div class="p-4">
										<div class="mt-4 mb-3"> <span class="text-uppercase text-muted name">${product.constructor.name}</span>
											<h5 class="text-uppercase">${product.title}</h5>
											<div class="sizes mt-5">
												<h6 class="text-uppercase">Precio</h6>
											</div>
											<div class="price d-flex flex-row align-items-center">
												<span class="act-price">${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
											</div>
											<div class="sizes mt-5">
												<h6 class="text-uppercase">Descripción</h6>
											</div>
											<div class="description d-flex flex-row align-items-center">
												<span class="act-desc">${product.description}</span>
											</div>
										</div>
										<div class="sizes mt-5">
											<h6 class="text-uppercase characteristics">Características</h6>
										</div>
										<div class="cart mt-4 align-items-center">
											<button data-serial="${product.serialNumber}" class="btn btn-primary text-uppercase mr-2 px-4">Comprar</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`);
			container.find('.characteristics').after(this.#instance[product.constructor.name]);
		} else {
			container = $(`<div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
		}
		this.main.prepend(`<hr></hr>`);
		this.main.append(container);
		$('#Movie').css({'border': '2px solid #75cc96', 'background-color': '#e9f9ef'});
		$('#Game').css({'border': '2px solid #e85b5b', 'background-color': '#f5d6d6'});
		$('#Book').css({'border': '2px solid #77a6d3', 'background-color': '#dfe9f3'});
	}
*/

	// Muestra un productp en una nueva ventana
	showProductInNewWindow(product, message){
		let main = $(this.productWindow[this.productWindow.length - 1].document).find('main');
		let header = $(this.productWindow[this.productWindow.length - 1].document).find('header nav');
		main.empty();
		header.empty();
		let container;

		if (product){
			this.productWindow[this.productWindow.length - 1].document.title = `${product.constructor.name} - ${product.title}`;
			container = $(`<div id="single-product" class="${product.constructor.name}-style container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					<div class="col-md-10">
						<div class="card ${product.constructor.name}">
							<div class="row">
								<div class="col-md-4 images">
									<div class="p-3">
										<div class="text-center p-4"> <img id="main-image" src="${product.images}"/> </div>
									</div>
								</div>
								<div class="col-md-4 verticalLine"></div>
								<div class="col-md-4 product">
									<div class="p-4">
										<div class="mt-4 mb-3"> <span class="text-uppercase text-muted name">${product.constructor.name}</span>
											<h5 class="text-uppercase">${product.title}</h5>
											<div class="sizes mt-5">
												<h6 class="text-uppercase">Precio</h6>
											</div>
											<div class="price d-flex flex-row align-items-center">
												<span class="act-price">${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
											</div>
											<div class="sizes mt-5">
												<h6 class="text-uppercase">Descripción</h6>
											</div>
											<div class="description d-flex flex-row align-items-center">
												<span class="act-desc">${product.description}</span>
											</div>
										</div>
										<div class="sizes mt-5">
											<h6 class="text-uppercase characteristics">Características</h6>
										</div>
										<div class="cart mt-4 align-items-center">
											<button data-serial="${product.serialNumber}" class="btn btn-primary text-uppercase mr-2 px-4 bBuy">Comprar</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button class="btn btn-primary text-uppercase m-2 px-4 bClose" onClick="window.close()">
				Cerrar
			</button>`);
			container.find('.characteristics').after(this.#instance[product.constructor.name]);
		} else {
			container = $(` <div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
		}
		main.append(container);
		this.productWindow[this.productWindow.length - 1].document.body.scrollIntoView();
	}
	#instance = {
		Movie: this.#MovieCharacteristics,
		Game: this.#GameCharacteristics,
		Book: this.#BookCharacteristics,
	}
	#MovieCharacteristics(product){
		return $('<div>Características de película.</div>');
	}
	#GameCharacteristics(product){
		return $('<div>Características de juego.</div>');
	}
	#BookCharacteristics(product){
		return $('<div>Características de libro.</div>');
	}

	// Muestra el mapa general de las tiendas con sus ubicaciones
	showMapStores() {
		let ul = $('.navbar-nav');
		ul.append(`
			<li class="nav-item">
				<a class="nav-link navMap" href="#map-list">Mapa</a>
			</li>
		`);
	}

	// Muestra las tiendas existentes en el menú
	showStoresInMenu(stores) {
		let link = $('#navStos');
		let container;
		let li;

		if(link.length === 1) {
			container = link.next();
			container.children().remove();
			link.parent().append(container);
		} else {
			li = $(`<li class="nav-item dropdown">
				<a id="navStos" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					Tiendas
				</a>
			</li>`);
			container = $('<div class="dropdown-menu" aria-labelledby="navStos"></div>');
			//container.append(`<li><a class="dropdown-item" href="#!">Todas las Tiendas</a></li><li><hr class="dropdown-divider" /></li>`);
			li.append(container);
			this.menu.append(li);
		}

		for (let [key] of stores) {
			container.append(`<a data-store="${key.cif}" class="dropdown-item" href="#product-list">${key.name}</a>`);
		}
	}

	// Muestra las categorías existentes en el menú
	showCategoriesInMenu(categories) {
		let link = $('#navCats');
		let container;
		let li;

		if(link.length === 1) {
			container = link.next();
			container.children().remove();
			link.parent().append(container);
		} else {
			li = $(`<li class="nav-item dropdown">
				<a id="navCats" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					Categorías
				</a>
			</li>`);
			container = $('<div id="category-list" class="dropdown-menu" aria-labelledby="navCats"></div>');
			//container.append(`<li><a data-category="Cattodos" class="dropdown-item" href="#productlist">Todas las Categorías</a></li><li><hr class="dropdown-divider" /></li>`);

			li.append(container);
			this.menu.append(li);
		}

		for (let [key, value] of categories) {
			container.append(`<a data-category="${value.title}" class="dropdown-item" href="#product-list">${value.title}</a>`);
		}
		/*
		let li = $(`<li class="nav-item dropdown">
			<a id="navCats" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				Categorías
			</a>
		</li>`);
		let container = $('<div id="category-list" class="dropdown-menu" aria-labelledby="navCats"></div>');
		//container.append(`<li><a data-category="Cattodos" class="dropdown-item" href="#productlist">Todas las Categorías</a></li><li><hr class="dropdown-divider" /></li>`);
		for (let [key, value] of categories) {
			container.append(`<a data-category="${value.title}" class="dropdown-item" href="#product-list">${value.title}</a>`);
		}
		*/
	}

	// Muestra la gestión de productos, categorías y tiendas en el menú
	showAdminInMenu() {
		let li = $(`<li id="liAdmin" class="nav-item dropdown">
		<a id="navAdmin" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
			Gestiones
		</a>
		</li>`);
		let container = $(`<div id="navMenu2" class="dropdown-menu" aria-labelledby="navAdmin">
			<a id="lnewProduct" class="dropdown-item" href="#new-product">Crear Producto</a>
			<a id="ldelProduct" class="dropdown-item" href="#del-product">Eliminar Producto</a>
			<a id="lnewCategory" class="dropdown-item" href="#new-category">Crear Categoría</a>
			<a id="ldelCategory" class="dropdown-item" href="#del-category">Eliminar Categoría</a>
			<a id="lnewStore" class="dropdown-item" href="#new-store">Crear Tienda</a>
			<a id="ldelStore" class="dropdown-item" href="#del-store">Eliminar Tienda</a>
		</div>`);
		li.append(container);
		this.menu.append(li);
	}

	// Formulario de creación de productos
	showNewProductForm() {
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();

		let container = $(`<div class="container my-3">
			<h1 class="display-5 ns">Nuevo producto</h1>
		</div>`);
		let form = $(`<form id="new-product" class="cat2" method="post" name="fNewProduct" role="form" novalidate><form>
		<div class="form-row">
			<div class="col-md-12 mb-3">
				<label for="ncTitle">Número de serie *</label>
				<div class="input-group">
					<input type="text" class="form-control" id="npSerial" name="npSerial" placeholder="Número de serie" aria-describedby="serialPrepend" value="" required>
					<div class="invalid-feedback">El número de serie es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
		</div>
		<div class="form-row">
		<div class="col-md-12 mb-3">
			<label for="ncTitle">Nombre *</label>
			<div class="input-group">
				<input type="text" class="form-control" id="npBrand" name="npBrand" placeholder="Nombre" aria-describedby="brandPrepend" value="" required>
				<div class="invalid-feedback">El nombre es obligatorio.</div>
				<div class="valid-feedback">Correcto.</div>
			</div>
		</div>
	</div>
	<div class="form-row">
		<div class="col-md-12 mb-3">
			<label for="ncDesc">Descripción</label>
			<div class="input-group">
				<input type="text" class="form-control" id="npDesc" name="npDesc" placeholder="Descripción" aria-describedby="descPrepend" value="">
			</div>
		</div>
	</div>
	<div class="form-row mb-2">
			Tipo de producto *
		</div>
		<div class="form-row" id="cType">
			<div class="col-md-3 mb-0 input-group">
				<div class="input-group-prepend">
					<div class="input-group-text">
					<input type="radio" name="npType" id="npMovieType" value="Movie" required>
					</div>
				</div>
				<label class="form-control" for="npMovieType">Película</label>
			</div>
			<div class="col-md-3 mb-0 input-group">
				<div class="input-group-prepend">
					<div class="input-group-text">
					<input type="radio" name="npType" id="npGameType" value="Game" required>
					</div>
				</div>
				<label class="form-control" for="npGameType">Juego</label>
			</div>
			<div class="col-md-3 mb-0 input-group">
				<div class="input-group-prepend">
					<div class="input-group-text">
					<input type="radio" name="npType" id="npBookType" value="Book" required>
					</div>
				</div>
				<label class="form-control" for="npBookType">Libro</label>
			</div>
			<div class="col-md-3 mb-3 mt-1 input-group">
			<div class="invalid-feedback"><i class="fas fa-times"></i> El tipo de producto es obligatorio.</div>
			<div class="valid-feedback"><i class="fas fa-check"></i> Correcto.</div>
		</div>
	</div>
	<div class="form-row">
		<div class="col-md-12 mb-3">
			<label for="ncTitle">Precio *</label>
			<div class="input-group">
				<input type="number" class="form-control" id="npPrice" name="npPrice" min="0" step="10" placeholder="Precio" aria-describedby="pricePrepend" value="" required>
				<div class="invalid-feedback">El precio es obligatorio.</div>
				<div class="valid-feedback">Correcto.</div>
			</div>
		</div>
		<div class="col-md-12 mb-3">
			<label for="npTax">Porcentaje de impuestos</label>
			<div class="input-group">
				<input type="number" class="form-control" id="npTax" name="npTax" min="0" step="1" placeholder="21%" aria-describedby="taxPrepend" value="21" required>
				<div class="invalid-feedback">Los impuestos son obligatorios.</div>
				<div class="valid-feedback">Correcto.</div>
			</div>
			</div>
			<div class="col-md-12 mb-3">
				<label for="npUrl">URL *</label>
				<div class="input-group">
					<input type="url" class="form-control" id="npUrl" name="npUrl" placeholder="http://www.test.es" aria-describedby="urlPrepend" value="" required>
					<div class="invalid-feedback">La URL no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
		</div>`);
		let select = $(`<select class="custom-select" id="npCategories" name="npCategories" aria-describedby="categoryPrepend" required multiple></select>`);
		for (let [key, value] of this.categories){
			select.append(`<option value="${value.title}">${value.title}</option>`);
		}

		form.append(`
			<div class="ns">
				<button class="btn btn-primary m-1" type="submit">Enviar</button>
				<button class="btn btn-primary m-1" type="reset">Cancelar</button>
			</div>
		`);
		container.append(form);
		this.main.append(container);
	}

	// Modal de creación de productos
	showNewProductModal(done, product, error) {
		console.log("1");
		$(document.fNewProduct).find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="newProductModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newProductModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newProductModalLabel">Producto creado</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							El producto <strong>${product.name}</strong> ha sido creado correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let newProductModal = $('#newProductModal');
			newProductModal.modal('show');
			newProductModal.find('button').click(() => {
				newProductModal.on('hidden.bs.modal', function (event) {
					document.fNewProduct.reset();
					document.fNewProduct.npSerial.focus();
					this.remove();
				});
				newProductModal.modal('hide');
			})
		} else {
			$(document.fNewProduct).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> El producto <strong>${product.brand} - ${product.model}</strong> no ha podido crearse correctamente.</div>`);
		}
	}

	// Formulario de eliminación de productos
	showRemoveProductForm(products) {
		this.main.empty();
		let container = $(`<div id="remove-product" class="container my-3">
			<h1 class="display-5">Eliminar un producto</h1>
			<div id="product-list" class="row"></div>
			</div>`);

		for (let product of products) {
			container.children().nextAll('div').append(`<div class="col mb-5">
				<figure class="card h-100  ${product[0].constructor.name}-css">
						<div id="etiqueta" class="card-body p-4">
							<div class="text-center">
								<h6 class="fw-bolder">${product[0].title}</h6>
								<div class="bottom-wrap">
									<div class="cart mt-4 align-items-center">
										<div><button class="btn btn-primary" data-category="${product[0].title}" type='button'>Eliminar</button></div>
									</div>
								</div>
							</div>
						</div>
					</a>
				</figure>
			</div>`);
		}
		this.categories.append(container);
		this.main.append(container);
	}

	// Modal de eliminación de productos
	showRemoveProductModal(done, pro, position, error) {
		$('remove-category').find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="removeCategoryModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removeCategoryModalLabel">Categoría eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La categoría <strong>${pro.title}</strong> ha sido eliminada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let removeCategoryModal = $('#removeCategoryModal');
				removeCategoryModal.modal('show');
				removeCategoryModal.find('button').click(() => {
					removeCategoryModal.on('hidden.bs.modal', function (event) {
						this.remove();
				});
				removeCategoryModal.modal('hide');
				let divCat = $('#remove-category').find(`div > div:nth-child(${position + 1})`);
				divCat.remove();
			})
		} else {
			$('#removeCategoryModal').prepend(`
				<div class="error text-danger p-3">
					<i class="fas fa-exclamation-triangle"></i> La categoría <strong>${pro.title}</strong> no exite en el almacén.
				</div>
			`);
		}
	}

	bindRemoveProductForm(handler){
		$('#remove-product').find('button').click(function (event){
			handler(this.dataset.product, $(this).closest('div.pro').index());
		})
	}

	// Formulario de creación de categorías
	showNewCategoryForm() {
		this.main.empty();
		if(this.categories.children().length > 1) this.categories.children()[1].remove();

		let container = $(`
		<div id="new-category" class="container my-3">
			<h1 class="display-5">Nueva categoría</h1>
			<form class="form" method="post" name="fNewCategory" role="form" novalidate>
					<div class="col-md-6 mb-3">
						<label for="ncTitle">Título *</label>
						<div class="input-group">
							<input type="text" class="form-control" id="ncTitle" name="ncTitle" placeholder="Título de categoría" aria-describedby="titlePrepend" value="" required>
							<div class="invalid-feedback">El título es obligatorio.</div>
							<div class="valid-feedback">Correcto.</div> </div>
						</div>
					<div class="col-md-6 mb-3">
						<label for="ncDescription">Descripción</label>
						<div class="input-group">
							<input type="text" class="form-control" id="ncDescription" name="ncDescription" placeholder="Descripción de Categoría" aria-describedby="descPrepend" value="" required>
							<div class="invalid-feedback"></div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="ncUrl">URL *</label>
						<div class="input-group">
							<input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="http://www.test.es" aria-describedby="urlPrepend" value="" required>
							<div class="invalid-feedback">La URL no es válida.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
				<div class="ns">
					<button id="btnEnviar" class="btn btn-primary" type="submit">Enviar</button>
					<button class="btn btn-primary" type="reset">Cancelar</button>
				</div>
			</form>
		</div>`);
		this.main.append(container);
	}

	// Modal de creación de categorías
	showNewCategoryModal(done, cat, error) {
		$(document.fNewCategory).find('div.error').remove();
		if(done) {
			let modal = $(`
				<div class="modal fade" id="newCategoryModal" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="newCategoryModalLabel">Categoría creada</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body"> La categoría <strong>${cat.title}</strong> ha sido creada correctamente. </div>
							<div class="modal-footer">
								<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
							</div>
						</div>
					</div>
				</div>
			`);

			$('body').append(modal);
			let newCategoryModal = $('#newCategoryModal');
			newCategoryModal.modal('show');
			newCategoryModal.find('button').click(() => {
				newCategoryModal.on('hidden.bs.modal', function (event) {
					document.fNewCategory.reset();
					document.fNewCategory.ncTitle.focus();
					this.remove();
				});
				newCategoryModal.modal('hide');
			})
		} else {
			$(document.fNewCategory).prepend(`
				<div class="error text-danger p-3">
					<i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> ya está creada.
				</div>
			`);
		}
	}

	// Formulario de eliminación de categorías
	showRemoveCategoryForm(categories) {
		this.main.empty();

		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container = $(`<div id="remove-category" class="container my-3">
			<h1 class="display-5 ns">Eliminar una categoría</h1>
			<div id="category-list" class="row"></div>
		</div>`);

		for (let [key, value] of categories){
			container.children().nextAll('div').append(`<div class="cat1 col-lg-3 col-md-6">
				<div class="cat-list-text">
					<h3>${value.title}</h3>
					<div class="rmv1"><button class="btn btn-primary" data-category="${value.title}" type='button'>Eliminar</button></div>
				</div>
			</div>`);
		}

		this.categories.append(container);
		this.main.append(container);
	}

	// Modal de eliminación de categorias
	showRemoveCategoryModal(done, cat, position, error) {
		$('remove-category').find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="removeCategoryModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removeCategoryModalLabel">Categoría eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La categoría <strong>${cat.title}</strong> ha sido eliminada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let removeCategoryModal = $('#removeCategoryModal');
				removeCategoryModal.modal('show');
				removeCategoryModal.find('button').click(() => {
					removeCategoryModal.on('hidden.bs.modal', function (event) {
						this.remove();
				});
				removeCategoryModal.modal('hide');
				let divCat = $('#remove-category').find(`div > div:nth-child(${position + 1})`);
				divCat.remove();
			})
		} else {
			$('#removeCategoryModal').prepend(`
				<div class="error text-danger p-3">
					<i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> no exite en el almacén.
				</div>
			`);
		}
	}

	bindRemoveCategoryForm(handler){
		$('#remove-category').find('button').click(function (event){
			handler(this.dataset.category, $(this).closest('div.cat').index());
		})
	}

	// Formulario de creación de tiendas
	showNewStoreForm() {
		this.main.empty();
		if(this.stores.children().length > 1) this.stores.children()[1].remove();

		let container = $(`
		<div id="new-store" class="container my-3">
			<h1 class="display-5 ns">Nueva Tienda</h1>
			<form class="form" method="post" name="fNewStore" role="form" novalidate>
					<div class="col-md-6 mb-3">
						<label for="ncCif">Cif *</label>
						<div class="input-group">
							<input type="text" class="form-control" id="ncCif" name="ncCif" placeholder="Cif de Tienda" aria-describedby="cifPrepend" value="" required>
							<div class="invalid-feedback">El cif es obligatorio.</div>
							<div class="valid-feedback">Correcto.</div> </div>
						</div>
					<div class="col-md-6 mb-3">
					<label for="ncName">Nombre *</label>
					<div class="input-group">
						<input type="text" class="form-control" id="ncName" name="ncName" placeholder="Nombre de Tienda" aria-describedby="namePrepend" value="" required>
						<div class="invalid-feedback">El nombre es obligatorio.</div>
						<div class="valid-feedback">Correcto.</div> </div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="ncAddress">Dirección</label>
						<div class="input-group">
							<input type="text" class="form-control" id="ncAddress" name="ncAddress" placeholder="Dirección de Tienda" aria-describedby="adrPrepend" value="" required>
							<div class="invalid-feedback"></div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="ncPhone">Teléfono *</label>
						<div class="input-group">
							<input type="number" class="form-control" id="ncPhone" name="ncPhone" placeholder="Número de contacto de Tienda" aria-describedby="phonePrepend" value="" required>
							<div class="invalid-feedback">El teléfono no es válido.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="ncCoords">Coordenadas</label>
						<div class="input-group">
							<input type="text" class="form-control" id="ncCoords" name="ncCoords" placeholder="Coordenadas de Tienda" aria-describedby="adrPrepend" value="" required>
							<div class="invalid-feedback"></div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="container"><div class="m-4" id="mapid"></div></div>

					<div class="ns">
						<button id="btnEnviar" class="btn btn-primary" type="submit">Enviar</button>
						<button class="btn btn-primary" type="reset">Cancelar</button>
					</div>
				</div>
			</form>
		</div>`);
		this.main.append(container);
		let mapContainer = $('#mapid');
		mapContainer.css({ height: '350px', border: '2px solid #faa541' });
		let map = L.map('mapid').setView([38.990831799999995, -3.9206173000000004], 15);
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
			maxZoom: 18
		}).addTo(map);
		map.on('click', function(event) {
			L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
			$('#ncCoords').val(event.latlng.lat.toLocaleString() + ", " + event.latlng.lng.toLocaleString());
		});
		map.on('contextmenu', function(event) {
			marker.setLatLng([event.latlng.lat, event.latlng.lng]);
		});
	}

	// Modal de creación de tiendas
	showNewStoreModal(done, sto, error) {
		$(document.fNewStore).find('div.error').remove();
		if(done) {
			let modal = $(`
				<div class="modal fade" id="newStoreModal" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newStoreModalLabel" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="newStoreModalLabel">Tienda creada</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body"> La tienda <strong>${sto.name}</strong> ha sido creada correctamente. </div>
							<div class="modal-footer">
								<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
							</div>
						</div>
					</div>
				</div>
			`);

			$('body').append(modal);
			let newStoreModal = $('#newStoreModal');
			newStoreModal.modal('show');
			newStoreModal.find('button').click(() => {
				newStoreModal.on('hidden.bs.modal', function (event) {
					document.fNewStore.reset();
					document.fNewStore.ncCif.focus();
					this.remove();
				});
				newStoreModal.modal('hide');
			})
		} else {
			$(document.fNewStore).prepend(`
				<div class="error text-danger p-3">
					<i class="fas fa-exclamation-triangle"></i> La tienda <strong>${sto.name}</strong> ya está creada.
				</div>
			`);
		}
	}

	// Formulario de eliminación de tiendas
	showRemoveStoreForm(stores) {
		this.main.empty();
		if (this.stores.children().length > 1)
			this.stores.children()[1].remove();
		let container = $(`<div id="remove-store" class="container my-3">
			<h1 class="display-5 ns">Eliminar una tienda</h1>
			<div id="store-list" class="row"></div>
			</div>`);

		for (let [key] of stores){
			container.children().nextAll('div').append(`<div class="cat col-lg-3 col-md-6">
				<div class="sto-list-text">
					<div><h3>${key.name}</h3></div>
					<div class="rmv"><button class="btn btn-primary" data-store="${key.cif}" type='button'>Eliminar</button></div>
				</div>
			</div>`);
		}
		this.stores.append(container);
		this.main.append(container);
	}

	// Modal de eliminación de tiendas
	showRemoveStoreModal(done, sto, position, error) {
		$('remove-store').find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="removeStoreModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeStoreModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-name" id="removeStoreModalLabel">Tienda eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La tienda <strong>${sto.name}</strong> ha sido eliminada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let removeStoreModal = $('#removeStoreModal');
				removeStoreModal.modal('show');
				removeStoreModal.find('button').click(() => {
				removeStoreModal.on('hidden.bs.modal', function (event) {
					this.remove();
				});
				removeStoreModal.modal('hide');
				let divSto = $('#remove-store').find(`div > div:nth-child(${position + 1})`);
				divSto.remove();
			})
		} else {
			$('#removeStoreModal').prepend(`
				<div class="error text-danger p-3">
					<i class="fas fa-exclamation-triangle"></i> La tienda <strong>${sto.name}</strong> no exite en el almacén.
				</div>
			`);
		}
	}

	bindRemoveStoreForm(handler){
		$('#remove-store').find('button').click(function (event){
			handler(this.dataset.store, $(this).closest('div.sto').index());
		})
	}

// Muestra los productos listados de una tienda ordenados por categorias de la tienda
listProductsStores(products, name, coords) {
	this.main.empty();
	let container = $(`<div id="product-list" class="container center my-3 row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>`);
	for (let product of products) {
		container.append(`<div class="col mb-5">
			<figure class="card h-100  ${product.constructor.name}-css">
				<figcaption class="info-wrap">
					<div class="sto-list-image">
						<img class="card-img-top images" src="${product.images}" alt="${product.title}" />
					</div>
				</figcaption>
					<div id="etiqueta" class="card-body p-4">
						<div class="text-center">
							<h6 class="fw-bolder">${product.title}</h6>
							<span class="price p">Precio - ${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span><br>
							<div class="bottom-wrap">
								<div class="cart mt-4 align-items-center">
									<button data-serial="${product.serialNumber}" class="bOpen btn btn-primary float-right mr-2 px-4"> Información </button>
									<button data-serial="${product.serialNumber}" id="bDelete" class="bBuy btn btn-primary float-right mr-2 px-4"> Eliminar </button>
								</div>
							</div>
						</div>
					</div>
				</a>
			</figure>
		</div>`);
	}
	//this.main.prepend(`<div id="filtro">Filtrar por <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.."></div>`);
	this.main.prepend(`<hr></hr>`);
	this.main.prepend($('<div class="container"><div class="m-4" id="mapid"></div></div>'));
	this.main.prepend(`<h1 id="h1-name" class="text-uppercase text-center">${name}</h1>`);
	this.main.prepend(`<hr></hr>`);

	let mapContainer = $('#mapid');
	mapContainer.css({ height: '350px', border: '2px solid #faa541' });
	let map = L.map('mapid').setView([coords.latitude, coords.longitude], 15);
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18
	}).addTo(map);
	let circle = L.circle([coords.latitude, coords.longitude], {
		color: '#2E8848',
		fillColor: '#90E6A9',
		fillOpacity: 0.5,
		radius: 100
	}).addTo(map);

	this.main.append(container);
	for (let product of products) {
		$('.Movie-css').css('border', '2px solid #75cc96');
		$('.Game-css').css('border', '2px solid #e85b5b');
		$('.Book-css').css('border', '2px solid #77a6d3');
	}
}


	// Muestra los productos listados de una tienda ordenados por categorias
	listProductsCategories(products, name) {
		this.main.empty();
		let container = $(`<div id="product-list" class="container center my-3 row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>`);
		for (let product of products) {
			container.append(`<div class="col mb-5">
				<figure class="card h-100  ${product.constructor.name}-css">
					<figcaption class="info-wrap">
						<div class="sto-list-image">
							<img class="card-img-top images" src="${product.images}" alt="${product.title}" />
						</div>
					</figcaption>
						<div id="etiqueta" class="card-body p-4">
							<div class="text-center">
								<h6 class="fw-bolder">${product.title}</h6>
								<span class="price p">Precio - ${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span><br>
								<div class="bottom-wrap">
									<div class="cart mt-4 align-items-center">
										<button data-serial="${product.serialNumber}" class="bOpen btn btn-primary float-right mr-2 px-4"> Información </button>
										<button data-serial="${product.serialNumber}" id="bDelete" class="bBuy btn btn-primary float-right mr-2 px-4"> Eliminar </button>
									</div>
								</div>
							</div>
						</div>
					</a>
				</figure>
			</div>`);
		}
		//this.main.prepend(`<div id="filtro">Filtrar por <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.."></div>`);
		this.main.prepend(`<h1 id="h1-name" class="text-uppercase text-center">${name}</h1>`);
		this.main.prepend(`<hr></hr>`);
		this.main.append(container);
		for (let product of products) {
			$('.Movie-css').css('border', '2px solid #75cc96');
			$('.Game-css').css('border', '2px solid #e85b5b');
			$('.Book-css').css('border', '2px solid #77a6d3');
		}
	}

	bindProductsStoreList(handler){
		$('#store-list').find('a').click((event) => {
			let store = $(event.target).closest($('a')).get(0).dataset.store;
			this.#executeHandler(
				handler, [store],
				'#product-list',
				{action: 'productsStoreList', store: store},
				'#store-list', event
			);
			//handler(this.dataset.store);
		});
	}

	bindMapStores(stores, coords) {
		$('.navMap').click((event) => {
			this.main.empty();
			this.main.append($('<div class="container"><h1 class="ns">Mapa de Tiendas</h1><div class="m-4" id="mapid"></div></div>'));

			let mapContainer = $('#mapid');
			mapContainer.css({ height: '350px', border: '2px solid #faa541' });
			let map = L.map('mapid').setView([38.9884, -3.928], 15);
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
				maxZoom: 18
			}).addTo(map);

			for (let store of stores) {
				let circle = L.circle([store[0].coords.latitude, store[0].coords.longitude], {
					color: '#2E8848',
					fillColor: '#90E6A9',
					fillOpacity: 0.5,
					radius: 100
				}).addTo(map);
				circle.bindPopup(store[0].name);
			}
		});
	}

	bindProductsStoreListInMenu(handler) {
		$('#navStos').next().children().click((event) => {
			let store = $(event.target).closest($('a')).get(0).dataset.store;
			this.#executeHandler(
				handler, [store],
				'#product-list',
				{action: 'productsStoreList', store: store},
				'#store-list', event
			);
			//handler(this.dataset.store);
		});
	}

	bindProductsCategoryListInMenu(handler) {
		$('#navCats').next().children().click((event) => {
			let category = $(event.target).closest($('a')).get(0).dataset.category;
			this.#executeHandler(
				handler, [category],
				'#product-list',
				{action: 'productsCategoryList', category: category},
				'#category-list', event
			);
			//handler(this.dataset.category);
		});
	}

/*	bindProductsTypeList(handler){
		console.log($('#store-list').find('a'));
		$('#store-list').find('a').click(function(event){
			handler(this.dataset.type);
		});
	}

	bindShowProduct(handler){
		$('#product-list').find('a.img-wrap').click(function(event){
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			this.#executeHandler(
				handler, [serial],
				'#single-product',
				{action: 'showProduct', serial: serial},
				'#single-product', event
			);
		});
		$('#product-list').find('figcaption a').click(function(event){
			this.#executeHandler(
				handler, [event.target.dataset.serial],
				'#single-product',
				{action: 'showProduct', serial: event.target.dataset.serial},
				'#product-list', event
			);
		});
	}*/

	bindShowProductInNewWindow(handler){
		$('.bOpen').click((event) => {
			let tam = this.productWindow.length;
			this.productWindow.push(window.open("product.html", tam, "width=1000, height=660, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"));
			this.productWindow[this.productWindow.length - 1].addEventListener('DOMContentLoaded', () => {
				handler(event.target.dataset.serial);
			});
		});
		$('#bCloseNav').click(() => {
			for (let p of this.productWindow) {
				if (p && !(p.closed)) {
					p.close();
					console.log('Acabas de cerrar la ventana.');
				} else {
					console.log('La ventana está cerrada.');
				}
			}
		});
	}

	bindAdminMenu(hNewProduct, hRemoveProduct, hNewCategory, hRemoveCategory, hNewStore, hRemoveStore) {
		$('#lnewProduct').click((event) => {
			this.#executeHandler(
				hNewProduct, [],
				'#new-product',
				{action: 'newProduct'},
				'#', event
			);
		});
		$('#lnewCategory').click((event) => {
			this.#executeHandler(
				hNewCategory, [],
				'#new-category',
				{action: 'newCategory'},
				'#', event
			);
		});
		$('#lnewStore').click((event) => {
			this.#executeHandler(
				hNewStore, [],
				'#new-store',
				{action: 'newStore'},
				'#', event
			);
		});
		$('#ldelProduct').click((event) => {
			this.#executeHandler(
				hRemoveProduct, [],
				'#remove-product',
				{action: 'removeProduct'},
				'#', event
			);
		});
		$('#ldelCategory').click((event) => {
			this.#executeHandler(
				hRemoveCategory, [],
				'#remove-category',
				{action: 'removeCategory'},
				'#', event
			);
		});
		$('#ldelStore').click((event) => {
			this.#executeHandler(
				hRemoveStore, [],
				'#remove-store',
				{action: 'removeStore'},
				'#', event
			);
		});
	}

	bindNewProductForm(handler) {
		newProductValidation(handler);
	}

	bindNewCategoryForm(handler) {
		newCategoryValidation(handler);
	}

	bindNewStoreForm(handler) {
		newStoreValidation(handler);
	}

	bindAdminBackup(products, categories, stores) {
		$('#lBackup').click((event) => {
			let cont = 0;
			let arP = [];
			let arC = [];
			let arS = [];
			let general = [];

			for (let p of products) {
				arP.push({
					serialNumber: p[0].serialNumber,
					name: p[0].name,
					description: p[0].description,
					price: p[0].price,
					tax: p[0].tax
				});

				if(p[0].constructor.name === "Movie") {
					arP[cont].title = p[0].title;
					arP[cont].director = p[0].director;
					arP[cont].year = p[0].year;
				}
				if(p[0].constructor.name === "Game") {
					arP[cont].title = p[0].title;
					arP[cont].company = p[0].company;
					arP[cont].size = p[0].size;
					arP[cont].year = p[0].year;
				}
				if(p[0].constructor.name === "Book") {
					arP[cont].title = p[0].title;
					arP[cont].author = p[0].author;
					arP[cont].pages = p[0].pages;
					arP[cont].year = p[0].year;
				}

				cont++;
			}
			general.push(arP);

			for (let c of categories) {
				arC.push({
					title: c[1].title,
					description: c[1].description,
					url: c[1].url
				});
			}
			general.push(arC);

			for (let s of stores) {
				arS.push({
					cif: s[0].cif,
					name: s[0].name,
					address: s[0].address,
					phone: s[0].phone
				});
			}
			general.push(arS);

			let data = JSON.stringify(general);

			$.ajax({
				type: "post",
				url: "writeBackup.php",
				dataType: "json",
				data: data
			});
		});
	}

	showBackupInMenu() {
		let container = $('#navMenu2');
		container.append(`<a id="lBackup" class="dropdown-item" href="#backup">Realizar backup</a>`);
	}

	checkCookie(cname) {
		let user = this.getCookie(cname);

		if(user === "admin") {
			this.greetUser();
			$('#bLogin').remove();
			$('#mainNav').append(`
				<button id="bLogout" class="btn btn-outline-dark"> Log Out </button>
			`);
			$('#bLogout').click(() => {
				this.setCookie('username', '', 0);
				this.setCookie('pwd', '', 0);
				location.reload();
			});
			this.showBackupInMenu();
		} else {
			$('#liAdmin').empty();
		}
	}

	setCookie(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	getCookie(cname) {
		let re = new RegExp('(?:(?:^|.*;\\s*)' + cname + '\\s*\\=\\s*([^;]*).*$)|^.*$');
		return document.cookie.replace(re, "$1");
	}

	greetUser() {
		let user = this.getCookie('username');
		$('#saludo').empty().append('Hola ' + user);
	}

	showNewLoginForm() {
		$('#bLogin').click(() => {
			$('#id01').css('display', 'block');
			$('#btnEnter').click(() => {
				$('#id01').css('display', 'none');
				let name = document.getElementsByName('uname')[0].value;
				let pwd = document.getElementsByName('upwd')[0].value;
				this.setCookie('username', name, 1);
				this.setCookie('pwd', pwd, 1);
				location.reload();
			});
		});
	}

	removeCookie() {
		this.setCookie('pwd', pwd, 0);
	}

	bindShowJSONFile() {
		let bLoad = $(`<div id="btnLoad"><button class="btn btn-primary">Cargar HTML 1</button></div>`);
		$('#head').append(bLoad);

		$('#btnLoad').click(function (event) {
			fetch('tarea.json').then(function (response) {
				console.log(response.url);
				console.log(response.status);
				console.log(response.statusText);
				return response.json();
			}).then(function (data) {
				this.main.empty();
				this.main.append(`
						<div class="container">
							<h1>Product List</h1>
							<ul id="jp">
							</ul>
						</div>
					</div>
				`);

				for (let p of data[0]) {
					$('#jp').append(`
						<li>${p.serialNumber} - ${p.name} - ${p.description} - ${p.price}€ - ${p.tax} -
					`);

					if(p.director !== undefined) {
						$('#jp').append(`
							${p.title} - ${p.director} - ${p.year}</li>
						`);
					}
					if(p.company !== undefined) {
						$('#jp').append(`
							${p.title} - ${p.company} - ${p.size} - ${p.year}</li>
						`);
					}
					if(p.author !== undefined) {
						$('#jp').append(`
							${p.title} - ${p.author} - ${p.pages}pages - ${p.year}</li>
						`);
					}
				}
				this.main.append(`
						<div class="container">
							<h1>Category List</h1>
							<ul id="jc">
							</ul>
						</div>
					</div>
				`);
				for (let c of data[1]) {
					$('#jc').append(`
						<li>${c.title} - ${c.description} - ${c.url}</li>
					`);
				}
				this.main.append(`
						<div class="container">
							<h1>Store List</h1>
							<ul id="js">
							</ul>
						</div>
					</div>
				`);
				for (let s of data[2]) {
					$('#js').append(`
						<li>${s.cif} - ${s.name} - ${s.address} - ${s.phone}</li>
					`);
				}
			}).catch(function (error) {
				console.log(error.menssage);
			})
		});
	}
}

export default StoreHouseView;
