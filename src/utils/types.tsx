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

  export type User ={
	email: string;
	name: string;
  }

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