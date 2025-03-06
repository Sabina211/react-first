import { createSlice } from '@reduxjs/toolkit';
import { postOrderRequest } from '../../utils/api-data';
import {  createAsyncThunk } from '@reduxjs/toolkit';

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

function updateIngredientCounts(mains) {
	const countMap = {};

	mains.forEach((item) => {
		countMap[item._id] = (countMap[item._id] || 0) + 1;
	});

	return mains.map((item) => ({
		...item,
		count: countMap[item._id] || 0,
	}));
}

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
			state.mains = updateIngredientCounts(state.mains);
			return state;
		},
		mainsOrderChanged(state, action) {
			if (JSON.stringify(state.mains) !== JSON.stringify(action.payload)) {
				state.mains = action.payload; // Изменяем только если порядок изменился
			}
			return state;
		},
		getTotalPrice(state) {
			const totalPrice = calculateTotalPrice(state.bun, state.mains);
			state.totalPrice = totalPrice;
			return state;
		},
		removeIngredient(state, action) {
			const mainsToRemove = state.mains.filter(
				(x) => x.uuid !== action.payload.uuid
			);
			const updatedMains = updateIngredientCounts(mainsToRemove);
			return { ...state, mains: updatedMains };
		},
	},
});
export const {
	addBun,
	addIngredient,
	mainsOrderChanged,
	getTotalPrice,
	removeIngredient,
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
