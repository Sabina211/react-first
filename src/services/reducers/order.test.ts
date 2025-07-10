import { Order } from '@utils/types';
import {
	postOrder,
	getOrder,
	orderSlice,
	openOrder,
	closeOrder,
	clearOrder,
	updateOrder,
	initialState,
} from './order';
import { OrderState, OrderResponse } from './order';
import { GetOrderResponse } from '@utils/api-data';

const createdOrder: OrderResponse = {
	success: true,
	name: 'Test Order',
	order: {
		number: 12345,
	},
};

const order: Order = {
	_id: '67b64b79133acd001be52454',
	ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
	status: 'done',
	name: 'Space флюоресцентный бургер',
	createdAt: '2025-02-19T21:22:01.050Z',

	updatedAt: '2025-02-19T21:22:01.723Z',
	number: 68886,
};

const getOrderResponse: GetOrderResponse = {
	...order,
	owner: 'some-user-id',
	__v: 0,
};

describe('orderSlice reducer', () => {
	it('should return the initial state', () => {
		const state = orderSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	describe('sync actions', () => {
		it('should handle openOrder', () => {
			const state = orderSlice.reducer(initialState, openOrder());
			expect(state.open).toBe(true);
		});

		it('should handle closeOrder', () => {
			const state = orderSlice.reducer(
				{ ...initialState, open: true },
				closeOrder()
			);
			expect(state.open).toBe(false);
		});

		it('should handle clearOrder', () => {
			const prevState: OrderState = {
				...initialState,
				isLoading: true,
				isFailed: true,
				getOrder: {
					_id: '1',
					ingredients: [],
					owner: 'test',
					status: 'done',
					name: 'test order',
					createdAt: '',
					updatedAt: '',
					number: 1,
					__v: 0,
				},
			};

			const state = orderSlice.reducer(prevState, clearOrder());

			expect(state).toEqual({
				...prevState,
				isLoading: false,
				isFailed: false,
				getOrder: null,
			});
		});

		it('should handle updateOrder', () => {
			const getOrderResponse: GetOrderResponse = {
				...order,
				owner: 'some-user-id',
				__v: 0,
			};

			const state = orderSlice.reducer(
				initialState,
				updateOrder(getOrderResponse)
			);
			expect(state).toEqual({ ...initialState, data: getOrderResponse });
		});
	});

	describe('postOrder async', () => {
		it('should handle pending', () => {
			const action = { type: postOrder.pending.type };
			const state = orderSlice.reducer(initialState, action);
			expect(state.isLoading).toBe(true);
			expect(state.isFailed).toBe(false);
		});

		it('should handle fulfilled', () => {
			const action = { type: postOrder.fulfilled.type, payload: createdOrder };
			const state = orderSlice.reducer(initialState, action);
			expect(state.isLoading).toBe(false);
			expect(state.createdOrder).toEqual(createdOrder);
		});

		it('should handle rejected', () => {
			const action = {
				type: postOrder.rejected.type,
				error: { message: 'Ошибка создания заказа' },
			};
			const state = orderSlice.reducer(initialState, action);
			expect(state.isLoading).toBe(false);
			expect(state.isFailed).toBe(true);
			expect(state.error).toBe('Ошибка создания заказа');
		});
	});

	describe('getOrder async', () => {
		it('should handle pending', () => {
			const action = { type: getOrder.pending.type };
			const state = orderSlice.reducer(initialState, action);
			expect(state.isLoading).toBe(true);
			expect(state.isFailed).toBe(false);
		});

		it('should handle fulfilled', () => {
			const action = { type: getOrder.fulfilled.type, payload: order };
			const state = orderSlice.reducer(initialState, action);
			expect(state.isLoading).toBe(false);
			expect(state.getOrder).toEqual(order);
		});

		it('should handle rejected', () => {
			const action = {
				type: getOrder.rejected.type,
				error: { message: 'Ошибка получения заказа' },
			};
			const state = orderSlice.reducer(initialState, action);
			expect(state.isLoading).toBe(false);
			expect(state.isFailed).toBe(true);
			expect(state.error).toBe('Ошибка получения заказа');
		});
	});
});
