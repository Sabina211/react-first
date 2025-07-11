import { ingredientsReducer } from './ingredients';
import { getIngredients } from '../actions/ingredients';
import { Ingredient } from '../../utils/types';

const ingredients: Ingredient[] = [
  {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0
  },
];

const initialState = {
  ingredients: [],
  isLoading: false,
  isFailed: false,
  error: null,
};

describe('ingredientsReducer', () => {
  it('should return initial state by default', () => {
    const result = ingredientsReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);
    expect(result).toEqual({
      ingredients: [],
      isLoading: true,
      isFailed: false,
      error: null,
    });
  });

  it('should handle getIngredients.fulfilled', () => {
    const action = { type: getIngredients.fulfilled.type, payload: ingredients };
    const result = ingredientsReducer(initialState, action);
    expect(result).toEqual({
      ingredients,
      isLoading: false,
      isFailed: false,
      error: null,
    });
  });

  it('should handle getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' },
    };
    const result = ingredientsReducer(initialState, action);
    expect(result).toEqual({
      ingredients: [],
      isLoading: false,
      isFailed: true,
      error: 'Ошибка загрузки',
    });
  });
});