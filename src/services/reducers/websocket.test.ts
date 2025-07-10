import {
	webSocketReducer,
	connect,
	disconnect,
	wsOpen,
	wsClose,
	wsError,
	wsMessage,
} from './websocket';

import { WebsocketStatus, WSOrderResponse, Order } from '../../utils/types';

const order: Order = {
	_id: '67b64b79133acd001be52454',
	ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
	status: 'done',
	name: 'Space флюоресцентный бургер',
	createdAt: '2025-02-19T21:22:01.050Z',
	updatedAt: '2025-02-19T21:22:01.723Z',
	number: 68886,
};

const message: WSOrderResponse = {
	success: true,
	orders: [order],
	total: 100,
	totalToday: 1,
};

const initialState = {
	status: WebsocketStatus.OFFLINE,
	orders: [],
	total: 0,
	totalToday: 0,
	error: '',
};

describe('webSocketReducer', () => {
	it('should return initial state', () => {
		const state = webSocketReducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('should handle connect', () => {
		const action = connect('wss://test-url');
		const state = webSocketReducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.OPENING,
		});
	});

	it('should handle disconnect', () => {
		const action = disconnect();
		const state = webSocketReducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.CLOSING,
		});
	});

	it('should handle wsOpen', () => {
		const state = webSocketReducer(initialState, wsOpen());
		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.ONLINE,
			error: '',
		});
	});

	it('should handle wsClose', () => {
		const state = webSocketReducer(
			{
				...initialState,
				status: WebsocketStatus.ONLINE,
				orders: [order],
				total: 100,
				totalToday: 1,
				error: 'Something went wrong',
			},
			wsClose()
		);
		expect(state).toEqual(initialState);
	});

	it('should handle wsError', () => {
		const state = webSocketReducer(initialState, wsError('Test error'));
		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.OFFLINE,
			error: 'Test error',
		});
	});

	it('should handle wsMessage', () => {
		const state = webSocketReducer(initialState, wsMessage(message));
		expect(state).toEqual({
			...initialState,
			orders: message.orders,
			total: message.total,
			totalToday: message.totalToday,
		});
	});
});