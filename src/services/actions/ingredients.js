import { getIngredientsRequest } from '../../utils/api-data';
import { createAsyncThunk } from '@reduxjs/toolkit';

//fulfilled, rejected, pending 'ingredients/getIngredients/rejected',
export const getIngredients = createAsyncThunk(
	'ingredients/getIngredients',
	getIngredientsRequest
);
