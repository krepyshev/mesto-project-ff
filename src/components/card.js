import {
	openPopup
} from './modal'

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

const container = document.querySelector('.content')
const placesList = container.querySelector('.places__list')

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

	const imagePopup = document.querySelector('.popup_type_image')

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

// Функция добавления изображения в popup image

function PopupImage(imgAlt, imgSrc) {
	const imagePopup = document.querySelector('.popup_type_image')
	const image = document.querySelector('.popup__image')
	const imageCaption = document.querySelector('.popup__caption')
	if (imgSrc) {
		image.src = imgSrc
		image.alt = imgAlt
		imageCaption.textContent = imgAlt
	}
	openPopup(imagePopup)
}


// Функция вывода карточек на страницу


function renderHasCards(cards) {
	for (let card of cards) {
		const cardElement = createCard(card, deleteCard, PopupImage, likeCard)
		placesList.append(cardElement)
	}
}

export {
	createCard,
	deleteCard,
	likeCard,
	renderHasCards
}