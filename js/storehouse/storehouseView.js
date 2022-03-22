import StoreHouse from './storehouseModel.js';

class StoreHouseView {
	constructor() {
		this.main = $('main');
		this.stores = $('#stores');
		this.categories = $('#categories');
		this.menu = $('.navbar-nav');
	}

	bindInit(handler) {
		$('#init').click((event) => {
			handler();
		});
		$('#logo').click((event) => {
			handler();
		});
	}

	showStores(stores) {
		this.main.empty();
		if (this.stores.children().children().length > 1) this.stores.children().remove();
		let container = $('<div id="store-list" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>');
		for (let [key] of stores) {
			container.append(`<div class="col mb-5">
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
	}

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
										<div class="cart mt-4 align-items-center"> <button data-serial="${product.serial}" class="btn btn-primary text-uppercase mr-2 px-4">Comprar</button> </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`);

			container.find('.characteristics').after(this.#instance[product.constructor.name]);

		} else {
			container = $(` <div class="container mt-5 mb-5">
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

	showStoresInMenu(stores) {
		let li = $(`<li class="nav-item dropdown">
			<a id="navStos" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				Tiendas
			</a>
		</li>`);
		let container = $('<div class="dropdown-menu" aria-labelledby="navStos"></div>');
		//container.append(`<li><a class="dropdown-item" href="#!">Todas las Tiendas</a></li><li><hr class="dropdown-divider" /></li>`);
		for (let [key] of stores) {
			container.append(`<a data-store="${key.cif}" class="dropdown-item" href="#product-list">${key.name}</a>`);
		}
		li.append(container);
		this.menu.append(li);
	}

	showCategoriesInMenu(categories) {
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
		li.append(container);
		this.menu.append(li);
	}

	// Muestra los productos listados de una tienda ordenados por categorias
	listProducts(products, name) {
		this.main.empty();
		let container = $(`<div id="product-list" class="container center my-3 row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>`);
		for (let product of products) {
			container.append(`<div class="col mb-5">
				<figure class="card h-100  ${product.constructor.name}-css"><a data-serial="${product.serialNumber}" class="btn-link disabled img-wrap" href="#single-product">
					<figcaption class="info-wrap">
						<div class="sto-list-image">
							<img class="card-img-top images" src="${product.images}" alt="${product.title}" />
						</div>
					</figcaption>
						<div class="card-body p-4">
							<div class="text-center">
								<h6 class="fw-bolder">${product.title}</h6>
								<span class="price p">Precio - ${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span><br>
								<div class="bottom-wrap">
									<a href="#" data-serial="${product.serialNumber}" class="btn btn-primary float-right"> Comprar </a>
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
		$('#store-list').find('a').click(function(event){
			handler(this.dataset.store);
		});
	}

	bindProductsStoreListInMenu(handler) {
		$('#navStos').next().find('a').click(function(event){
			handler(this.dataset.store);
		});
	}


	bindProductsCategoryListInMenu(handler) {
		$('#navCats').next().find('a').click(function(event){
			handler(this.dataset.category);
		});
	}

/*	bindProductsTypeList(handler){
		console.log($('#store-list').find('a'));
		$('#store-list').find('a').click(function(event){
			handler(this.dataset.type);
		});
	}*/

	bindShowProduct(handler){
		$('#product-list').find('a.img-wrap').click(function(event){
			handler(this.dataset.serial);
		});
		$('#product-list').find('figcaption a').click(function(event){
			handler(this.dataset.serial);
		});
	}
}

export default StoreHouseView;
