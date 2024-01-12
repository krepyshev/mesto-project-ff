// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content


// Функция создания карточки

function createCard(card, deleteCardHandler, openPopupHandler, likeCardHandler) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	cardElement.querySelector('.card__title').textContent = card.name
	const cardImage = cardElement.querySelector('.card__image')
	cardImage.src = card.link
	cardImage.alt = card.name

	const deleteCardButton = cardElement.querySelector('.card__delete-button')

	deleteCardButton.addEventListener('click', function () {
		deleteCardHandler(cardElement)
	})

  cardImage.addEventListener('click', function () {
		openPopupHandler(cardImage.alt, cardImage.src)
	})

	const likeCardButton = cardElement.querySelector('.card__like-button')

	likeCardButton.addEventListener('click', function () {
		likeCardHandler(cardElement)
	})

	return cardElement
}

// Функция удаления карточки

function deleteCard(card) {
	card.remove()
}

// Функция лайка карточки

function likeCard(card) {
	const likeButton = card.querySelector('.card__like-button')
	likeButton.classList.toggle('card__like-button_is-active')
}


export {
	createCard,
	deleteCard,
	likeCard
}