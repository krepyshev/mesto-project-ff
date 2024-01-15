import '../pages/index.css'
import {
	initialCards
} from '../components/cards'
import {
	createCard,
	deleteCard,
	likeCard
} from '../components/card'
import {
	openPopup,
	closePopup,
	closePopupOverlay
} from '../components/modal'
import { error } from 'jquery'
// import {
// 	enableValidation,
// 	validationConfig,
// 	clearValidation
// } from '../components/validation'


// DOM узлы
const container = document.querySelector('.content')
const placesList = container.querySelector('.places__list')

const profileEditBtn = container.querySelector('.profile__edit-button')
const profileAddBtn = container.querySelector('.profile__add-button')

const newCardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')
const editPopup = document.querySelector('.popup_type_edit')

const closePopupBtns = document.querySelectorAll('.popup__close')

const profileInfo = document.querySelector('.profile__info')
const profileTitle = profileInfo.querySelector('.profile__title')
const profileDescription = profileInfo.querySelector('.profile__description')

const image = document.querySelector('.popup__image')
const imageCaption = document.querySelector('.popup__caption')

document
	.querySelectorAll('.popup')
	.forEach((popup) => popup.classList.add('popup_is-animated'))

// Функция вывода карточек на страницу

function renderHasCards(cards) {
	for (let card of cards) {
		const cardElement = createCard(card, deleteCard, openImagePopup, likeCard)
		placesList.append(cardElement)
	}
}

renderHasCards(initialCards)

// Функция заполнения и открытия popup с изображением

function openImagePopup(name, link) {
	image.src = link
	image.alt = link
	imageCaption.textContent = name
	openPopup(imagePopup)
}


// Слушатели

profileEditBtn.addEventListener('click', function () {
	const profileForm = document.forms['edit-profile']
	profileForm.name.value = profileTitle.textContent
	profileForm.description.value = profileDescription.textContent
	openPopup(editPopup)
})

profileAddBtn.addEventListener('click', function () {
	openPopup(newCardPopup)
})

closePopupBtns.forEach(closePopupBtn => {
	const popup = closePopupBtn.closest('.popup')
	closePopupBtn.addEventListener('click', () => closePopup(popup))
	popup.addEventListener('mousedown', closePopupOverlay)
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
	const cardElement = createCard(card, deleteCard, openImagePopup, likeCard)
	placesList.prepend(cardElement)
	formNewPlace.reset()
	closePopup(newCardPopup)
}

formNewPlace.addEventListener('submit', handleFormPlaceSubmit)




// validation

// const form = document.querySelector('.popup__form');
// const formInput = form.querySelector('.popup__input');
// const formError = form.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add('popup__input_type_error')
	errorElement.textContent = errorMessage
	errorElement.classList.add('popup__error_visible')
}

const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove('popup__input_type_error')
	errorElement.classList.remove('popup__error_visible')
	errorElement.textContent = ''
}

function checkInputValidity(formElement, inputElement) {
	let regex
	switch (inputElement.id) {
		case 'name-input':
		case 'description-input':
		case 'place-name':
			regex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/
			inputElement.setAttribute('data-error-message', 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы')
			break
		case 'url-input':
			regex = /^(ftp|http|https):\/\/[^ "]+$/
			inputElement.setAttribute('data-error-message', 'Введите адрес сайта')
			break
		default:
			regex = null
	}

	if (regex !== null) {
		if (!regex.test(inputElement.value)) {
			inputElement.setCustomValidity(inputElement.dataset.errorMessage)
		} else {
			inputElement.setCustomValidity('')
			inputElement.removeAttribute('data-error-message')
		}
	}

	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage)
	} else {
		hideInputError(formElement, inputElement)
	}
}

function setEventListener(formElement) {
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
	const buttonElement = formElement.querySelector('.popup__button')

	toggleButtonState(inputList, buttonElement)

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement)
			toggleButtonState(inputList, buttonElement)
		})
	})
}

function enableValidation(options) {
	const formList = Array.from(document.querySelectorAll(options.formSelector))
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			evt.preventDefault()
		})
		setEventListener(formElement)
	})
}

enableValidation({ formSelector: '.popup__form' })

// enableValidation({
// 	formSelector: '.popup__form',
// 	inputSelector: '.popup__input',
// 	submitButtonSelector: '.popup__button',
// 	inactiveButtonClass: 'popup__button_disabled',
// 	inputErrorClass: 'popup__input_type_error',
// 	errorClass: 'popup__error_visible'
// });

function hasInvalidInput(inputList) {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid
	})
}

function toggleButtonState(inputList, buttonElement) {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add('popup__button_disabled')
		buttonElement.setAttribute('disabled', 'disabled')
	}
	else {
		buttonElement.classList.remove('popup__button_disabled')
		buttonElement.removeAttribute('disabled')
	}
}


