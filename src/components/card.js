// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content


// Функция создания карточки

function createCard(card, deleteCardHandler, openPopupHandler, likeCardHandler, currentUserID) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	cardElement.querySelector('.card__title').textContent = card.name
	const cardImage = cardElement.querySelector('.card__image')
	cardImage.src = card.link
	cardImage.alt = card.name

	const likeCardCount = cardElement.querySelector('.card__like-count')
	likeCardCount.textContent = card.likes.length

	// дополнительное решение, чтобы вёрстка не схлапывалась
	cardImage.onerror = function () {
		cardImage.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4KICA8cGF0aCBkPSJNMTAwLDEwMCBMIDAuNSwwIFoiIGlkPSJjaHJvbGxUaW1lci1ncm91cCIgZmlsbD0ibm9uZSIgc3R5bGU9ImZpbGw6YmxhY2s7IiAvPgo8cGF0aCBkPSJNNTAsNTAiIGlkPSJiYXIiIHN0eWxlPSJmaWxsOmJsYWNrOyIvPgo8L3N2Zz4K'
		cardImage.alt = 'Изображение недоступно'
	}

	const deleteCardButton = cardElement.querySelector('.card__delete-button')

	if (card.owner._id === currentUserID) {
		deleteCardButton.addEventListener('click', function () {
			// дополнительное решение, подтверждение удаления, правда без popup :(
			const isConfirmed = confirm('Вы уверены, что хотите удалить эту карточку?')
			if (isConfirmed) {
				deleteCardHandler(cardElement, card._id)
			}
		})
	} else {
		deleteCardButton.classList.add('card__delete-button-display-none')
	}

	cardImage.addEventListener('click', function () {
		openPopupHandler(cardImage.alt, cardImage.src)
	})

	const likeCardButton = cardElement.querySelector('.card__like-button')

	likeCardButton.addEventListener('click', function (event) {
		likeCardHandler(cardElement, card._id)
	})


	return cardElement
}


// Функция обновления лайка карточки


function updateLikeCount(cardElement, likeCount) {
	cardElement.querySelector('.card__like-count').textContent = likeCount
	const likeButton = cardElement.querySelector('.card__like-button')
	likeButton.classList.toggle('card__like-button_is-active')
}


export {
	createCard,
	updateLikeCount
}