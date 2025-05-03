import { rootReducer } from '../services/reducers/ingredients';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(thunk),
	devTools: process.env.NODE_ENV !== 'production', // Включает DevTools только в режиме разработки
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
