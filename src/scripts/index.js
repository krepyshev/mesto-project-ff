import '../pages/index.css'
import {
	createCard,
	updateLikeCount
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
	deleteCard,
	likeCard,
	unlikeCard,
	patchAvatar
} from '../components/api'


// DOM узлы
const container = document.querySelector('.content')
const placesList = container.querySelector('.places__list')

const profileEditBtn = container.querySelector('.profile__edit-button')
const profileAddBtn = container.querySelector('.profile__add-button')
const profileImageEditBtn = container.querySelector('.profile__image__edit-button')

const newCardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')
const editPopup = document.querySelector('.popup_type_edit')
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar')

const closePopupBtns = document.querySelectorAll('.popup__close')

const profileImage = document.querySelector('.profile__image')
const profileInfo = document.querySelector('.profile__info')
const profileTitle = profileInfo.querySelector('.profile__title')
const profileDescription = profileInfo.querySelector('.profile__description')


const image = document.querySelector('.popup__image')
const imageCaption = document.querySelector('.popup__caption')

let now = new Date()
const copyright = document.querySelector('.footer__copyright')
copyright.textContent = `© ${now.getFullYear()} Mesto Russia`


document
	.querySelectorAll('.popup')
	.forEach((popup) => popup.classList.add('popup_is-animated'))


// Функция вывода карточек на страницу

function renderHasCards(getInitialCards, currentUserId) {
	return new Promise((resolve, reject) => {
		getInitialCards()
			.then(cards => {
				for (let card of cards) {
					const cardElement = createCard(card, deleteCard, openImagePopup, likeCardHandler, currentUserId)
					const isLikedByCurrentUser = card.likes.some(like => like._id === currentUserId)

					if (isLikedByCurrentUser) {
						const likeButton = cardElement.querySelector('.card__like-button')
						likeButton.classList.add('card__like-button_is-active')
					}

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

// Функция переключения like карточек

function likeCardHandler(cardElement, cardId) {
	const isLiked = cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active')
	if (isLiked) {
		unlikeCard(cardId)
			.then(updatedCard => {
				updateLikeCount(cardElement, updatedCard.likes.length)
			})
			.catch(error => {
				console.error('Ошибка при снятии лайка:', error)
			})
	} else {
		likeCard(cardId)
			.then(updatedCard => {
				updateLikeCount(cardElement, updatedCard.likes.length)
			})
			.catch(error => {
				console.error('Ошибка при постановке лайка:', error)
			})
	}
}

// Слушатели

profileImageEditBtn.addEventListener('click', function () {
	openPopup(editAvatarPopup)
})

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

// Обработчик формы редактирования аватара

const formEditAvatar = document.forms['edit-avatar']

function handleFormEditAvatarSubmit(evt) {
	evt.preventDefault()
	const linkAvatar = formEditAvatar['link-avatar'].value
	const submitButton = evt.target.closest('form').querySelector('.popup__button')
	submitButton.textContent = 'Сохранение...'
	patchAvatar(linkAvatar)
		.then(updatedUserAvatar => {
			profileImage.style.backgroundImage = `url(${updatedUserAvatar.avatar})`
			clearValidation(formEditAvatar, validationConfig)
			closePopup(editAvatarPopup)
		})
		.catch(error => {
			console.error('Ошибка при редактировании аватара:', error)
		})
		.finally(() => {
			submitButton.textContent = 'Сохранить'
		})
}

formEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit)

// Обработчик формы редактирования профиля

const formEditProfile = document.forms['edit-profile']

function handleFormEditSubmit(evt) {
	evt.preventDefault()
	const nameInput = formEditProfile.name.value
	const jobInput = formEditProfile.description.value
	const submitButton = evt.target.closest('form').querySelector('.popup__button')
	submitButton.textContent = 'Сохранение...'
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
		.finally(() => {
			submitButton.textContent = 'Сохранить'
		})
}

formEditProfile.addEventListener('submit', handleFormEditSubmit)

// Обработчик формы добавления картинки

const formNewPlace = document.forms['new-place']

function handleFormPlaceSubmit(evt) {
	evt.preventDefault()
	const name = formNewPlace['place-name'].value
	const link = formNewPlace.link.value
	const submitButton = evt.target.closest('form').querySelector('.popup__button')
	submitButton.textContent = 'Создание...'
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
		.finally(() => {
			submitButton.textContent = 'Создать'
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