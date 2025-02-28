	import { rootReducer } from '../../services/reducers/ingredients';
	import { configureStore } from '@reduxjs/toolkit';

	export const store = configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production', // Включает DevTools только в режиме разработки
	  });
