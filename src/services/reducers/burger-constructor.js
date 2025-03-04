import { createSlice, createAsyncThunk, combineSlices } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
	bun: null,
	mains: [],
	totalPrice: 0,
};

const calculateTotalPrice = (bun, mains) => {
	let totalPrice = 0;

	if (bun && bun.price) {
		totalPrice += bun.price * 2;
	}

	if (mains && Array.isArray(mains)) {
		totalPrice += mains.reduce((sum, item) => sum + (item.price || 0), 0);
	}

	return totalPrice;
};

export const constructorSlice = createSlice({
	name: 'constructor',
	initialState,
	reducers: {
		addBun(state, action) {
			state.bun = action.payload;
			return state;
		},
		addIngredient(state, action) {
			if (!state.mains) state.mains = new Array();
			state.mains.push(action.payload);
			return state;
		},
		mainsOrderChanged(state, action) {
			//state.mains = [...action.payload];
			state.mains = [...action.payload].map((item) => ({ ...item, uuid: uuidv4() })); // Создаём новые объекты
			return state;
		},
		getTotalPrice(state) {
			const totalPrice = calculateTotalPrice(state.bun, state.mains);
			state.totalPrice = totalPrice;
			return state;
		},
	},
});
export const { addBun, addIngredient, mainsOrderChanged, getTotalPrice } =
	constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
