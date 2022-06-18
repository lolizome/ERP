import StoreHouse from './storehouseModel.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
	ExistValueException,
	NotExistValueException,
	NegativeValueException } from './storehouseModel.js';
import {Product, Movie, Game, Book, Coords, Store, Category} from './storehouseModel.js';
import {StoreHouseException, ObjecStoreHouseException} from './storehouseModel.js';

class StoreHouseController {
	#modelStoreHouse;
	#viewStoreHouse;

	#loadStoreHouseObjects() {
		let sh  = this.#modelStoreHouse;
		function modelSH() {
			return sh;
		}

		return new Promise((resolve, reject) => {
			fetch('tarea.json', {
				method: 'get'
			}).then(function(response) {
				return response.json();
			}).then(function(data) {
				let sh = modelSH();
				let arP = [];
				let arC = [];
				let arS = [];

				for (let cat of data[1]) {
					let category = new Category(cat.title, cat.description, cat.url);
					arC.push(category);
					sh.addCategory(category);
				}
				for (let pro of data[0]) {
					let product, category;

					if(pro.hasOwnProperty("director")) {
						product = new Movie(pro.serialNumber, pro.name, pro.description, pro.price, pro.tax, pro.images, pro.title, pro.director, pro.year);
						category = sh.getCategory("Peliculas");
					}
					if(pro.hasOwnProperty("company")) {
						product = new Game(pro.serialNumber, pro.name, pro.description, pro.price, pro.tax, pro.images, pro.title, pro.company, pro.size, pro.year);
						category = sh.getCategory("Juegos");
					}
					if(pro.hasOwnProperty("author")) {
						product = new Book(pro.serialNumber, pro.name, pro.description, pro.price, pro.tax, pro.images, pro.title, pro.author, pro.pages, pro.year);
						category = sh.getCategory("Libros");
					}
					arP.push(product);
					sh.addProduct(product, category);
				}
				for (let sto of data[2]) {
					let coord = new Coords(sto.latitude, sto.longitude);
					let store = new Store(sto.cif, sto.name, sto.address, sto.phone, coord);
					arS.push(store);
					sh.addShop(store);
				}

				sh.addProductInShop(arP[0], arS[0], 14);
				sh.addProductInShop(arP[1], arS[1], 2);
				sh.addProductInShop(arP[2], arS[2], 12);
				sh.addProductInShop(arP[3], arS[0], 4);
				sh.addProductInShop(arP[4], arS[0], 2);
				sh.addProductInShop(arP[5], arS[2], 12);
				sh.addProductInShop(arP[6], arS[2], 3);
				sh.addProductInShop(arP[7], arS[1], 1);
				sh.addProductInShop(arP[8], arS[0], 10);
				sh.addProductInShop(arP[9], arS[3], 5);
				sh.addProductInShop(arP[10], arS[1], 5);
				sh.addProductInShop(arP[11], arS[3], 15);
				sh.addProductInShop(arP[12], arS[0], 5);
				sh.addProductInShop(arP[13], arS[3], 5);
				sh.addProductInShop(arP[14], arS[3], 15);
				sh.addProductInShop(arP[4], arS[1], 15);
				sh.addProductInShop(arP[3], arS[4], 15);

				resolve(sh);
			});
		});
	}

	constructor(modelStoreHouse, viewStoreHouse) {
		this.#modelStoreHouse = modelStoreHouse;
		this.#viewStoreHouse = viewStoreHouse;

		this.onAddFileJSON();
		this.onLoad().then((sh) => {
			this.onInit();
			this.#viewStoreHouse.bindInit(this.handleInit);
		});
	}

	onLoad = () => {
		return new Promise((resolve, reject) => {
			this.#loadStoreHouseObjects().then((sh) => {
				this.onAddStore();
				this.onAddCategory();
				this.onAddMap();
				this.#viewStoreHouse.showAdminInMenu();
				this.#viewStoreHouse.bindAdminMenu(
					this.handleNewProductForm,
					this.handleRemoveProductForm,
					this.handleNewCategoryForm,
					this.handleRemoveCategoryForm,
					this.handleNewStoreForm,
					this.handleRemoveStoreForm
				);
				this.#viewStoreHouse.checkCookie('username');
				this.#viewStoreHouse.showNewLoginForm();
				this.#viewStoreHouse.bindAdminBackup(
					this.#modelStoreHouse.products,
					this.#modelStoreHouse.categories,
					this.#modelStoreHouse.stores
				);

				resolve(sh);
			});;
		});;

	}

	onInit = () => {
		this.#viewStoreHouse.showStores(this.#modelStoreHouse.stores);
		this.#viewStoreHouse.bindProductsStoreList(
			this.handleProductsStoreList
		);
	}

	onAddStore = () => {
		this.#viewStoreHouse.showStoresInMenu(this.#modelStoreHouse.stores);
		this.#viewStoreHouse.bindProductsStoreListInMenu(
			this.handleProductsStoreList
		);
	}

	onAddCategory = () => {
		this.#viewStoreHouse.showCategoriesInMenu(this.#modelStoreHouse.categories);
		this.#viewStoreHouse.bindProductsCategoryListInMenu(
			this.handleProductsCategoryList
		);
	}

	onAddMap = () => {
		this.#viewStoreHouse.showMapStores();
		this.#viewStoreHouse.bindMapStores(this.#modelStoreHouse.stores);
	}

	onAddFileJSON = () => {
		this.handleUpFileJSON();
	}

	handleInit = () => {
		this.onInit();
	}

	handleProductsStoreList = (cif) => {
		let store = this.#modelStoreHouse.getStore(cif);
		this.#viewStoreHouse.listProductsStores(this.#modelStoreHouse.getShopProducts(store), store.name, store.coords);
		//this.#viewStoreHouse.bindShowProduct(this.handleShowProduct);
		this.#viewStoreHouse.bindShowProductInNewWindow(
			this.handleShowProductInNewWindow
		);
	}

	handleProductsCategoryList = (title) => {
		let category = this.#modelStoreHouse.getCategory(title);
		this.#viewStoreHouse.listProductsCategories(this.#modelStoreHouse.getCategoryProducts(category), category.title);
		//this.#viewStoreHouse.bindShowProduct(this.handleShowProduct);
		this.#viewStoreHouse.bindShowProductInNewWindow(
			this.handleShowProductInNewWindow
		);
	}

	/*handleProductsTypeList = (type) => {
		console.log(type);
		let instance = {
			Movie: Movie,
			Game: Game,
			Book: Book,
		}
		if (instance[type]){
			this.#viewStoreHouse.listProducts(this.#modelStoreHouse.getTypeProducts(instance[type]), type);
		} else {
			throw new Error (`${type} isn't a type of Product.`)
		}
		this.#viewStoreHouse.bindShowProduct(this.handleShowProduct);
	}*/

	handleShowProduct = (serialNumber) => {
		try {
			let product = this.#modelStoreHouse.getProduct(serialNumber);
			this.#viewStoreHouse.showProduct(product);
		} catch (error){
			this.#viewStoreHouse.showProduct(null, 'No existe este producto en la página.');
		}
	}

	handleShowProductInNewWindow = (serialNumber) => {
		try {
			let product = this.#modelStoreHouse.getProduct(serialNumber);
			this.#viewStoreHouse.showProductInNewWindow(product);
		} catch (error){
			this.#viewStoreHouse.showProductInNewWindow(null, 'No existe este producto en la página.');
		}
	}

	handleNewProductForm = () => {
		this.#viewStoreHouse.showNewProductForm();
		this.#viewStoreHouse.bindNewProductForm(this.handleCreateProduct);
	}

	handleNewCategoryForm = () => {
		this.#viewStoreHouse.showNewCategoryForm();
		this.#viewStoreHouse.bindNewCategoryForm(this.handleCreateCategory);
	}

	handleNewStoreForm = () => {
		this.#viewStoreHouse.showNewStoreForm();
		this.#viewStoreHouse.bindNewStoreForm(this.handleCreateStore);
	}

	handleCreateProduct = (serialNumber, name, desc, price, tax, url, type) => {
		let instance = {
			Movie: Movie,
			Game: Game,
			Book: Book,
		};
		let done, error, pro;

		try{
			pro = new instance[type](serial, name, desc, price, tax, url);
			this.#modelStoreHouse.addProduct(pro);
			done = true;
		} catch(exception) {
			done = false;
			error = exception;
		}

		this.#viewStoreHouse.showNewProductModal(done, pro, error);
	}

	handleCreateCategory = (title, url, desc) => {
		let cat = new Category(title, url);
		cat.description = desc;
		let done, error;

		try{
			this.#modelStoreHouse.addCategory(cat);
			done = true;
			this.onAddCategory();
		} catch(exception) {
			done = false;
			error = exception;
		}
		this.#viewStoreHouse.showNewCategoryModal(done, cat, error);
	}

	handleCreateStore = (cif, name, address, phone, coords) => {
		let res = coords.replace(/,/g, ".")
		let arLatLng = res.split(". ");
		let c = new Coords(arLatLng[0], arLatLng[1]);
		let sto = new Store(cif, name, address, phone, c);
		let done, error;

		try{
			this.#modelStoreHouse.addShop(sto);
			done = true;
			this.onAddStore();
		} catch(exception) {
			done = false;
			error = exception;
		}

		this.#viewStoreHouse.showNewStoreModal(done, sto, error);
	}

	handleRemoveProductForm = () => {
		this.#viewStoreHouse.showRemoveProductForm(this.#modelStoreHouse.products);
		this.#viewStoreHouse.bindRemoveProductForm(this.handleRemoveProduct);
	}

	handleRemoveProduct = (serialNumber, position) => {
		let done, error, pro;
		try{
			pro = this.#modelStoreHouse.getProduct(serialNumber);
			this.#modelStoreHouse.removeProduct(pro);

			done = true;
		} catch(exception){
			done = false;
			error = exception;
		}
		this.#viewStoreHouse.showRemoveProductModal(done, pro, position, error);
	}

	handleRemoveCategoryForm = () => {
		this.#viewStoreHouse.showRemoveCategoryForm(this.#modelStoreHouse.categories);
		this.#viewStoreHouse.bindRemoveCategoryForm(this.handleRemoveCategory);
	}

	handleRemoveCategory = (title, position) => {
		let done, error, cat;
		try{
			cat = this.#modelStoreHouse.getCategory(title);
			this.#modelStoreHouse.removeCategory(cat);
			done = true;
			this.onAddCategory();
		} catch(exception){
			done = false;
			error = exception;
		}
		this.#viewStoreHouse.showRemoveCategoryModal(done, cat, position, error);
	}

	handleRemoveStoreForm = () => {
		this.#viewStoreHouse.showRemoveStoreForm(this.#modelStoreHouse.stores);
		this.#viewStoreHouse.bindRemoveStoreForm(this.handleRemoveStore);
	}

	handleRemoveStore = (cif, position) => {
		let done, error, sto;
		try{
			sto = this.#modelStoreHouse.getStore(cif);
			this.#modelStoreHouse.removeShop(sto);
			done = true;
			this.onAddStore();
		} catch(exception){
			done = false;
			error = exception;
		}
		this.#viewStoreHouse.showRemoveStoreModal(done, sto, position, error);
	}

handleUpFileJSON = () => {
	let general = [
		[
			{
				"serialNumber": "111-111-111",
				"name": "mov1",
				"description": "Descripción del producto",
				"price": 10,
				"tax": 21,
				"images": "./js/images/m1.jpg",
				"title": "Sonic The Hedgehog",
				"director": "Jeff Fowler",
				"year": 2020
			},
			{
				"serialNumber": "222-222-221",
				"name": "gam1",
				"description": "Descripción del producto",
				"price": 100,
				"tax": 21,
				"images": "./js/images/g1.jpeg",
				"title": "Uncharted 1",
				"company": "Sony",
				"size": "2GB",
				"year": 2007
			},
			{
				"serialNumber": "111-111-112",
				"name": "mov2",
				"description": "Descripción del producto",
				"price": 12,
				"tax": 21,
				"images": "./js/images/m2.jpg",
				"title": "Sonic The Hedgehog 2",
				"director": "Jeff Fowler",
				"year": 2022
			},
			{
				"serialNumber": "111-111-113",
				"name": "mov3",
				"description": "Descripción del producto",
				"price": 13,
				"tax": 21,
				"images": "./js/images/m3.jpg",
				"title": "Avatar",
				"director": "James Cameron",
				"year": 2009
			},
			{
				"serialNumber": "111-111-114",
				"name": "mov4",
				"description": "Descripción del producto",
				"price": 20,
				"tax": 21,
				"images": "./js/images/m4.jpg",
				"title": "Bratz",
				"director": "Sean McNamaran",
				"year": 2007
			},
			{
				"serialNumber": "111-111-115",
				"name": "mov5",
				"description": "Descripción del producto",
				"price": 4,
				"tax": 21,
				"images": "./js/images/m5.jpg",
				"title": "Death Note Netflix",
				"director": "Adam Wingard",
				"year": 2017
			},
			{
				"serialNumber": "333-333-331",
				"name": "boo1",
				"description": "Descripción del producto",
				"price": 20,
				"tax": 21,
				"images": "./js/images/g1.jpeg",
				"title": "Harry Potter 1",
				"author": "J K Rowling",
				"pages": 450,
				"year": 1997
			},
			{
				"serialNumber": "333-333-332",
				"name": "boo2",
				"description": "Descripción del producto",
				"price": 22,
				"tax": 21,
				"images": "./js/images/b2.jpg",
				"title": "Harry Potter 2",
				"author": "J K Rowling",
				"pages": 556,
				"year": 1998
			},
			{
				"serialNumber": "222-222-222",
				"name": "gam2",
				"description": "Descripción del producto",
				"price": 102,
				"tax": 21,
				"images": "./js/images/g2.jpg",
				"title": " Uncharted 2",
				"company": "Sony",
				"size": "1GB",
				"year": 2009
			},
			{
				"serialNumber": "222-222-223",
				"name": "gam3",
				"description": "Descripción del producto",
				"price": 103,
				"tax": 21,
				"images": "./js/images/g3.jpg",
				"title": "Uncharted 3",
				"company": "Sony",
				"size": "900MB",
				"year": 2013
			},
			{
				"serialNumber": "222-222-224",
				"name": "gam4",
				"description": "Descripción del producto",
				"price": 200,
				"tax": 21,
				"images": "./js/images/g4.jpg",
				"title": "World of Warcraft",
				"company": "Blizzard",
				"size": "2GB",
				"year": 2004
			},
			{
				"serialNumber": "222-222-225",
				"name": "gam5",
				"description": "Descripción del producto",
				"price": 40,
				"tax": 21,
				"images": "./js/images/g5.jpg",
				"title": "Stardew Valley",
				"company": "Eric Barone",
				"size": "1GB",
				"year": 2016
			},
			{
				"serialNumber": "333-333-333",
				"name": "boo3",
				"description": "Descripción del producto",
				"price": 23,
				"tax": 21,
				"images": "./js/images/b3.jpg",
				"title": "Harry Potter 3",
				"author": "J K Rowling",
				"pages": 400,
				"year": 1999
			},
			{
				"serialNumber": "333-333-334",
				"name": "boo4",
				"description": "Descripción del producto",
				"price": 20,
				"tax": 21,
				"images": "./js/images/b4.jpg",
				"title": "Harry Potter 4",
				"author": "J K Rowling",
				"pages": 552,
				"year": 2000
			},
			{
				"serialNumber": "333-333-335",
				"name": "boo5",
				"description": "Descripción del producto",
				"price": 2,
				"tax": 21,
				"images": "./js/images/b5.jpg",
				"title": "Harry Potter 5",
				"author": "J K Rowling",
				"pages": 359,
				"year": 2003
			}
		],
		[
			{
				"title": "Peliculas",
				"description": "Películas descarga online",
				"url": "Peliculas"
			},
			{
				"title": "Juegos",
				"description": "Juegos descarga online",
				"url": "Juegos"
			},
			{
				"title": "Libros",
				"description": "eBooks",
				"url": "Libros"
			}
		],
		[
			{
				"cif": "O12345678",
				"name": "La Tienda",
				"address": "C/ Mercado 1",
				"phone": 123456789,
				"latitude": 38.9884,
				"longitude": -3.928
			},
			{
				"cif": "A12345678",
				"name": "La gran Tienda",
				"address": "C/ Pokémon 4",
				"phone": 123456789,
				"latitude": 52.48393,
				"longitude": 113.545665
			},
			{
				"cif": "B12345678",
				"name": "Tu Tienda en Casa",
				"address": "C/ Buen Mercado 14",
				"phone": 123456789,
				"latitude": 31.39483,
				"longitude": 55.456464
			},
			{
				"cif": "C12345678",
				"name": "Tienda",
				"address": "C/ Gatos 1",
				"phone": 123456789,
				"latitude": 42.453298,
				"longitude": 1.587348793
			},
			{
				"cif": "D12345678",
				"name": "tiendaD",
				"address": "C/ Safari 1",
				"phone": 123456789,
				"latitude": 40,
				"longitude": 22
			}
		]
	];

		/*let cont = 0;
		let arP = [];
		let arC = [];
		let arS = [];
		let general = [];

		for (let p of this.#modelStoreHouse.products) {
			arP.push({
				serialNumber: p[0].serialNumber,
				name: p[0].name,
				description: p[0].description,
				price: p[0].price,
				tax: p[0].tax,
				images: p[0].images
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

		for (let c of this.#modelStoreHouse.categories) {
			arC.push({
				title: c[1].title,
				description: c[1].description,
				url: c[1].url
			});
		}
		general.push(arC);

		for (let s of this.#modelStoreHouse.stores) {
			arS.push({
				cif: s[0].cif,
				name: s[0].name,
				address: s[0].address,
				phone: s[0].phone,
				latitude: s[0].coords.latitude,
				longitude: s[0].coords.longitude
			});
		}
		general.push(arS);*/

		let data = JSON.stringify(general);

		$.ajax({
			type: "post",
			url: "subirFile.php",
			dataType: "json",
			data: data
		});
	}
}

export default StoreHouseController;
