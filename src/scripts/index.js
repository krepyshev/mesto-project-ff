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

const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector('.popup__error')

const showError = (input, errorMessage) => {
	input.classList.add('popup__input_type_error')
	formError.textContent = errorMessage
	formError.classList.add('popup__error_visible')
};

const hideError = (input) => {
	input.classList.remove('popup__input_type_error')
	formError.classList.remove('popup__error_visible')
	formError.textContent = ''
};

function checkInputValidity() {
	if (!formInput.validity.valid) {
		showError(formInput, formInput.validationMessage);
	} else {
		hideError(formInput)
	}
}

formElement.addEventListener('submit', function (evt) {
	evt.preventDefault();
});


formInput.addEventListener('input', function () {
	checkInputValidity();
});




// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
// 	formSelector: '.popup__form',
// 	inputSelector: '.popup__input',
// 	submitButtonSelector: '.popup__button',
// 	inactiveButtonClass: 'popup__button_disabled',
// 	inputErrorClass: 'popup__input_type_error',
// 	errorClass: 'popup__error_visible'
// });