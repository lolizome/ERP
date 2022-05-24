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
		let li = $(`<li class="nav-item dropdown">
		<a id="navAdmin" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
			Gestiones
		</a>
		</li>`);
		let container = $(`<div class="dropdown-menu" aria-labelledby="navAdmin">
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

		let container = $(`<div id="new-product" class="container my-3">
			<h1 class="display-5">Nueva producto</h1>
		</div>`);
		let form = $(`<form name="fNewProduct" role="form" novalidate><form>`);
		form.append(`<div class="form-row">
			<div class="col-md-12 mb-3">
				<label for="ncTitle">Número de serie *</label>
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text" id="serialPrepend"><i class="fas fa-key"></i></span>
					</div>
					<input type="text" class="form-control" id="npSerial" name="npSerial" placeholder="Número de serie" aria-describedby="serialPrepend" value="" required>
					<div class="invalid-feedback">El número de serie es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
		</div>`);
		form.append(`<div class="form-row">
		<div class="col-md-6 mb-3">
			<label for="ncTitle">Nombre *</label>
			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text" id="brandPrepend"><i class="fas fa-pen-fancy"></i></span>
				</div>
				<input type="text" class="form-control" id="npBrand" name="npBrand" placeholder="Nombre" aria-describedby="brandPrepend" value="" required>
				<div class="invalid-feedback">El nombre es obligatorio.</div>
				<div class="valid-feedback">Correcto.</div>
			</div>
		</div>
	</div>`);
	form.append(`<div class="form-row mb-2">
			* Tipo de producto
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
	</div>`);
	form.append(`<div class="form-row">
		<div class="col-md-3 mb-3">
			<label for="ncTitle">Precio *</label>
			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text" id="pricePrepend"><i class="fas fa-euro-sign"></i></span>
				</div>
				<input type="number" class="form-control" id="npPrice" name="npPrice" min="0" step="10" placeholder="Precio" aria-describedby="pricePrepend" value="" required>
				<div class="invalid-feedback">El precio es obligatorio.</div>
				<div class="valid-feedback">Correcto.</div>
			</div>
		</div>
		<div class="col-md-3 mb-3">
			<label for="npTax">Porcentaje de impuestos</label>
			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text" id="taxPrepend"><i class="fas fa-percentage"></i></span>
				</div>
				<input type="number" class="form-control" id="npTax" name="npTax" min="0" step="1" placeholder="21%" aria-describedby="taxPrepend" value="21" required>
				<div class="invalid-feedback">Los impuestos son obligatorios.</div>
				<div class="valid-feedback">Correcto.</div>
			</div>
			</div>
			<div class="col-md-6 mb-3">
				<label for="npUrl">URL *</label>
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text" id="urlPrepend"><i class="fas fa-image"></i></span>
					</div>
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

		form.append(`<button class="btn btn-primary m-1" type="submit">Enviar</button>`);
		form.append(`<button class="btn btn-primary m-1" type="reset">Cancelar</button>`);
		container.append(form);
		this.main.append(container);
	}

	// Modal de creación de productos
	showNewProductModal(done, product, error) {
		$(document.fNewProduct).find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="newProductModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Producto creado</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							El producto <strong>${product.name}</strong> ha sido creada correctamente.
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
	showRemoveProductForm() {
		this.main.empty();
		let container = $(`<div id="remove-category" class="container my-3">
			<h1 class="display-5">Eliminar un producto</h1>
			<div id="product-list" class="row"></div>
			</div>`);

		for (let product of products) {
			container.children().nextAll('div').append(`<div class="col mb-5">
				<figure class="card h-100  ${product.constructor.name}-css">
					<figcaption class="info-wrap">
						<div class="sto-list-image">
							<img class="card-img-top images" src="${product.images}" alt="${product.title}" />
						</div>
					</figcaption>
						<div id="etiqueta" class="card-body p-4">
							<div class="text-center">
								<h6 class="fw-bolder">${product.title}</h6>
								<div class="bottom-wrap">
									<div class="cart mt-4 align-items-center">
										<div><button class="btn btn-primary" data-category="${category.title}" type='button'>Eliminar</button></div>
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
	showRemoveProductModal(done, cat, position, error) {
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
			<form class="form" name="fNewCategory" role="form" novalidate>
					<div class="col-md-6 mb-3">
						<label for="ncTitle">Título *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="titlePrepend">
									<i class="fas fa-heading"></i>
								</span>
							</div>
							<input type="text" class="form-control" id="ncTitle" name="ncTitle" placeholder="Título de categoría" aria-describedby="titlePrepend" value="" required>
							<div class="invalid-feedback">El título es obligatorio.</div>
							<div class="valid-feedback">Correcto.</div> </div>
						</div>
					<div class="col-md-6 mb-3">
						<label for="ncDescription">Descripción</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="descPrepend">
									<i class="fas fa-align-left"></i>
								</span>
							</div>
							<input type="text" class="form-control" id="ncDescription" name="ncDescription"aria-describedby="descPrepend" value="" required>
							<div class="invalid-feedback"></div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="ncUrl">URL *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="urlPrepend">
									<i class="fas fa-image"></i>
								</span>
							</div>
							<input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="http://www.test.es" aria-describedby="urlPrepend" value="" required>
							<div class="invalid-feedback">La URL no es válida.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
				<div>
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
			<h1 class="display-5">Eliminar una categoría</h1>
			<div id="category-list" class="row"></div>
			</div>`);

		for (let [key, value] of categories){
			container.children().nextAll('div').append(`<div class="cat col-lg-3 col-md-6">
				<div class="cat-list-text">
					<h3>${value.title}</h3>
					<div><button class="btn btn-primary" data-category="${value.title}" type='button'>Eliminar</button></div>
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
			<h1 class="display-5">Nueva Tienda</h1>
			<form class="form" name="fNewStore" role="form" novalidate>
					<div class="col-md-6 mb-3">
						<label for="ncCif">Cif *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="cifPrepend">
									<i class="fas fa-heading"></i>
								</span>
							</div>
							<input type="text" class="form-control" id="ncCif" name="ncCif" placeholder="Cif de Tienda" aria-describedby="cifPrepend" value="" required>
							<div class="invalid-feedback">El cif es obligatorio.</div>
							<div class="valid-feedback">Correcto.</div> </div>
						</div>
					<div class="col-md-6 mb-3">
					<label for="ncName">Nombre *</label>
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text" id="namePrepend">
								<i class="fas fa-heading"></i>
							</span>
						</div>
						<input type="text" class="form-control" id="ncName" name="ncName" placeholder="Nombre de Tienda" aria-describedby="namePrepend" value="" required>
						<div class="invalid-feedback">El nombre es obligatorio.</div>
						<div class="valid-feedback">Correcto.</div> </div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="ncAddress">Dirección</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="adrPrepend">
									<i class="fas fa-align-left"></i>
								</span>
							</div>
							<input type="text" class="form-control" id="ncAddress" name="ncAddress"aria-describedby="adrPrepend" value="" required>
							<div class="invalid-feedback"></div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="ncPhone">Teléfono *</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="phonePrepend">
									<i class="fas fa-image"></i>
								</span>
							</div>
							<input type="number" class="form-control" id="ncPhone" name="ncPhone" placeholder="" aria-describedby="phonePrepend" value="" required>
							<div class="invalid-feedback">El teléfono no es válido.</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<label for="ncCoords">Coordenadas</label>
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text" id="coordsPrepend">
								<i class="fas fa-align-left"></i>
							</span>
						</div>
						<input type="text" class="form-control" id="ncCoords" name="ncCoords"aria-describedby="coordsPrepend" value="" required>
						<div class="invalid-feedback"></div>
						<div class="valid-feedback">Correcto.</div>
					</div>
				</div>
				<div>
					<button id="btnEnviar" class="btn btn-primary" type="submit">Enviar</button>
					<button class="btn btn-primary" type="reset">Cancelar</button>
				</div>
			</form>
		</div>`);
		this.main.append(container);
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
			<h1 class="display-5">Eliminar una tienda</h1>
			<div id="store-list" class="row"></div>
			</div>`);

		for (let [key] of stores){
			container.children().nextAll('div').append(`<div class="cat col-lg-3 col-md-6">
				<div class="sto-list-text">
					<h3>${key.name}</h3>
					<div><button class="btn btn-primary" data-store="${key.cif}" type='button'>Eliminar</button></div>
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

	// Muestra los productos listados de una tienda ordenados por categorias
	listProducts(products, name) {
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
}

export default StoreHouseView;
