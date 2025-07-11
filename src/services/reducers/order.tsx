import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	postOrderRequest,
	getOrderRequest,
	GetOrderResponse,
} from '../../utils/api-data';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface OrderResponse {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

export interface OrderState {
	createdOrder: OrderResponse | null; // Для postOrder
	getOrder: GetOrderResponse | null;
	isLoading: boolean;
	isFailed: boolean;
	error: string | null;
	open: boolean;
	data: GetOrderResponse | null;
}

export interface IOrder {
	_id: string;
	ingredients: Array<string>;
	name: string;
	number: number;
	status: string;
	updatedAt: string;
	createdAt: string;
	page?: string;
}

export const initialState: OrderState = {
	createdOrder: null, // Для postOrder
	getOrder: null,
	isLoading: false,
	isFailed: false,
	error: null,
	open: false,
	data: null
};

export const postOrder = createAsyncThunk<
	OrderResponse,
	string[],
	{ rejectValue: string }
>('order/postOrder', async (ingredients, { rejectWithValue }) => {
	try {
		const response = await postOrderRequest(ingredients);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

export const getOrder = createAsyncThunk<
	GetOrderResponse,
	string | number,
	{ rejectValue: string }
>('order/getOrder', async (orderId, { rejectWithValue }) => {
	try {
		const response = await getOrderRequest(orderId);
		if (!response) {
			return rejectWithValue('Order not found');
		}
		return response;
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		openOrder: (state) => {
			state.open = true;
		},
		closeOrder: (state) => {
			state.open = false;
		},
		clearOrder: (state) => ({
			...state,
			isLoading: false,
			isFailed: false,
			getOrder: null,
		}),
		updateOrder: (state, action: PayloadAction<GetOrderResponse>) => ({
			...state,
			data: action.payload,
		}),
	},
	extraReducers: (builder) => {
		builder
			.addCase(postOrder.pending, (state) => {
				state.isLoading = true;
				state.isFailed = false;
			})
			.addCase(
				postOrder.fulfilled,
				(state, action: PayloadAction<OrderResponse>) => {
					state.isLoading = false;
					state.createdOrder = action.payload;
				}
			)
			.addCase(postOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isFailed = true;
				state.error = action.error?.message ?? null;
			})
			.addCase(getOrder.pending, (state) => {
				state.isLoading = true;
				state.isFailed = false;
			})
			.addCase(
				getOrder.fulfilled,
				(state, action: PayloadAction<GetOrderResponse>) => {
					state.isLoading = false;
					state.getOrder = action.payload;
				}
			)
			.addCase(getOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isFailed = true;
				state.error = action.error?.message ?? null;
			});
	},
});

export const { openOrder, closeOrder, clearOrder, updateOrder } = orderSlice.actions;
export const ingredientsReducer = orderSlice.reducer;
