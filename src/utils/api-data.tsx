import {
	ForgotPasswordForm,
	Login,
	Register,
	ResetPassword,
	User,
	UserData,
} from '@services/reducers/user';
import { Ingredient } from '../utils/types';

const ROOT_URL = 'https://norma.nomoreparties.space';
const GET_INGREDIENTS = '/api/ingredients';
const POST_ORDER = '/api/orders';
const POST_FORGOT_PASSWORD = '/api/password-reset';
const POST_RESET_PASSWORD = '/api/password-reset/reset';
const REGISTER_USER = '/api/auth/register';
const LOGIN = '/api/auth/login';
const LOGOUT = '/api/auth/logout';
const USER = '/api/auth/user';

export interface UserResponse {
	success: boolean;
	user: User;
	accessToken: string;
	refreshToken: string;
}

export interface OrderResponse {
	success: boolean;
	name: string;
	order: {
		number: number;
	};
}

export interface GetOrderResponse {
	_id: string;
	ingredients: string[];
	owner: string;
	status: 'done' | 'pending' | 'created';
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	__v: number;
}

export type GetOrdersResponse = GetOrderResponse[];

function checkResponse<T>(res: Response): Promise<T> {
	if (!res.ok) {
		const errorText = `Ошибка при обращении к ${res.url} ${res.status}: ${res.statusText}`;
		console.error(errorText);
		throw new Error(errorText);
	}

	return res.json() as Promise<T>;
}

export { checkResponse };

export function getIngredientsRequest(): Promise<Ingredient[]> {
	return fetch(`${ROOT_URL}${GET_INGREDIENTS}`)
		.then((res) => checkResponse<{ data: Ingredient[] }>(res))
		.then((res) => {
			if (res.data && res.data.length > 0) {
				return Promise.resolve(res.data);
			} else {
				console.log('Не получилось распарсить ответ');
				return [];
			}
		});
}

export function postOrderRequest(
	ingredients: string[]
): Promise<OrderResponse> {
	const token = localStorage.getItem('accessToken');

	return fetchWithRefresh<OrderResponse>(`${ROOT_URL}${POST_ORDER}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ ingredients }),
	});
}

export function forgotPasswordRequest(email: ForgotPasswordForm) {
	return fetch(`${ROOT_URL}${POST_FORGOT_PASSWORD}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(email),
	})
		.then(checkResponse)
		.then((res) => {
			localStorage.setItem('accessToResetPassword', 'true');
			return res;
		});
}

export function resetPasswordRequest(data: ResetPassword) {
	return fetch(`${ROOT_URL}${POST_RESET_PASSWORD}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(checkResponse)
		.then((res) => {
			localStorage.removeItem('accessToResetPassword');
			return res;
		});
}

export function logoutRequest() {
	const token = localStorage.getItem('refreshToken');
	return fetch(`${ROOT_URL}${LOGOUT}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token }),
	})
		.then(checkResponse)
		.then((res) => {
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
			return res;
		});
}

export function registerUserRequest(user: Register) {
	return fetch(`${ROOT_URL}${REGISTER_USER}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then(checkResponse<UserResponse>)
		.then((res) => {
			let accessToken = res.accessToken.split('Bearer ')[1];
			let refreshToken = res.refreshToken;

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			return res;
		});
}

export function loginRequest(user: Login) {
	return fetch(`${ROOT_URL}${LOGIN}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then(checkResponse<UserResponse>)
		.then((res) => {
			let accessToken = res.accessToken.split('Bearer ')[1];
			let refreshToken = res.refreshToken;

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			return res;
		});
}

export const refreshToken = () => {
	return fetch(`${ROOT_URL}/api/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(
			checkResponse<{
				success: boolean;
				accessToken: string;
				refreshToken: string;
			}>
		)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		});
};

interface FetchWithAuthOptions extends RequestInit {
	headers: Record<string, string>;
}

export const fetchWithRefresh = async function <T>(
	url: string,
	options: FetchWithAuthOptions
): Promise<T> {
	try {
		const res = await fetch(url, options);
		return await checkResponse<T>(res);
	} catch (err: any) {
		console.log(err.message);
		if (err.message === 'jwt expired' || err.message.includes('403')) {
			const refreshData = await refreshToken(); //обновляем токен
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return await checkResponse<T>(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export function getUserRequest(): Promise<{ success: boolean; user: User }> {
	const token = localStorage.getItem('accessToken');

	return fetchWithRefresh<{ success: boolean; user: User }>(
		`${ROOT_URL}${USER}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

export function postUserRequest(
	user: UserData
): Promise<{ success: boolean; user: User }> {
	const token = localStorage.getItem('accessToken');

	return fetchWithRefresh<{ success: boolean; user: User }>(
		`${ROOT_URL}${USER}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(user),
		}
	);
}

export function getOrderRequest(
	orderId: number | string
): Promise<GetOrderResponse | null> {
	return fetch(`${ROOT_URL}/api/orders/${orderId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(checkResponse<{ success: boolean; orders: GetOrderResponse }>)
		.then((res) => {
			if (res.success && Array.isArray(res.orders) && res.orders.length > 0) {
				return res.orders[0];
			}
			return null;
		});
}
