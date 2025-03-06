const ROOT_URL = 'https://norma.nomoreparties.space';
const GET_INGREDIENTS = '/api/ingredients';
const POST_ORDER = '/api/orders';

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
