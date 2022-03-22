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
import StoreHouseController from './storehouseController.js';
import StoreHouseView from './storehouseView.js';

const StoreHouseApp = new StoreHouseController(
	StoreHouse.getInstance(), new StoreHouseView()
);

export default StoreHouseApp;
