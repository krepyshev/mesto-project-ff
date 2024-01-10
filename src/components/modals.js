export const editPopup = document.querySelector('.popup_type_edit')

const profileInfo = document.querySelector('.profile__info')
export const profileTitle = profileInfo.querySelector('.profile__title')
export const profileDescription = profileInfo.querySelector('.profile__description')



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

export {
	openPopup,
	closePopup,
	closePopupEscape,
	closePopupOverlay
}