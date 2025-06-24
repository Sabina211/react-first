import { Dispatch, Middleware } from 'redux';
import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import { refreshToken } from '../../utils/api-data';
import { RootState, AppDispatch, AppActions } from '../../store/store';

export type WebSocketActions = {
	startConnection: ActionCreatorWithPayload<string>;
	stopConnection: ActionCreatorWithoutPayload;
	sendMessage?: ActionCreatorWithPayload<any>;
	onConnected: ActionCreatorWithoutPayload;
	onDisconnected: ActionCreatorWithoutPayload;
	onErrorOccurred: ActionCreatorWithPayload<string>;
	onMessageReceived: ActionCreatorWithPayload<any>;
};

export const createWebSocketMiddleware = (
	baseUrl: string,
	actions: WebSocketActions
): Middleware<{}, RootState, AppDispatch> => {
	return ((storeAPI) => {
		let ws: WebSocket | null = null;
		let currentUrl: string | null = null;
		let isManuallyClosed = false;

		return (next: Dispatch) => (action: AppActions) => {
			const {
				startConnection,
				stopConnection,
				sendMessage,
				onConnected,
				onDisconnected,
				onErrorOccurred,
				onMessageReceived,
			} = actions;
			const { dispatch } = storeAPI;

			if (startConnection.match(action)) {
				if (ws) {
					ws.close(); // Закрываем старое соединение, если оно было
				}
				currentUrl = `${baseUrl}${action.payload}`;
				ws = new WebSocket(currentUrl);
			}

			if (ws) {
				ws.onopen = () => dispatch(onConnected());

				ws.onerror = (event) => dispatch(onErrorOccurred(event.type));

				ws.onmessage = (event) => {
					try {
						const parsedData = JSON.parse(event.data);

						if (parsedData.message === 'Invalid or missing token') {
							refreshToken().then((newTokenData) => {
								var newTocken = newTokenData.accessToken.replace('Bearer ', '');
								localStorage.setItem('accessToken', newTocken);
								const wsUrl = new URL(currentUrl!);
								wsUrl.searchParams.set(
									'token',
									newTokenData.accessToken.replace('Bearer ', '')
								);
								dispatch(startConnection(wsUrl.pathname + wsUrl.search));
							});
						} else {
							dispatch(onMessageReceived(parsedData));
						}
					} catch (error) {
						dispatch(onErrorOccurred('Invalid JSON data received'));
					}
				};

				ws.onclose = () => {
					if (isManuallyClosed) {
						dispatch(onDisconnected());
					} else {
						dispatch(startConnection(currentUrl!));
					}
				};

				if (stopConnection.match(action)) {
					isManuallyClosed = true;
					ws.close();
				}

				if (sendMessage?.match(action)) {
					ws.send(JSON.stringify(action.payload));
				}
			}

			next(action);
		};
	}) as Middleware;
};
