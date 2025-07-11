import {
	constructorReducer,
	initialState,
	addBun,
	addIngredient,
	getTotalPrice,
	removeIngredient,
	cleanConstructor,
	mainsOrderChanged,
} from './burger-constructor';
import { Ingredient, IngredientWithUUID } from '../../utils/types';

const bun: Ingredient = {
	_id: '643d69a5c3f7b9001cfa093e',
	name: 'Филе Люминесцентного тетраодонтимформа',
	type: 'main',
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: 'https://code.s3.yandex.net/react/code/meat-03.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
	__v: 0,
};

const ingredient1: IngredientWithUUID = {
	_id: '643d69a5c3f7b9001cfa093e',
	name: 'Филе Люминесцентного тетраодонтимформа',
	type: 'main',
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: 'https://code.s3.yandex.net/react/code/meat-03.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
	__v: 0,
	uuid: 'uuid-1',
};

const ingredient2: IngredientWithUUID = {
	...ingredient1,
	_id: 'ingr2',
	name: 'Main One',
	uuid: 'uuid-2',
	price: 70,
};

describe('constructorSlice', () => {
	it('should return the initial state', () => {
		const state = constructorReducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('should handle addBun', () => {
		const state = constructorReducer(initialState, addBun(bun));
		expect(state.bun).toEqual(bun);
	});

	it('should handle addIngredient and count correctly', () => {
		const state1 = constructorReducer(initialState, addIngredient(ingredient1));
		expect(state1.mains.length).toBe(1);
		expect(state1.mains[0].count).toBe(1);

		const state2 = constructorReducer(state1, addIngredient(ingredient1));
		const added = state2.mains.find((i) => i._id === ingredient1._id);
		expect(added?.count).toBe(2);
	});

	it('should handle mainsOrderChanged if different', () => {
		const state = constructorReducer(initialState, addIngredient(ingredient1));
		const newState = constructorReducer(
			state,
			mainsOrderChanged([ingredient2])
		);
		expect(newState.mains).toEqual([ingredient2]);
	});

	it('should not change mains if payload is equal to current', () => {
		const state = constructorReducer(initialState, addIngredient(ingredient1));
		const newState = constructorReducer(state, mainsOrderChanged(state.mains));
		expect(newState.mains).toBe(state.mains); // ссылка на тот же массив
	});

	it('should calculate total price correctly', () => {
		let state = constructorReducer(initialState, addBun(bun));
		state = constructorReducer(state, addIngredient(ingredient1));
		state = constructorReducer(state, addIngredient(ingredient2));
		state = constructorReducer(state, getTotalPrice());

		// 2*988 + 988 +70 = 3034
		expect(state.totalPrice).toBe(3034);
	});

	it('should remove ingredient by uuid', () => {
		let state = constructorReducer(initialState, addIngredient(ingredient1));
		state = constructorReducer(state, addIngredient(ingredient2));
		expect(state.mains.length).toBe(2);

		state = constructorReducer(state, removeIngredient({ uuid: 'uuid-1' }));
		expect(state.mains.length).toBe(1);
		expect(state.mains[0].uuid).toBe('uuid-2');
	});

	it('should reset state on cleanConstructor', () => {
		let state = constructorReducer(initialState, addBun(bun));
		state = constructorReducer(state, addIngredient(ingredient1));
		state = constructorReducer(state, cleanConstructor());

		expect(state).toEqual(initialState);
	});
});
