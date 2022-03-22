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
		let m1 = new Movie('111-111-111', 'mov1', 'Descripción del producto', 10, 21, './js/images/m1.jpg', 'Sonic The Hedgehog', 'Jeff Fowler', 2020);
		let m2 = new Movie('111-111-112', 'mov2', 'Descripción del producto', 12, 21, './js/images/m2.jpg', 'Sonic The Hedgehog 2', 'Jeff Fowler', 2022);
		let m3 = new Movie('111-111-113', 'mov3', 'Descripción del producto', 13, 21, './js/images/m3.jpg', 'Avatar', 'James Cameron', 2009);
		let m4 = new Movie('111-111-114', 'mov4', 'Descripción del producto', 20, 21, './js/images/m4.jpg', 'Bratz', 'Sean McNamaran', 2007);
		let m5 = new Movie('111-111-115', 'mov5', 'Descripción del producto', 4, 21, './js/images/m5.jpg', 'Death Note Netflix', 'Adam Wingard', 2017);
		let g1 = new Game('222-222-221', 'gam1', 'Descripción del producto', 100, 21, './js/images/g1.jpeg', 'Uncharted: El tesoro de Drake', 'Sony', '2GB', 2007);
		let g2 = new Game('222-222-222', 'gam2', 'Descripción del producto', 102, 21, './js/images/g2.jpg', ' Uncharted: El reino de los ladrones: ', 'Sony', '1GB', 2009);
		let g3 = new Game('222-222-223', 'gam3', 'Descripción del producto', 103, 21, './js/images/g3.jpg', 'Uncharted: La traición de Drake', 'Sony', '900MB', 2013);
		let g4 = new Game('222-222-224', 'gam4', 'Descripción del producto', 200, 21, './js/images/g4.jpg', 'World of Warcraft', 'Blizzard', '2GB', 2004);
		let g5 = new Game('222-222-225', 'gam5', 'Descripción del producto', 40, 21, './js/images/g5.jpg', 'Stardew Valley', 'Eric Barone', '1GB', 2016);
		let b1 = new Book('333-333-331', 'boo1', 'Descripción del producto', 20, 21, './js/images/g1.jpeg', 'Harry Potter 1', 'J K Rowling', 450, 1997);
		let b2 = new Book('333-333-332', 'boo2', 'Descripción del producto', 22, 21, './js/images/b2.jpg', 'Harry Potter 2', 'J K Rowling', 556, 1998);
		let b3 = new Book('333-333-333', 'boo3', 'Descripción del producto', 23, 21, './js/images/b3.jpg', 'Harry Potter 3', 'J K Rowling', 400, 1999);
		let b4 = new Book('333-333-334', 'boo4', 'Descripción del producto', 20, 21, './js/images/b4.jpg', 'Harry Potter 4', 'J K Rowling', 552, 2000);
		let b5 = new Book('333-333-335', 'boo5', 'Descripción del producto', 2, 21, './js/images/b5.jpg', 'Harry Potter 5', 'J K Rowling', 359, 2003);
		let s0 = new Store("O12345678", "La Tienda", "C/ Mercado 1", 123456789, { latitude: 255, longitude: 255 });
		let s1 = new Store("A12345678", "La gran Tienda", "C/ Pokémon 4", 123456789, { latitude: 255, longitude: 23 });
		let s2 = new Store("B12345678", "Tu Tienda en Casa", "C/ Buen Mercado 14", 123456789, { latitude: 255, longitude: 234 });
		let s3 = new Store("C12345678", "Tienda", "C/ Gatos 1", 123456789, { latitude: 255, longitude: 2 });
		let s4 = new Store("D12345678", "tiendaD", "C/ Safari 1", 123456789, { latitude: 255, longitude: 2 });
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

	handleInit = () => {
		this.onInit();
	}

	handleProductsStoreList = (cif) => {
		let store = this.#modelStoreHouse.getStore(cif);
		this.#viewStoreHouse.listProducts(this.#modelStoreHouse.getShopProducts(store), store.name);
		this.#viewStoreHouse.bindShowProduct(this.handleShowProduct);
	}

	handleProductsCategoryList = (title) => {
		let category = this.#modelStoreHouse.getCategory(title);
		this.#viewStoreHouse.listProducts(this.#modelStoreHouse.getCategoryProducts(category), category.title);
		this.#viewStoreHouse.bindShowProduct(this.handleShowProduct);
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
}

export default StoreHouseController;