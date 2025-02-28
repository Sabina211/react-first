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

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer
  });

export const ingredientsReducer = (state = initialState, action) => {
	switch(action.type){
		case GET_INGREDIENTS_REQUEST: {
			return { ...state, itemsFailed: false,  itemsRequest: true };
		  }
		  case GET_INGREDIENTS_SUCCESS: {
			return { ...state, itemsFailed: false, itemsRequest: false, items: action.items, };
		  }
		  case GET_INGREDIENTS_FAILED: {
			return { ...state, itemsFailed: true, itemsRequest: false };
		  }
	}
};
