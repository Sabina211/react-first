export interface Order {
	ingredients: string[];
	_id: string;
	status: 'done' | 'pending' | 'created';
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	owner?: Owner;
	price?: number;
}

export type Orders = Array<Order>;

export interface Owner extends User {
	createdAt: string;
	updatedAt: string;
}

export type User = {
	email: string;
	name: string;
};

export enum WebsocketStatus {
	OPENING = 'opening...',
	CLOSING = 'closing...',
	ONLINE = 'online',
	OFFLINE = 'offline',
}

export interface WSOrderResponse {
	success: boolean;
	orders: Orders;
	total: number;
	totalToday: number;
}

export type Ingredients = Ingredient[];

export type IngredientType = 'bun' | 'sauce' | 'main';

export type IngredientWithUUID = Ingredient & { uuid: string,  count?: number};

export interface Ingredient {
	_id: string;
	name: string;
	type: IngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

export interface IngredientWithAmount extends Ingredient {
	amount: number;
}

export enum Statuses {
	done = 'Выполнен',
	created = 'Создан',
	pending = 'Готовится',
	canceled = 'Отменен',
  }
