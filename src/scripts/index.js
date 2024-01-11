import '../pages/index.css'
import {
	initialCards
} from '../components/cards'
import {
	createCard,
	deleteCard,
	likeCard,
	renderHasCards
} from '../components/card'
import {
	openPopup,
	closePopup,
	editPopup,
	profileTitle,
	profileDescription,
} from '../components/modal'


// DOM узлы
const container = document.querySelector('.content')
const placesList = container.querySelector('.places__list')

const profileEditBtn = container.querySelector('.profile__edit-button')
const profileAddBtn = container.querySelector('.profile__add-button')

const newCardPopup = document.querySelector('.popup_type_new-card')
const closePopupBtns = document.querySelectorAll('.popup__close')


renderHasCards(initialCards)

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
