import '../pages/index.css'
import {
	initialCards
} from '../components/cards'
import {
	createCard,
	deleteCard,
	likeCard,
	addImagePopup
} from '../components/card'
import {
	openPopup,
	closePopup,
	editPopup,
	closePopupOverlay
} from '../components/modal'


// DOM узлы
const container = document.querySelector('.content')
const placesList = container.querySelector('.places__list')

const profileEditBtn = container.querySelector('.profile__edit-button')
const profileAddBtn = container.querySelector('.profile__add-button')

const newCardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')
const closePopupBtns = document.querySelectorAll('.popup__close')

const profileInfo = document.querySelector('.profile__info')
const profileTitle = profileInfo.querySelector('.profile__title')
const profileDescription = profileInfo.querySelector('.profile__description')

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

// Функция открытия popup с изображением

function openImagePopup(name, link) {
	addImagePopup(name, link)
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
