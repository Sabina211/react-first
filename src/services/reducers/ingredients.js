import { getIngredients } from '../actions/ingredients';
import { constructorSlice } from '../reducers/burger-constructor';
import { createSlice, createAsyncThunk, combineSlices } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
	isLoading: false,
	isFailed: false,
	error: '',
};

export const ingredientSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getIngredients.pending, (state) => {
				state.isLoading = true;
				state.isFailed = false;
			})
			.addCase(getIngredients.fulfilled, (state, action) => {
				state.isLoading = false;
				state.ingredients = action.payload;
			})
			.addCase(getIngredients.rejected, (state, action) => {
				state.isLoading = false;
				state.isFailed = true;
				state.error = action.error?.message;
			});
	},
});
export const ingredientsReducer = ingredientSlice.reducer;

export const rootReducer = combineSlices(ingredientSlice, constructorSlice);
