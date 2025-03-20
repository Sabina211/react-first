const ROOT_URL = 'https://norma.nomoreparties.space';
const GET_INGREDIENTS = '/api/ingredients';
const POST_ORDER = '/api/orders';
const POST_FORGOT_PASSWORD = '/api/password-reset';
const POST_RESET_PASSWORD = '/api/password-reset/reset';
const REGISTER_USER = '/api/auth/register';
const LOGIN = '/api/auth/login';

export const checkResponse = async (res) => {
	if (!res.ok) {
		console.log(await res.json());
		const errorText = `Ошибка при обращении к ${res.url} ${res.status}: ${res.statusText}`;
		console.error(errorText);
		throw new Error(errorText);
	}
	return await res.json();
};

export function getIngredientsRequest() {
	return fetch(`${ROOT_URL}${GET_INGREDIENTS}`)
		.then(checkResponse)
		.then((res) => {
			if (res.data && res.data.length > 0) {
				return Promise.resolve(res.data);
			} else {
				console.log('Не получилось распарсить ответ');
			}
		});
}

export function postOrderRequest(ingredients) {
	return fetch(`${ROOT_URL}${POST_ORDER}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients }),
	})
		.then(checkResponse)
		.then((res) => {
			return res;
		});
}

export function forgotPasswordRequest(email) {
	return fetch(`${ROOT_URL}${POST_FORGOT_PASSWORD}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(email),
	})
		.then((res) => {
			if (!res.ok) {
				return res.json().then((error) => {
					throw new Error(error.message || 'Ошибка при обращении к апи');
				});
			}
			return res.json();
		})
		.then((res) => {
			return res;
		});
}

export function resetPasswordRequest(data) {
	return fetch(`${ROOT_URL}${POST_RESET_PASSWORD}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((res) => {
			if (!res.ok) {
				return res.json().then((error) => {
					throw new Error(error.message || 'Ошибка при обращении к апи');
				});
			}
			return res.json();
		})
		.then((res) => {
			return res;
		});
}

export function registerUserRequest(user) {
	return fetch(`${ROOT_URL}${REGISTER_USER}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((res) => {
			if (!res.ok) {
				return res.json().then((error) => {
					throw new Error(error.message || 'Ошибка при обращении к апи');
				});
			}
			return res.json();
		})
		.then((res) => {
			let accessToken = res.accessToken.split('Bearer ')[1];
			let refreshToken = res.refreshToken;

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			return res;
		});
}

export function loginRequest(user) {
	return fetch(`${ROOT_URL}${LOGIN}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((res) => {
			if (!res.ok) {
				return res.json().then((error) => {
					throw new Error(error.message || 'Ошибка при логине');
				});
			}
			return res.json();
		})
		.then((res) => {
			let accessToken = res.accessToken.split('Bearer ')[1];
			let refreshToken = res.refreshToken;

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			return res;
		});
}
