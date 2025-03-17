const ROOT_URL = 'https://norma.nomoreparties.space';
const GET_INGREDIENTS = '/api/ingredients';
const POST_ORDER = '/api/orders';
const POST_FORGOT_PASSWORD= '/api/password-reset';
const POST_RESET_PASSWORD= '/api/password-reset/reset';
const REGISTER_USER = '/api/auth/register';

export const checkResponse = async (res) => {
	if (!res.ok) {
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
		body: JSON.stringify({ email }),
	})
		.then(checkResponse)
		.then((res) => {
			return res;
		});
}

export function resetPasswordRequest(password, token) {
	console.log(JSON.stringify({ password }));
	return fetch(`${ROOT_URL}${POST_RESET_PASSWORD}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify({ password }),
	})
		.then(checkResponse)
		.then((res) => {
			return res;
		});
}

export function registerUserRequest() {
	const user = {
		"email": "test-data@yandex.ru",
		"password": "password",
		"name": "Username"
		};

	return fetch(`${ROOT_URL}${REGISTER_USER}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ user }),
	})
		.then(checkResponse)
		.then((res) => {
			return res;
		});
}
