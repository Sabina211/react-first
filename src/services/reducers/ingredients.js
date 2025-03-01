import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from '../actions/ingredients';
import { combineReducers } from 'redux';

const initialState = {
	ingredients: [],
	ingredientsRequest: false,
	ingredientsFailed: false,
};



export const ingredientsReducer = (state = initialState, action) => {
	switch(action.type){
		case GET_INGREDIENTS_REQUEST: {
			return { ...state, ingredientsFailed: false,  ingredientsRequest: true };
		  }
		  case GET_INGREDIENTS_SUCCESS: {
			return { ...state, ingredientsFailed: false, ingredientsRequest: false, ingredients: action.ingredients };
		  }
		  case GET_INGREDIENTS_FAILED: {
			return { ...state, ingredientsFailed: true, ingredientsRequest: false };
		  }
		  default:
			return state;
	}
};

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer
  });
