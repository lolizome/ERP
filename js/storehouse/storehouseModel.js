import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
	ExistValueException,
	NotExistValueException,
	NegativeValueException } from '../exceptions.js';
import {Product, Movie, Game, Book, Coords, Store, Category} from '../entities/products.js';

class StoreHouseException extends BaseException {
	constructor (message = 'Error: StoreHouse Exception.', fileName, lineNumber){
			super(message, fileName, lineNumber);
			this.name = 'StoreHouseException';
	}
}

class ObjecStoreHouseException extends StoreHouseException {
  constructor (param, className, fileName, lineNumber){
    super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
    this.param = param;
    this.param = className;
    this.name = 'ObjecStoreHouseException';
  }
}

let StoreHouse = (function () {
	let instantiated;
	function init() {
		// Instanciamos storehouse
		class StoreHouse {
			name = "";
			#products = new Map();
			#categories = new Map();
			#stores = new Map();

			constructor(name) {
				if (!new.target) throw new InvalidAccessConstructorException();
				if (name === null) throw new EmptyValueException("name");

				this.name = name;
			}

			get name() {
				return this.name;
			}
			set name(name) {
				if (name === null) throw new EmptyValueException("name");

				this.name = name;
			}
			// Iterador de categorias
			get categories() {
				let array = this.#categories;
				return {
					*[Symbol.iterator]() {
						for (let category of array) {
							yield category;
						}
					}
				}
			}
			// Iterador de tiendas
			get stores() {
				let array = this.#stores;
				return {
					*[Symbol.iterator]() {
						for (let shop of array) {
							yield shop;
						}
					}
				}
			}
			// Añade una nueva categoría, devuelve el número de elementos
			addCategory() {
				for (let category of arguments){
					if (!(category instanceof Category)) {
						throw new ObjecStoreHouseException ('category', 'Category');
					}
					if (!this.#categories.has(category.title)){
						this.#categories.set(category.title, category);
					} else {
						throw new ExistValueException(category);
					}
				}
				return [...this.#categories].length;
			}
			// Elimina una categoría y sus productos pasan a la de por defecto
			removeCategory(category) {
				if (this.#categories.has(category.title)){
					for (let [key, value] of this.#products) {
						if(value.includes(category)) {
							let i = value.indexOf(category);
							value.splice(i, 1, this.#categories[0]);
						}
					}
					this.#categories.delete(category.title);
				} else{
					throw new NotExistException(category.title);
				}
				return [...this.#categories].length;
			}
			// Añade un nuevo producto asociado a x categorias
			addProduct(product, ...category) {
				if (!(product instanceof Product)) throw new ObjecStoreHouseException ('product', 'Product');

				if (!this.#products.has(product)){
					this.#products.set(product, category);
				} else {
					throw new ExistValueException(product);
				}
				return [...this.#products].length;
			}
			// Elimina un producto y devuelve los elementos que quedan
			removeProduct(product) {
				if (this.#products.has(product)){
					this.#products.delete(product);
				} else{
					throw new NotExistValueException(product);
				}
				return [...this.#products].length;
			}
			// Añade un producto en una tienda con x unidades, devuelve la cantidad de productos que hay
			addProductInShop(product, shop, num) {
				if (!(product instanceof Product)) throw new ObjecStoreHouseException ('product', 'Product');
				if (!(shop instanceof Store)) throw new ObjecStoreHouseException ('shop', 'store');

				if (this.#products.has(product)){
					if (this.#stores.has(shop)){
						for (let [key, value] of this.#stores) {
							if(key === shop) value.push({
								p: product,
								q: num
							});
						}
					} else {
						throw new NotExistValueException(shop);
					}
				} else {
					throw new NotExistValueException(product);
				}
				return num;
			}
			// Suma el stock de una tienda dado un producto y una tienda
			addQuantityProductInShop(product, shop, num) {
				if (!(product instanceof Product)) throw new ObjecStoreHouseException ('product', 'Product');
				if (!(shop instanceof Store)) throw new ObjecStoreHouseException ('shop', 'store');
				if (num <= 0) throw new NegativeValueException('num');

				let total = 0;
				if (this.#products.has(product)){
					if (this.#stores.has(shop)){
						for (let [key, value] of this.#stores) {
							if(key === shop) {
								value.find(elem => elem.p === product).q += num;
								total = value.find(elem => elem.p === product).q;
							}
						}
					} else {
						throw new NotExistValueException(shop);
					}
				} else {
					throw new NotExistValueException(product);
				}
				return total;
			}
			// Devuelve todos los productos de una categoría con su stock, si se pasa
			// un tipo de producto se filtrará por eso
			getCategoryProducts(category, type = '') {
				if (!(category instanceof Category)) throw new ObjecStoreHouseException ('category', 'Category');
				let ar = [];
				if (this.#categories.has(category.title)){
					for (let [key, value] of this.#products) {
						if(value.includes(category)) {
							if (type !== '' && key instanceof type) {
								ar.push(key);
							}
							if (type === '') {
								ar.push(key);
							}
						}
					}
				} else {
					throw new NotExistValueException(category);
				}
				let x = [];
				for (let cat of ar) {
					if(cat instanceof Movie) x.unshift(cat);
					if(cat instanceof Game) {
						let i = x.findIndex(elem => elem instanceof Book);
						if(i === -1) i = x.length;
						x.splice(i, 0, cat);
					}
					if(cat instanceof Book) x.push(cat);
				}
				return x;
			}
			// Añade una nueva tienda, devuelve el número de tiendas que hay
			addShop() {
				for (let shop of arguments){
					if (!(shop instanceof Store)) {
						throw new ObjecStoreHouseException ('shop', 'Store');
					}
					if (!this.#stores.has(shop)){
						this.#stores.set(shop, []);
					} else {
						throw new ExistValueException(shop);
					}
				}
				return [...this.#stores].length;
			}
			// Elimina una tienda y los productos pasan a la genérica
			removeShop(shop) {
				if (this.#stores.has(shop)){
					for (let [key, value] of this.#stores) {
						if(key === shop) {
							let a = value;
						}
					}
					this.#stores.delete(shop);
				} else{
					throw new NotExistValueException(shop);
				}
				return [...this.#stores].length;
			}
			// Devuelve los productos de una tienda y su stock, si se pasa
			// un tipo de producto se filtrará por eso
			getShopProducts(shop, type = '') {
				if (!(shop instanceof Store)) throw new ObjecStoreHouseException ('shop', 'Store');
				let ar = [];
				if (this.#stores.has(shop)){
					if (type !== '') {
						ar = this.#stores.get(shop).filter(elem => elem.p instanceof type);
					} else {
						ar = this.#stores.get(shop).filter(elem => elem.p instanceof Product);
					}
				} else {
					throw new NotExistValueException(shop);
				}
				let x = [];
				for (let p of ar) {
					if(p.p instanceof Movie) x.unshift(p.p);
					if(p.p instanceof Game) {
						let i = x.findIndex(elem => elem instanceof Book);
						if(i === -1) i = x.length;
						x.splice(i, 0, p.p);
					}
					if(p.p instanceof Book) x.push(p.p);
				}
				return x;
			}
			//Devuelve el número total de item en el carrito diferentes
			getNumberProducts (){
				return [...this.#products].length;
			}
			// Devuelve un objeto Store dado un cif
			getStore(cif){
				let position = [...this.#stores].findIndex(x => x[0].cif === cif);
				if (position === -1) throw new NotExistValueException(cif);
				return [...this.#stores][position][0];
			}
			// Devuelve un objeto Category dado un título
			getCategory(title){
				let position = [...this.#categories].findIndex(x => x[0] === title);
				if (position === -1) throw new NotExistValueException(title);
				return [...this.#categories][position][1];
			}
			// Devuelve un objeto Product dado un serialNumber
			getProduct(serialNumber){
				let position = [...this.#products].findIndex(x => x[0].serialNumber === serialNumber);
				if (position === -1) throw new ProductNotExistInManagerException(new Laptop(serial, 'anon', 'anon', 0.0001));
				return [...this.#products][position][0];
			}
			/*  * getTypeProducts(type, field){
				let array = [...this.#products.values()].filter(product => {
					return product instanceof type;
				});
				if (this.#order[field]){
					array.sort(this.#order[field]);
				}

				for (let product of array){
					yield product;
				}
			}*/
		}
		Object.defineProperty(StoreHouse.prototype, "name", { enumerable: true });
		Object.defineProperty(StoreHouse.prototype, "products", { enumerable: true });
		Object.defineProperty(StoreHouse.prototype, "categories", { enumerable: true });
		Object.defineProperty(StoreHouse.prototype, "stores", { enumerable: true });

		let sh = new StoreHouse();
		Object.freeze(sh);
		return sh;
	}
	return {
		getInstance: function () {
			if (!instantiated) {
				instantiated = init();
			}
			return instantiated;
		}
	};
})();

export {StoreHouseException, ObjecStoreHouseException};
export default StoreHouse;
export { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
	ExistValueException,
	NotExistValueException,
	NegativeValueException } from '../exceptions.js';
export {Product, Movie, Game, Book, Coords, Store, Category} from '../entities/products.js';
