'use strict';

let StoreHouse = (function () {
	let instantiated;
	function init() {
		// Instanciamos storehouse
		class StoreHouse {
			name = "";
			#products = [];
			#categories = [];
			#shops = [];
			#shopPro = [];

			constructor(name) {
				if (!new.target) throw new InvalidAccessConstructorException();
				//if (categories === "") categories = "basica";
				//if (shops === "") shops = "ninguna";
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
			get shops() {
				let array = this.#shops;
				return {
					*[Symbol.iterator]() {
						for (let shop of array) {
							yield shop;
						}
					}
				}
			}
			// Añade una nueva categoría, devuelve el número de elementos
			addCategory(category) {
				if (category.title === null) throw new EmptyValueException("category");
				if (this.#categories.find(elem => elem.title === category.title) !== undefined) throw new ExistValueException(category.title);

				return this.#categories.push(category);
			}
			// Elimina una categoría y sus productos pasan a la de por defecto
			removeCategory(category) {
				if (this.#categories.find(elem => elem.title === category.title) === undefined) throw new NotExistValueException(category.title);

				if (this.#products.find(elem => elem.cat.includes(category)) !== undefined) {
					let ind;
					for (let elem of this.#products) {
						ind = elem.cat.indexOf(category);
						elem.cat.splice(ind, 1, this.#categories[0]);
					}
				}
				let index = this.#categories.findIndex(elem => elem.title === category.title);
				this.#categories.splice(index, 1);
				return this.#categories.length;
			}
			// Añade un nuevo producto asociado a x categorias
			addProduct(product, ...category) {
				if (product === null) throw new EmptyValueException("product");

				return this.#products.push({
					prod: product,
					cat: category
				});
			}
			// Elimina un producto y devuelve los elementos que quedan
			removeProduct(product) {
				let x = this.#products.find(elem => elem.prod.serialNumber === product.serialNumber);
				if (x === undefined) throw new NotExistValueException(product.serialNumber);

				if(this.#shopPro.find(elem => elem.pro.includes(product.serialNumber)) !== undefined) {
					for (let sp of this.#shopPro) {
						if(sp.pro === product.serialNumber) {
							this.#shopPro.splice(this.#shopPro.indexOf(sp), 1);
						}
					}
				}
				let index = this.#products.indexOf(x);
				this.#products.splice(index, 1);
				return this.#products.length;
			}
			// Añade un producto en una tienda con x unidades, devuelve la cantidad de productos que hay
			addProductInShop(product, shop, num) {
				let x = this.#products.find(elem => elem.prod.serialNumber === product.serialNumber);
				let y = this.#shops.find(elem => elem.cif === shop.cif);
				if (x === undefined) throw new NotExistValueException(product.serialNumber);
				if (y === undefined) throw new NotExistValueException(shop.cif);

				return this.#shopPro.push({
					pro: product.serialNumber,
					shop: shop.cif,
					quantity: num
				});
			}
			// Suma el stock de una tienda dado un producto y una tienda
			addQuantityProductInShop(product, shop, num) {
				let x = this.#products.find(elem => elem.prod.serialNumber === product.serialNumber);
				let y = this.#shops.find(elem => elem.cif === shop.cif);
				if (x === undefined) throw new NotExistValueException(product.serialNumber);
				if (y === undefined) throw new NotExistValueException(shop.cif);
				if (num <= 0) throw new NegativeValueException('num');

				let total = (this.#shopPro.find(elem => elem.shop === shop.cif).quantity) + num;
				let index = this.#shopPro.findIndex(elem => elem.pro === product.serialNumber);

				return this.#shopPro[index].quantity = total;
			}
			// Devuelve todos los productos de una categoría con su stock, si se pasa
			// un tipo de producto se filtrará por eso
			getCategoryProducts(category, type = '') {
				if (category === null) throw new EmptyValueException('category');

				let arrayP = this.#products.filter(function (elem) {
					return elem.cat.includes(category);
				});
				let arrayQ = [];
				if (type === '') {
					for (let elem of this.#shopPro) {
						for (let p of arrayP) {
							if (p.prod.serialNumber === elem.pro) {
								arrayQ.push({
									p: elem.pro,
									q: elem.quantity
								});
							}
						}
					}
					return {
						*[Symbol.iterator]() {
							for (let p of arrayQ) {
								yield "[Product: " + p.p + "] [Quantity: " + p.q + "]";
							}
						}
					}
				} else {
					for (let elem of this.#shopPro) {
						for (let p of arrayP) {
							if (p.prod.serialNumber === elem.pro && p.prod instanceof type) {
								arrayQ.push({
									p: elem.pro,
									q: elem.quantity
								});
							}
						}
					}
					return {
						*[Symbol.iterator]() {
							for (let p of arrayQ) {
								yield "[Product: " + p.p + "] [Quantity: " + p.q + "]";
							}
						}
					}
				}
			}
			// Añade una nueva tienda, devuelve el número de tiendas que hay
			addShop(shop) {
				if (shop === null) throw new EmptyValueException("shop");
				let x = this.#shops.find(elem => elem.cif === shop.cif);
				if (x !== undefined) throw new ExistValueException(shop.cif);

				return this.#shops.push(shop);
			}
			// Elimina una tienda y los productos pasan a la genérica
			removeShop(shop) {
				let x = this.#shops.find(elem => elem.cif === shop.cif);
				if (x === undefined) throw new NotExistValueException(shop.cif);

				if (this.#shopPro.find(elem => elem.shop.includes(shop.cif))) {
					for (let sp of this.#shopPro) {
						if(sp.shop === shop.cif) {
							sp.shop = this.#shops[0].cif;
						}
					}
				}
				let index = this.#shops.indexOf(x);
				this.#shops.splice(index, 1);
				return this.#shops.length;
			}
			// Devuelve los productos de una tienda y su stock, si se pasa
			// un tipo de producto se filtrará por eso
			getShopProducts(shop, type) {
				if (shop === null) throw new EmptyValueException('shop');

				let arrayP = this.#shopPro.filter(elem => elem.shop === shop.cif);
				if (type === '') {
					return {
						*[Symbol.iterator]() {
							for (let p of arrayP) {
								yield "[Product: " + p.pro + "] [Quantity: " + p.quantity + "]";
							}
						}
					}
				} else {
					let arrayC = this.#products.filter(elem => elem.prod instanceof type);
					let arrayQ = [];
					for (let elemP of arrayP) {
						for (let elemC of arrayC) {
							if (elemP.pro === elemC.prod.serialNumber) {
								arrayQ.push({
									p: elemP.pro,
									q: elemP.quantity
								});
							}
						}
					}
					return {
						*[Symbol.iterator]() {
							for (let p of arrayQ) {
								yield "[Product: " + p.p + "] [Quantity: " + p.q + "]";
							}
						}
					}
				}
			}
		}
		Object.defineProperty(StoreHouse.prototype, "name", { enumerable: true });
		Object.defineProperty(StoreHouse.prototype, "products", { enumerable: true });
		Object.defineProperty(StoreHouse.prototype, "categories", { enumerable: true });
		Object.defineProperty(StoreHouse.prototype, "shops", { enumerable: true });
		Object.defineProperty(StoreHouse.prototype, "stock", { enumerable: true });

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
