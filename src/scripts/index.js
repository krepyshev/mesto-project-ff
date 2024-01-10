import '../pages/index.css'
import { initialCards } from '../scripts/cards'


// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// DOM узлы
const container = document.querySelector('.content')
const placesList = container.querySelector('.places__list')

const profileEditBtn = container.querySelector('.profile__edit-button')
const profileAddBtn = container.querySelector('.profile__add-button')

const editPopup = document.querySelector('.popup_type_edit')
const newCardPopup = document.querySelector('.popup_type_new-card')

const closePopupBtns = document.querySelectorAll('.popup__close')

const profileInfo = document.querySelector('.profile__info')
const profileTitle = profileInfo.querySelector('.profile__title')
const profileDescription = profileInfo.querySelector('.profile__description')



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
		openPopupHandler(imagePopup, cardImage.src, cardImage.alt)
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


// Функция вывода карточек на страницу

function renderHasCards(cards) {
	for (let card of cards) {
		const cardElement = createCard(card, deleteCard, openPopup, likeCard)
		placesList.append(cardElement)
	}
}

renderHasCards(initialCards)


// Функция открытия popup

function openPopup(popup, imgSrc, imgAlt) {
	const imagePopup = document.querySelector('.popup__image')
	const imageCaption = document.querySelector('.popup__caption')
	if (imgSrc) {
		imagePopup.src = imgSrc
		imagePopup.alt = imgAlt
		imageCaption.textContent = imgAlt
	}
	if (popup === editPopup) {
		const profileForm = document.forms['edit-profile']
		profileForm.name.value = profileTitle.textContent
		profileForm.description.value = profileDescription.textContent
	}

	popup.classList.add('popup_is-animated')
	setTimeout(() => popup.classList.add('popup_is-opened'), 1)

	document.addEventListener('keydown', closePopupEscape)
	popup.addEventListener('click', closePopupOverlay)
}

// Функция закрытия popup по кнопке

function closePopup(popup) {
	popup.classList.remove('popup_is-opened')
	setTimeout(() => popup.classList.remove('popup_is-animated'), 1000)
	deleteEventListener()
}

// Функция закрытия popup по Escape

function closePopupEscape(evt) {
	const openedPopup = document.querySelector('.popup_is-opened')
	if (openedPopup && evt.key === 'Escape') {
		closePopup(openedPopup)
	}
	deleteEventListener()
}

// Функция закрытия popup по overlay

function closePopupOverlay(evt) {
	const openedPopup = document.querySelector('.popup_is-opened')

	if (openedPopup && evt.target === evt.currentTarget) {
		closePopup(openedPopup)
	}
	deleteEventListener()
}

// Функция удаления слушателей

function deleteEventListener() {
	document.removeEventListener('keydown', closePopupEscape)
	document.removeEventListener('click', closePopupOverlay)
}


// Слушатели

profileEditBtn.addEventListener('click', function () {
	openPopup(editPopup)
})

profileAddBtn.addEventListener('click', function () {
	openPopup(newCardPopup)
})

closePopupBtns.forEach(function (closePopupBtn) {
	closePopupBtn.addEventListener('click', function () {
		const openedPopup = document.querySelector('.popup_is-opened')
		if (openedPopup) {
			closePopup(openedPopup)
		}
	})
})

// Обработчик формы редактирования профиля

const formEditProfile = document.forms['edit-profile']

function handleFormEditSubmit(evt) {
	evt.preventDefault()
	const nameInput = formEditProfile.name.value
	const jobInput = formEditProfile.description.value
	profileTitle.textContent = nameInput
	profileDescription.textContent = jobInput

	closePopup(editPopup)
}

formEditProfile.addEventListener('submit', handleFormEditSubmit)

// Обработчик формы добавления картинки

const formNewPlace = document.forms['new-place']

function handleFormPlaceSubmit(evt) {
	evt.preventDefault()
	const name = formNewPlace['place-name'].value
	const link = formNewPlace.link.value
	const card = { name, link }
	const cardElement = createCard(card, deleteCard, openPopup, likeCard)
	placesList.prepend(cardElement)
	formNewPlace.reset()

	closePopup(newCardPopup)
}

formNewPlace.addEventListener('submit', handleFormPlaceSubmit)
