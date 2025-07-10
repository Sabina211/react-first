import { getIngredients } from '../actions/ingredients';
import { constructorSlice } from './burger-constructor';
import { createSlice, combineSlices } from '@reduxjs/toolkit';
import { orderSlice } from './order';
import { userSlice } from './user';
import { webSocketSlice } from './websocket';
import { Ingredient } from '../../utils/types';

interface IngredientsState {
	ingredients: Ingredient[];
	isLoading: boolean;
	isFailed: boolean;
	error: string | null;
}

const initialState: IngredientsState = {
	ingredients: [],
	isLoading: false,
	isFailed: false,
	error: null,
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
				state.error = action.error?.message ?? null;
			});
	},
});
export const ingredientsReducer = ingredientSlice.reducer;

export const rootReducer = combineSlices(
	ingredientSlice,
	constructorSlice,
	orderSlice,
	userSlice,
	webSocketSlice
);
