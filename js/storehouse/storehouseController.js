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
	#jsonP = "";
	#jsonS = "";
	#jsonC = "";
	#modelStoreHouse;
	#viewStoreHouse;
	#loadStoreHouseObjects() {
		let m1 = new Movie('111-111-111', 'mov1', 'Descripción del producto', 10, 21, './js/images/m1.jpg', 'Sonic The Hedgehog', 'Jeff Fowler', 2020);
		let m2 = new Movie('111-111-112', 'mov2', 'Descripción del producto', 12, 21, './js/images/m2.jpg', 'Sonic The Hedgehog 2', 'Jeff Fowler', 2022);
		let m3 = new Movie('111-111-113', 'mov3', 'Descripción del producto', 13, 21, './js/images/m3.jpg', 'Avatar', 'James Cameron', 2009);
		let m4 = new Movie('111-111-114', 'mov4', 'Descripción del producto', 20, 21, './js/images/m4.jpg', 'Bratz', 'Sean McNamaran', 2007);
		let m5 = new Movie('111-111-115', 'mov5', 'Descripción del producto', 4, 21, './js/images/m5.jpg', 'Death Note Netflix', 'Adam Wingard', 2017);
		let g1 = new Game('222-222-221', 'gam1', 'Descripción del producto', 100, 21, './js/images/g1.jpeg', 'Uncharted 1', 'Sony', '2GB', 2007);
		let g2 = new Game('222-222-222', 'gam2', 'Descripción del producto', 102, 21, './js/images/g2.jpg', ' Uncharted 2', 'Sony', '1GB', 2009);
		let g3 = new Game('222-222-223', 'gam3', 'Descripción del producto', 103, 21, './js/images/g3.jpg', 'Uncharted 3', 'Sony', '900MB', 2013);
		let g4 = new Game('222-222-224', 'gam4', 'Descripción del producto', 200, 21, './js/images/g4.jpg', 'World of Warcraft', 'Blizzard', '2GB', 2004);
		let g5 = new Game('222-222-225', 'gam5', 'Descripción del producto', 40, 21, './js/images/g5.jpg', 'Stardew Valley', 'Eric Barone', '1GB', 2016);
		let b1 = new Book('333-333-331', 'boo1', 'Descripción del producto', 20, 21, './js/images/g1.jpeg', 'Harry Potter 1', 'J K Rowling', 450, 1997);
		let b2 = new Book('333-333-332', 'boo2', 'Descripción del producto', 22, 21, './js/images/b2.jpg', 'Harry Potter 2', 'J K Rowling', 556, 1998);
		let b3 = new Book('333-333-333', 'boo3', 'Descripción del producto', 23, 21, './js/images/b3.jpg', 'Harry Potter 3', 'J K Rowling', 400, 1999);
		let b4 = new Book('333-333-334', 'boo4', 'Descripción del producto', 20, 21, './js/images/b4.jpg', 'Harry Potter 4', 'J K Rowling', 552, 2000);
		let b5 = new Book('333-333-335', 'boo5', 'Descripción del producto', 2, 21, './js/images/b5.jpg', 'Harry Potter 5', 'J K Rowling', 359, 2003);
		let s0 = new Store("O12345678", "La Tienda", "C/ Mercado 1", 123456789, { latitude: 38.9884, longitude: -3.928 });
		let s1 = new Store("A12345678", "La gran Tienda", "C/ Pokémon 4", 123456789, { latitude: 52.48393, longitude: 113.545665 });
		let s2 = new Store("B12345678", "Tu Tienda en Casa", "C/ Buen Mercado 14", 123456789, { latitude: 31.39483, longitude: 55.456464 });
		let s3 = new Store("C12345678", "Tienda", "C/ Gatos 1", 123456789, { latitude: 42.4532980, longitude: 1.587348793 });
		let s4 = new Store("D12345678", "tiendaD", "C/ Safari 1", 123456789, { latitude: 40, longitude: 22 });
		let cat0 = new Category("Por defecto", "Categoría por defecto");
		let cat1 = new Category("Peliculas", "Películas descarga online");
		let cat2 = new Category("Juegos", "Juegos descarga online");
		let cat3 = new Category("Libros", "eBooks");
		let sh = this.#modelStoreHouse;
		sh.addCategory(cat1);
		sh.addCategory(cat2);
		sh.addCategory(cat3);
		sh.addShop(s0, s1, s2, s3, s4);
		sh.addProduct(m1, cat1);
		sh.addProduct(g1, cat1, cat2);
		sh.addProduct(m2, cat1);
		sh.addProduct(m3, cat1);
		sh.addProduct(m4, cat1);
		sh.addProduct(m5, cat1);
		sh.addProduct(b1, cat1, cat3);
		sh.addProduct(b2, cat1, cat3);
		sh.addProduct(g2, cat1, cat2);
		sh.addProduct(g3, cat2);
		sh.addProduct(g4, cat2);
		sh.addProduct(g5, cat2);
		sh.addProduct(b3, cat1, cat3);
		sh.addProduct(b4, cat3);
		sh.addProduct(b5, cat3);
		sh.addProductInShop(m2, s1, 14);
		sh.addProductInShop(g2, s1, 2);
		sh.addProductInShop(b1, s1, 12);
		sh.addProductInShop(m1, s1, 4);
		sh.addProductInShop(g1, s1, 2);
		sh.addProductInShop(b2, s1, 12);
		sh.addProductInShop(m3, s2, 3);
		sh.addProductInShop(m4, s2, 1);
		sh.addProductInShop(g2, s2, 10);
		sh.addProductInShop(g3, s2, 5);
		sh.addProductInShop(b2, s3, 5);
		sh.addProductInShop(b3, s3, 15);
		sh.addProductInShop(m5, s3, 5);
		sh.addProductInShop(g4, s3, 5);
		sh.addProductInShop(g5, s3, 15);
		sh.addProductInShop(b4, s2, 12);
		sh.addProductInShop(b5, s2, 10);


		let arP = [m1, m2, m3, m4, m5, g1, g2, g3, g4, g5, b1, b2, b3, b4, b5];
		let arS = [s0, s1, s2, s3, s4];
		let arC = [cat1, cat2, cat3];
		let arP2 = [];
		let arS2 = [];
		let arC2 = [];
		let cont = 0;

		for (let p of arP) {
			arP2.push({
				serialNumber: p.serialNumber,
				name: p.name,
				description: p.description,
				price: p.price,
				tax: p.tax
			});

			if(p instanceof Movie) {
				arP2[cont].title = p.title;
				arP2[cont].director = p.director;
				arP2[cont].year = p.year;
			}
			if(p instanceof Game) {
				arP2[cont].title = p.title;
				arP2[cont].company = p.company;
				arP2[cont].size = p.size;
				arP2[cont].year = p.year;
			}
			if(p instanceof Book) {
				arP2[cont].title = p.title;
				arP2[cont].author = p.author;
				arP2[cont].pages = p.pages;
				arP2[cont].year = p.year;
			}

			cont++;
		}
		this.jsonP = JSON.stringify(arP2);

		for (let s of arS) {
			arS2.push({
				cif: s.cif,
				name: s.name,
				address: s.address,
				phone: s.phone
			});
		}
		this.jsonS = JSON.stringify(arS2);

		for (let c of arC) {
			arC2.push({
				title: c.title,
				description: c.description,
				url: c.url
			});
		}
		this.jsonC = JSON.stringify(arC2);
	}

	constructor(modelStoreHouse, viewStoreHouse) {
		this.#modelStoreHouse = modelStoreHouse;
		this.#viewStoreHouse = viewStoreHouse;

		this.onLoad();
		this.onInit();
		this.#viewStoreHouse.bindInit(this.handleInit);
		//this.#viewStoreHouse.bindProductsTypeList(this.handleProductsTypeList);
	}

	onLoad = () => {
		this.#loadStoreHouseObjects();
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
	}

	onInit = () => {
		this.#viewStoreHouse.showStores(this.#modelStoreHouse.stores);
		this.#viewStoreHouse.bindProductsStoreList(
			this.handleProductsStoreList
		);
		this.#viewStoreHouse.createJSONFile(this.jsonP, this.jsonS, this.jsonC);
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
		console.log("0.5");
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

	handleRemoveProduct = (title, position) => {
		let done, error, cat;
		try{
			cat = this.#modelStoreHouse.getCategory(title);
			this.#modelStoreHouse.removeCategory(cat);
			done = true;
		} catch(exception){
			done = false;
			error = exception;
		}
		this.#viewStoreHouse.showRemoveProductModal(done, cat, position, error);
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
}

export default StoreHouseController;
