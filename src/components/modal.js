// Функция открытия popup

function openPopup(popup) {
			popup.classList.add('popup_is-opened');
			document.addEventListener('keydown', closePopupEscape);
}


// Функция закрытия popup по кнопке

function closePopup(popup) {
	popup.classList.remove('popup_is-opened')
	document.removeEventListener('keydown', closePopupEscape)
}

// Функция закрытия popup по Escape

function closePopupEscape(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened')
		closePopup(openedPopup)
	}
}

// Функция закрытия popup по overlay

function closePopupOverlay(evt) {
	if (evt.target === evt.currentTarget) { 
		closePopup(evt.target) 
	}  
}


export {
	openPopup,
	closePopup,
	closePopupEscape,
	closePopupOverlay
}