const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
	headers: {
		authorization: '3a8f5c51-0c45-4a23-8019-51b30ffba8f3',
		'Content-Type': 'application/json'
	}
}

function request(url, options) {
	return fetch(url, options)
		.then(res => {
			if (res.ok) {
				return res.json()
			}
			return Promise.reject(`Ошибка: ${res.status}`)
		})
}

export const getInitialCards = () => {
	return request(`${config.baseUrl}/cards`, {
		headers: config.headers
	})	
}

export const getUserInfo = () => {
	return request(`${config.baseUrl}/users/me`, {
		headers: config.headers
	})
}

export const editUserInfo = (name, about) => {
	return request(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about
		})
	})
}

export const addNewCard = (name, link, currentUserId) => {
	return request(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			link: link,
			ownerId: currentUserId
		})
	})
}

export const deleteCard = (cardElement, cardId) => {
	return request(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	})
	.then((data) => {
		cardElement.remove()
		return data
	})
}

export const likeCard = (cardId) => {
	return request(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers
	})
}

export const unlikeCard = (cardId) => {
	return request(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers
	})
}

export const patchAvatar = (avatar) => {
	return request(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: avatar
		})
	})
}