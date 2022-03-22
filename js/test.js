"use strict";

function productTest() {
	console.log("Testeo: Product");

	try {
		let p1 = new Product('111-111-111', 'MarcaX', 'ModeloX', 1500);
		console.log(p1.toString());
	} catch (error) {
		console.log("Clase Abstracta: " + error.name);
	}
}
//productTest();

function movieTest() {
	console.log("Testeo: Movie");
	let m1 = new Movie('1', 'mov1', '', 10, 21, '#', 'Sonic The Hedgehog', 'Jeff Fowler', 2020);

	console.log(m1.toString());
	console.log(m1 instanceof Movie);
	console.log(m1 instanceof Product);

	m1.title = "Sonic: The Hedgehog 2";
	console.log(m1.toString());
}
//movieTest();

function gameTest() {
	console.log("Testeo: Game");
	let g1 = new Game('1', 'gam1', '', 160, 21, '#', 'Street Fighter', 'Capcom', '2GB', 1987);

	console.log(g1.toString());
	console.log(g1 instanceof Game);
	console.log(g1 instanceof Product);

	try{
		g1.size = "16TB";
	} catch(error){
		console.log(error.toString());
	}

	g1.title = "Street Fighter X";
	g1.size = "16GB";
	console.log(g1.toString());
}
//gameTest();

function bookTest() {
	console.log("Testeo: Book");
	let b1 = new Book('1', 'boo1', '', 20, 21, '#', 'Los juegos del hambre', 'Suzanne Collins', 374, 2008);

	console.log(b1.toString());
	console.log(b1 instanceof Book);
	console.log(b1 instanceof Product);

	try{
		b1.pages = -5;
	} catch(error){
		console.log(error.toString());
	}

	b1.title = "Los juegos del hambre 2";
	console.log(b1.toString());
}
//bookTest();

function coordsTest() {
	console.log("Testeo: Coords");
	let c1 = new Coords(255, 14);

	console.log(c1.toString());
	console.log(c1 instanceof Coords);

	try{
		c1.longitude = "d";
	} catch(error){
		console.log(error.toString());
	}
}
//coordsTest();

function storeTest() {
	console.log("Testeo: Store");
	let c1 = new Coords(255, 14);
	let s1 = new Store("A12345678", "tiendaA", "", 123456789, c1);

	console.log(s1.toString());
	console.log(s1 instanceof Store);

	try{
		s1.cif = "12345678A";
	} catch(error){
		console.log(error.toString());
	}

	s1.name = "tiendaB";
	console.log(s1.toString());
}
//storeTest();

function categoryTest() {
	console.log("Testeo: Category");
	let cat1 = new Category("Juegos", "Juegos físicos");

	console.log(cat1.toString());
	console.log(cat1 instanceof Category);

	try{
		cat1.title = null;
	} catch(error){
		console.log(error.toString());
	}
}
//categoryTest();

function StoreHouseTest() {
	console.log("Testeo: StoreHouse");
	let sh = new StoreHouse.getInstance();
	let m1 = new Movie('111-111-111', 'mov1', '', 10, 21, '#', 'Sonic The Hedgehog', 'Jeff Fowler', 2020);
	let m2 = new Movie('111-111-112', 'mov2', '', 12, 21, '#', 'Sonic The Hedgehog 2', 'Jeff Fowler', 2022);
	let m3 = new Movie('111-111-113', 'mov3', '', 13, 21, '#', 'Avatar', 'James Cameron', 2009);
	let m4 = new Movie('111-111-114', 'mov4', '', 20, 21, '#', 'Bratz', 'Sean McNamaran', 2007);
	let m5 = new Movie('111-111-115', 'mov5', '', 4, 21, '#', 'Death Note Netflix', 'Adam Wingard', 2017);
	let g1 = new Game('222-222-221', 'gam1', '', 100, 21, '#', 'Uncharted: El tesoro de Drake', 'Sony', '2GB', 2007);
	let g2 = new Game('222-222-222', 'gam2', '', 102, 21, '#', ' Uncharted: El reino de los ladrones: ', 'Sony', '1GB', 2009);
	let g3 = new Game('222-222-223', 'gam3', '', 103, 21, '#', 'Uncharted: La traición de Drake', 'Sony', '900MB', 2013);
	let g4 = new Game('222-222-224', 'gam4', '', 200, 21, '#', 'World of Warcraft', 'Blizzard', '2GB', 2004);
	let g5 = new Game('222-222-225', 'gam5', '', 40, 21, '#', 'Stardew Valley', 'Eric Barone', '1GB', 2016);
	let b1 = new Book('333-333-331', 'boo1', '', 20, 21, '#', 'Harry Potter 1', 'J K Rowling', 450, 1997);
	let b2 = new Book('333-333-332', 'boo2', '', 22, 21, '#', 'Harry Potter 2', 'J K Rowling', 556, 1998);
	let b3 = new Book('333-333-333', 'boo3', '', 23, 21, '#', 'Harry Potter 3', 'J K Rowling', 400, 1999);
	let b4 = new Book('333-333-334', 'boo4', '', 20, 21, '#', 'Harry Potter 4', 'J K Rowling', 552, 2000);
	let b5 = new Book('333-333-335', 'boo5', '', 2, 21, '#', 'Harry Potter 5', 'J K Rowling', 359, 2003);
	let s0 = new Store("O12345678", "tienda0", "", 123456789, {latitude: 255, longitude: 255});
	let s1 = new Store("A12345678", "tiendaA", "", 123456789, {latitude: 255, longitude: 23});
	let s2 = new Store("B12345678", "tiendaB", "", 123456789, {latitude: 255, longitude: 234});
	let s3 = new Store("C12345678", "tiendaC", "", 123456789, {latitude: 255, longitude: 2});
	let s4 = new Store("D12345678", "tiendaD", "", 123456789, {latitude: 255, longitude: 2});
	let cat0 = new Category("Por defecto", "Categoría por defecto");
	let cat1 = new Category("Peliculas", "Películas descarga online");
	let cat2 = new Category("Juegos", "Juegos descarga online");
	let catX = new Category("Fallo", "uowjrlef");
	let cat3 = new Category("Libros", "eBooks");

	// addCategory
	console.log("Cantidad de categorías: " + sh.addCategory(cat0, cat1));
	console.log("Cantidad de categorías: " + sh.addCategory(cat2, catX, cat3));
	try {
		console.log(sh.addCategory(cat3));
	} catch (error) {
		console.log(error.toString());
	}
	// removeCategory
	console.log("Categoría eliminada, quedan: " + sh.removeCategory(catX));
	// Iterador categories
	for (let [key, value] of sh.categories){
		console.log('Categories - ' + value.toString());
	}
	// addProduct
	console.log("Cantidad de productos: " + sh.addProduct(m1, cat1));
	console.log("Cantidad de productos: " + sh.addProduct(m2, cat1));
	console.log("Cantidad de productos: " + sh.addProduct(m3, cat1, cat2));
	console.log("Cantidad de productos: " + sh.addProduct(m4, cat2));
	console.log("Cantidad de productos: " + sh.addProduct(g1, cat2, cat1));
	console.log("Cantidad de productos: " + sh.addProduct(g2, cat2));
	console.log("Cantidad de productos: " + sh.addProduct(g3, cat2));
	console.log("Cantidad de productos: " + sh.addProduct(b1, cat3, cat1, cat2));
	console.log("Cantidad de productos: " + sh.addProduct(b2, cat3));
	console.log("Cantidad de productos: " + sh.addProduct(b3, cat3));
	// removeProduct
	console.log("Producto eliminado, quedan: " + sh.removeProduct(m4));
	try {
		console.log("Producto eliminado, quedan: " + sh.removeProduct(m4));
	} catch (error) {
		console.log(error.toString());
	}
	// addShop
	console.log("Cantidad de tiendas: " + sh.addShop(s0));
	console.log("Cantidad de tiendas: " + sh.addShop(s1));
	console.log("Cantidad de tiendas: " + sh.addShop(s2));
	console.log("Cantidad de tiendas: " + sh.addShop(s3));
	console.log("Cantidad de tiendas: " + sh.addShop(s4));
	try {
		console.log("Cantidad de tiendas: " + sh.addShop(s4));
	} catch (error) {
		console.log(error.toString());
	}
	// Iterador shops
	for (let [key] of sh.stores){
		console.log('Shops - ' + key.toString());
	}
	// removeShop
	console.log("Tienda eliminada, quedan: " + sh.removeShop(s4));
	try {
		console.log("Tienda eliminada, quedan: " + sh.removeShop(s4));
	} catch (error) {
		console.log(error.toString());
	}
	// addProductInShop
	console.log("Añadido producto en tienda: " + sh.addProductInShop(m1, s1, 4));
	console.log("Añadido producto en tienda: " + sh.addProductInShop(m2, s1, 2));
	console.log("Añadido producto en tienda: " + sh.addProductInShop(m3, s2, 5));
	console.log("Añadido producto en tienda: " + sh.addProductInShop(g1, s2, 5));
	console.log("Añadido producto en tienda: " + sh.addProductInShop(g2, s2, 4));
	console.log("Añadido producto en tienda: " + sh.addProductInShop(g3, s3, 8));
	console.log("Añadido producto en tienda: " + sh.addProductInShop(b1, s3, 2));
	console.log("Añadido producto en tienda: " + sh.addProductInShop(b2, s3, 3));
	console.log("Añadido producto en tienda: " + sh.addProductInShop(b3, s3, 3));
	try {
		console.log("Añadido producto en tienda: " + sh.addProductInShop(m5, s3, 3));
	} catch (error) {
		console.log(error.toString());
	}
	try {
		console.log("Añadido producto en tienda: " + sh.addProductInShop(m1, s4, 3));
	} catch (error) {
		console.log(error.toString());
	}
	// addQuantityProductInShop
	console.log("Total: " + sh.addQuantityProductInShop(m2, s1, 1) + " unidades del producto " + m2.title + " en tienda " + s1.cif);
	console.log("Total: " + sh.addQuantityProductInShop(g2, s2, 3) + " unidades del producto " + g2.title + " en tienda " + s2.cif);
	console.log("Total: " + sh.addQuantityProductInShop(g1, s2, 4) + " unidades del producto " + g1.title + " en tienda " + s2.cif);
	console.log("Total: " + sh.addQuantityProductInShop(b1, s3, 14) + " unidades del producto " + b1.title + " en tienda " + s3.cif);
	console.log("Total: " + sh.addQuantityProductInShop(b3, s3, 10) + " unidades del producto " + b3.title + " en tienda " + s3.cif);
	try {
		console.log("Añadidas " + sh.addQuantityProductInShop(m5, s1, 1) + " unidades del producto " + m2.title + " en tienda " + s1.cif);
	} catch (error) {
		console.log(error.toString());
	}
	try {
		console.log("Añadidas " + sh.addQuantityProductInShop(m2, s4, 1) + " unidades del producto " + m2.title + " en tienda " + s1.cif);
	} catch (error) {
		console.log(error.toString());
	}
	try {
		console.log("Añadidas " + sh.addQuantityProductInShop(m2, s1, -5) + " unidades del producto " + m2.title + " en tienda " + s1.cif);
	} catch (error) {
		console.log(error.toString());
	}
	// getCategoryProducts
	console.log('Productos categoría - Juegos -, tipo -  -');
	for (let p of sh.getCategoryProducts(cat2, '')){
		console.log('Products - ' + p);
	}
	console.log('Productos categoría - Juegos -, tipo - Game -');
	for (let p of sh.getCategoryProducts(cat2, Game)){
		console.log('Products - ' + p);
	}
	try {
		console.log('Productos categoría -  -, tipo -  -');
		for (let p of sh.getCategoryProducts(null, '')){
			console.log('Products - ' + p);
		}
	} catch (error) {
		console.log(error.toString());
	}
	// getShopProducts
	console.log('Productos tienda - TiendaC -, tipo -  -');
	for (let p of sh.getShopProducts(s3, '')){
		console.log('Products - ' + p.p);
	}
	console.log('Productos tienda - TiendaC -, tipo - Book -');
	for (let p of sh.getShopProducts(s3, Book)){
		console.log('Products - ' + p.p);
	}
	try {
		console.log('Productos tienda -  -, tipo -  -');
		for (let p of sh.getShopProducts(null, '')){
			console.log('Products - ' + p.p);
		}
	} catch (error) {
		console.log(error.toString());
	}

	console.log("Categoría eliminada, quedan: " + sh.removeCategory(cat2));
	console.log("Producto eliminado, quedan: " + sh.removeProduct(m1));
	console.log("Tienda eliminada, quedan: " + sh.removeShop(s3));
}
StoreHouseTest();
