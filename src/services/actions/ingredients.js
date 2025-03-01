import { getIngredientsRequest } from '../../utils/api-data';
import {  createAsyncThunk } from '@reduxjs/toolkit';

//fulfilled, rejected, pending 'ingredients/getIngredients/rejected',
export const getIngredients = createAsyncThunk(
	'ingredients/getIngredients',
	async (_) => {
		//_ потому что данные не отправляем, у нас гет
		const response = await getIngredientsRequest();
		return response;
	}
);
