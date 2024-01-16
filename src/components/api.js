const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
	headers: {
		authorization: '3a8f5c51-0c45-4a23-8019-51b30ffba8f3',
		'Content-Type': 'application/json'
	}
}

export const getInitialCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers
	})
		.then(res => {
			if (res.ok) {
				return res.json()
			}
			return Promise.reject(`Ошибка: ${res.status}`)
		})
}

export const getUserInfo = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers
	})
		.then(res => {
			if (res.ok) {
				return res.json()
			}
			return Promise.reject(`Ошибка: ${res.status}`)
		})
}