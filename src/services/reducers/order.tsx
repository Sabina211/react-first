import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postOrderRequest } from '../../utils/api-data';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface OrderResponse {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

export interface OrderState {
	order: OrderResponse | null;
	isLoading: boolean;
	isFailed: boolean;
	error: string | null;
}

export interface IOrder {
    _id: string;
    //name: string;
    ingredients: Array<string>;
    number: number;
    status: string;
    updatedAt: string;
    createdAt: string;
    page?: string;
}

const initialState: OrderState = {
	order: null,
	isLoading: false,
	isFailed: false,
	error: null,
}

export const postOrder = createAsyncThunk<OrderResponse, string[], { rejectValue: string }>(
	'order/postOrder',
	async (ingredients, { rejectWithValue }) => {
		try {
			const response = await postOrderRequest(ingredients);
			return response;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postOrder.pending, (state) => {
				state.isLoading = true;
				state.isFailed = false;
			})
			.addCase(postOrder.fulfilled, (state, action: PayloadAction<OrderResponse>) => {
				state.isLoading = false;
				state.order = action.payload;
			})
			.addCase(postOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isFailed = true;
				state.error = action.error?.message ?? null;
			});
	},
});

export const ingredientsReducer = orderSlice.reducer;
