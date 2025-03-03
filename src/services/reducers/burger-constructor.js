import { createSlice, createAsyncThunk, combineSlices } from '@reduxjs/toolkit';

const initialState = {
	bun: null,
	mains: [],
	totalPrice: 0,

};

export const constructorSlice = createSlice({
	name: 'constructor',
	initialState,
	reducers: {
		addBun(state, action){
			state.bun = action.payload;
			return state;
		},
		addIngredient(state, action) {
			if(!state.mains)
				state.mains = new Array();
			state.mains.push(action.payload);
			return state;

		},
		mainsOrderChanged(state, action){
			state.mains = Array.isArray(action.payload) ? action.payload : state.mains;
			return state;
		}
	}
});
export const { addBun, addIngredient, mainsOrderChanged } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
