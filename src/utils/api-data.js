const ROOT_URL = 'https://norma.nomoreparties.space';
const API_URL = '/api/ingredients';

export function apiData() {
	return fetch(`${ROOT_URL}${API_URL}`)
		.then((res) => {
			if (res.status !== 200) {
				throw Error(
					`Ошибка при обращении к ${ROOT_URL}${API_URL} ${res.status}: ${res.statusText}`
				);
			}
			return res.json();
		})
		.then((res) => {
			if (res.data && res.data.length > 0) {
				return Promise.resolve(res.data);
			} else {
				throw Error('Не получилось распарсить ответ');
			}
		});
}
