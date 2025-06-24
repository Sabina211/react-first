import { rootReducer } from '../services/reducers/ingredients';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { webSocketActions } from '../services/reducers/websocket';
import { middlewareActions } from '../services/reducers/websocket';
import { createWebSocketMiddleware } from '../services/middleware/createWebSocketMiddleware';
import type { Middleware } from 'redux';

const wsBaseUrl = 'wss://norma.nomoreparties.space';
const wsMiddleware: Middleware = createWebSocketMiddleware(wsBaseUrl, middlewareActions);

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
			.concat(thunk)
			.concat(wsMiddleware),
	devTools: process.env.NODE_ENV !== 'production', // Включает DevTools только в режиме разработки
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TApplicationActions = webSocketActions;
export type AppActions = TApplicationActions;
