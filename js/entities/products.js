'use strict';

class Product {
	#serialNumber;
	#name;
	#description;
	#price;
	#tax;
	#images;

	constructor(serialNumber, name, description, price, tax, images = "https://via.placeholder.com/450x300.jpg?text=SinNombre") {
		if (!new.target) throw new InvalidAccessConstructorException();
		if (new.target === Product) throw new AbstractClassException("Product");
		if (!serialNumber) throw new EmptyValueException("serial");
		if (!name) throw new EmptyValueException("name");
		if (!price) throw new EmptyValueException("price");
		if (!images) throw new EmptyValueException("images");

		this.#serialNumber = serialNumber;
		this.#name = name;
		this.#description = description;
		this.#price = price;
		this.#tax = tax;
		this.#images = images;
	}

	get serialNumber() {
		return this.#serialNumber;
	}
	set serialNumber(serialNumber) {
		if (!serialNumber) throw new EmptyValueException("serial");
		this.#serialNumber = serialNumber;
	}
	get name() {
		return this.#name;
	}
	set name(name) {
		if (!name) throw new EmptyValueException("name");
		this.#name = name;
	}
	get description() {
		return this.#description;
	}
	set description(description) {
		this.#description = description;
	}
	get price() {
		return this.#price;
	}
	set price(price) {
		Number.parseFloat(price);
		if (Number.isNaN(price) && price > 0) throw new InvalidValueException("price", price);
		this.#price = price;
	}
	get tax() {
		return this.#tax;
	}
	set tax(tax) {
		this.#tax = tax;
	}
	get images() {
		return this.#images;
	}
	set images(images) {
		if (!images) throw new EmptyValueException("images");

		this.#images = images;
	}

	toString(){
		return "SerialNumber: " + this.serialNumberal + " Name: " + this.name + " Description: " + this.description + " Price: " + this.price + "€ Tax: " + this.tax + "%";
	}
}
Object.defineProperty(Product.prototype, "serialNumber", {enumerable: true});
Object.defineProperty(Product.prototype, "name", {enumerable: true});
Object.defineProperty(Product.prototype, "description", {enumerable: true});
Object.defineProperty(Product.prototype, "price", {enumerable: true});
Object.defineProperty(Product.prototype, "tax", {enumerable: true});
Object.defineProperty(Product.prototype, "images", {enumerable: true});


// 3 subclases de product:
class Movie extends Product {
	#title;
	#director;
	#year;

	constructor(serialNumber, name, description, price, tax, images, title = 'unknown', director = 'unknown', year = '-') {
		if (!new.target) throw new InvalidAccessConstructorException();
		super(serialNumber, name, description, price, tax, images);

		this.#title = title;
		this.#director = director;
		this.#year = year;
	}

	get title() {
		return this.#title;
	}
	set title(title) {
		this.#title = title;
	}
	get director() {
		return this.#director;
	}
	set director(director) {
		this.#director = director;
	}
	get year() {
		return this.#year;
	}
	set year(year) {
		this.#year = year;
	}

	toString(){
		return "Title: " + this.title + " Director: " + this.director + " Year: " + this.year;
	}
}
Object.defineProperty(Movie.prototype, "title", {enumerable: true});
Object.defineProperty(Movie.prototype, "director", {enumerable: true});
Object.defineProperty(Movie.prototype, "year", {enumerable: true});


class Game extends Product {
	#title;
	#company;
	#size;
	#year;

	constructor(serialNumber, name, description, price, tax, images, title = 'unknown', company = 'unknown', size = '-', year = '-') {
		if (!new.target) throw new InvalidAccessConstructorException();
		if (!/^((\d+GB)|(\d+MB))$/.test(size)) throw new InvalidValueException("size",size);
		super(serialNumber, name, description, price, tax, images);

		this.#title = title;
		this.#company = company;
		this.#size = size;
		this.#year = year;
	}

	get title() {
		return this.#title;
	}
	set title(title) {
		this.#title = title;
	}
	get company() {
		return this.#company;
	}
	set company(company) {
		this.#company = company;
	}
	get size() {
		return this.#size;
	}
	set size(size) {
		if (!/^((\d+GB)|(\d+MB))$/.test(size)) throw new InvalidValueException("size",size);

		this.#size = size;
	}
	get year() {
		return this.#year;
	}
	set year(year) {
		this.#year = year;
	}

	toString(){
		return "Title: " + this.title + " Company: " + this.company + " Size: " + this.size + " Year: " + this.year;
	}
}
Object.defineProperty(Game.prototype, "title", {enumerable: true});
Object.defineProperty(Game.prototype, "company", {enumerable: true});
Object.defineProperty(Game.prototype, "size", {enumerable: true});
Object.defineProperty(Game.prototype, "year", {enumerable: true});

class Book extends Product {
	#title;
	#author;
	#pages;
	#year;

	constructor(serialNumber, name, description, price, tax, images, title = 'unknown', author = 'unknown', pages = '-', year = '-') {
		if (!new.target) throw new InvalidAccessConstructorException();
		if (Number.isNaN(pages) || pages < 0) throw new InvalidValueException("pages",pages);

		super(serialNumber, name, description, price, tax, images);

		this.#title = title;
		this.#author = author;
		this.#pages = pages;
		this.#year = year;
	}

	get title() {
		return this.#title;
	}
	set title(title) {
		this.#title = title;
	}
	get author() {
		return this.#author;
	}
	set author(author) {
		this.#author = author;
	}
	get pages() {
		return this.#pages;
	}
	set pages(pages) {
		if (Number.isNaN(pages) || pages < 0) throw new InvalidValueException("pages",pages);

		this.#pages = pages;
	}
	get year() {
		return this.#year;
	}
	set year(year) {
		this.#year = year;
	}

	toString(){
		return "Title: " + this.title + " Author: " + this.author + " Pages: " + this.pages + " Year: " + this.year;
	}
}
Object.defineProperty(Book.prototype, "title", {enumerable: true});
Object.defineProperty(Book.prototype, "author", {enumerable: true});
Object.defineProperty(Book.prototype, "pages", {enumerable: true});
Object.defineProperty(Book.prototype, "year", {enumerable: true});

class Coords {
	#latitude;
	#longitude;

	constructor(latitude, longitude) {
		latitude = Number.parseFloat(latitude);
		longitude = Number.parseFloat(longitude);
		if (Number.isNaN(latitude)) throw new InvalidValueException("latitude", latitude);
		if (Number.isNaN(longitude)) throw new InvalidValueException("longitude", longitude);

		this.#latitude = latitude;
		this.#longitude = longitude;
	}

	get latitude() {
		return this.#latitude;
	}
	set latitude(latitude) {
		latitude = Number.parseFloat(latitude);
		if (Number.isNaN(latitude)) throw new InvalidValueException("latitude", latitude);

		this.#latitude = latitude;
	}
	get longitude() {
		return this.#longitude;
	}
	set longitude(longitude) {
		longitude = Number.parseFloat(longitude);
		if (Number.isNaN(longitude)) throw new InvalidValueException("longitude", longitude);

		this.#longitude = longitude;
	}

	toString(){
		return "Latitude: " + this.latitude + " Longitude: " + this.longitude;
	}
}
Object.defineProperty(Coords.prototype, "latitude", {enumerable: true});
Object.defineProperty(Coords.prototype, "longitude", {enumerable: true});

class Store {
	#cif;
	#name;
	#address;
	#phone;
	#coords;

	constructor(cif, name, address, phone, coords) {
		if (!/^(([A-Z]{1})(\d{8}))$/.test(cif)) throw new InvalidValueException("cif", cif);
		if (name === null) throw new Error("El nombre es obligatorio");
		if (!/(\d{9})/.test(phone)) throw new InvalidValueException("phone", phone);

		this.#cif = cif;
		this.#name = name;
		this.#address = address;
		this.#phone = phone;
		this.#coords = coords;
	}

	get cif() {
		return this.#cif;
	}
	set cif(cif) {
		if (!/^(([A-Z]{1})(\d{8}))$/.test(cif)) throw new InvalidValueException("cif", cif);

		this.#cif = cif;
	}
	get name() {
		return this.#name;
	}
	set name(name) {
		if (name === null) throw new Error("El nombre es obligatorio");
		this.#name = name;
	}
	get address() {
		return this.#address;
	}
	set address(address) {
		this.#address = address;
	}
	get phone() {
		return this.#phone;
	}
	set phone(phone) {
		if (!/(\d{9})/.test(phone)) throw new InvalidValueException("phone", phone);

		this.#phone = phone;
	}
	get coords() {
		return this.coords.toString();
	}
	set coords(coords) {
		this.#coords = coords;
	}

	toString(){
		return "CIF: " + this.cif + " Name: " + this.name + " Phone: " + this.phone;
	}
}
Object.defineProperty(Store.prototype, "cif", {enumerable: true});
Object.defineProperty(Store.prototype, "name", {enumerable: true});
Object.defineProperty(Store.prototype, "address", {enumerable: true});
Object.defineProperty(Store.prototype, "phone", {enumerable: true});
Object.defineProperty(Store.prototype, "coords", {enumerable: true});

class Category {
	#title;
	#description;
	#url;

	constructor(title = "Anon", description = "descripción base", url = 'https://via.placeholder.com/258x172.jpg?text=SinNombre') {
		if (!new.target) throw new InvalidAccessConstructorException();
		if (!title) throw new EmptyValueException('title');
		if (!url) throw new EmptyValueException('url');

		this.#title = title;
		this.#description = description;
		this.#url = url;
	}

	get title() {
		return this.#title;
	}
	set title(title = "Anon") {
		if (!title) throw new EmptyValueException('title');

		this.#title = title;
	}
	get description() {
		return this.#description;
	}
	set description(description = "descripción base") {
		this.#description = description;
	}
	get url() {
		return this.#title;
	}
	set url(url = "Anon") {
		if (!url) throw new EmptyValueException('url');

		this.#url = url;
	}

	toString(){
		return "Title: " + this.title + " Description: " + this.description;
	}
}
Object.defineProperty(Category.prototype, 'title', {enumerable: true});
Object.defineProperty(Category.prototype, 'description', {enumerable: true});
Object.defineProperty(Category.prototype, 'url', {enumerable: true});

export {Product, Movie, Game, Book, Coords, Store, Category};
