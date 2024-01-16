import '../pages/index.css'
import {
	createCard,
	likeCard
} from '../components/card'

import {
	openPopup,
	closePopup,
	closePopupOverlay
} from '../components/modal'

import {
	enableValidation,
	clearValidation
} from '../components/validation'

import { 
	getInitialCards,
	getUserInfo,
	editUserInfo,
	addNewCard,
	deleteCard
} from '../components/api'


// DOM узлы
const container = document.querySelector('.content')
const placesList = container.querySelector('.places__list')

const profileEditBtn = container.querySelector('.profile__edit-button')
const profileAddBtn = container.querySelector('.profile__add-button')

const newCardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')
const editPopup = document.querySelector('.popup_type_edit')

const closePopupBtns = document.querySelectorAll('.popup__close')

const profileImage = document.querySelector('.profile__image')
const profileInfo = document.querySelector('.profile__info')
const profileTitle = profileInfo.querySelector('.profile__title')
const profileDescription = profileInfo.querySelector('.profile__description')


const image = document.querySelector('.popup__image')
const imageCaption = document.querySelector('.popup__caption')


document
	.querySelectorAll('.popup')
	.forEach((popup) => popup.classList.add('popup_is-animated'))


// Функция вывода карточек на страницу

function renderHasCards(getInitialCards, currentUserId) {
	return new Promise((resolve, reject) => {
		getInitialCards()
			.then(cards => {
				for (let card of cards) {
					const cardElement = createCard(card, deleteCard, openImagePopup, likeCard, currentUserId)
					placesList.append(cardElement)
				}
				resolve()
			})
			.catch(error => {
				console.error('Ошибка при загрузке карточек:', error)
				reject(error)
			})
	})
}



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

	editUserInfo(nameInput, jobInput)
		.then(updateUserInfo => {
			profileTitle.textContent = updateUserInfo.name
			profileDescription.textContent = updateUserInfo.about
			clearValidation(formEditProfile, validationConfig)
			closePopup(editPopup)
	})
	.catch(error => {
		console.error('Ошибка при редактировании профиля:', error)
	})
}

formEditProfile.addEventListener('submit', handleFormEditSubmit)

// Обработчик формы добавления картинки

const formNewPlace = document.forms['new-place']

function handleFormPlaceSubmit(evt) {
	evt.preventDefault()
	const name = formNewPlace['place-name'].value
	const link = formNewPlace.link.value

	addNewCard(name, link)
		.then(newCard => {
			const cardElement = createCard(newCard, deleteCard, openImagePopup, likeCard)
			placesList.prepend(cardElement)
			formNewPlace.reset()
			clearValidation(formNewPlace, validationConfig)
			closePopup(newCardPopup)
		})
		.catch(error => {
			console.error('Ошибка при добавлении новой карточки:', error)
		})
}

formNewPlace.addEventListener('submit', handleFormPlaceSubmit)

// Включение валидации

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
}

enableValidation(validationConfig)


// Установка данных пользователя и вывод карточек

const promiseArray = [getUserInfo(), getInitialCards]

Promise.all(promiseArray)
  .then(([userInfo, initialCards]) => {
		const currentUserID = userInfo._id
    profileTitle.textContent = userInfo.name
    profileDescription.textContent = userInfo.about
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`
    
    renderHasCards(initialCards, currentUserID)
  })
  .catch(error => {
    console.error('Ошибка при загрузке данных:', error)
  })






