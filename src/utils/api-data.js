const ROOT_URL = 'https://norma.nomoreparties.space';
const GET_INGREDIENTS = '/api/ingredients';
const POST_ORDER = '/api/orders';
const POST_FORGOT_PASSWORD = '/api/password-reset';
const POST_RESET_PASSWORD = '/api/password-reset/reset';
const REGISTER_USER = '/api/auth/register';
const LOGIN = '/api/auth/login';
const LOGOUT = '/api/auth/logout';
const USER = '/api/auth/user';

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
	const token = localStorage.getItem("accessToken");

	return fetchWithRefresh(`${ROOT_URL}${POST_ORDER}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify({ ingredients }),
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
			localStorage.setItem("accessToResetPassword", true);
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
			localStorage.removeItem("accessToResetPassword");
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
		body: JSON.stringify({token}),
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
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
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

export const refreshToken = () => {
	return fetch(`${ROOT_URL}/auth/token`, {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json;charset=utf-8",
	  },
	  body: JSON.stringify({
		token: localStorage.getItem("refreshToken"),
	  }),
	})
	.then(checkResponse)
	.then((refreshData) => {

	  if (!refreshData.success) {
		  return Promise.reject(refreshData);
		}
	  localStorage.setItem("refreshToken", refreshData.refreshToken);
	  localStorage.setItem("accessToken", refreshData.accessToken);
	  return refreshData;
	});
  };

  export const fetchWithRefresh = async (url, options) => {
	try {
	  const res = await fetch(url, options);
	  return await checkResponse(res);
	} catch (err) {
	  if (err.message === "jwt expired") {
		const refreshData = await refreshToken(); //обновляем токен
		options.headers.authorization = refreshData.accessToken;
		const res = await fetch(url, options); //повторяем запрос
		return await checkResponse(res);
	  } else {
		return Promise.reject(err);
	  }
	}
  };

  export function getUserRequest() {
	const token = localStorage.getItem("accessToken");

	return fetchWithRefresh(`${ROOT_URL}${USER}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
}

export function postUserRequest(user) {
	const token = localStorage.getItem("accessToken");

	return fetchWithRefresh(`${ROOT_URL}${USER}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(user),
	});
}

