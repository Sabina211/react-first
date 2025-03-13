import { createSlice } from '@reduxjs/toolkit';
import { postOrderRequest } from '../../utils/api-data';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	order: null,
	isLoading: false,
	isFailed: false,
	error: '',
};

export const postOrder = createAsyncThunk(
	'order/postOrder',
	async (ingredients, { rejectWithValue }) => {
		try {
			const response = await postOrderRequest(ingredients);
			return response;
		} catch (error) {
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
			.addCase(postOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.order = action.payload;
			})
			.addCase(postOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isFailed = true;
				state.error = action.error?.message;
			});
	},
});

export const ingredientsReducer = orderSlice.reducer;
