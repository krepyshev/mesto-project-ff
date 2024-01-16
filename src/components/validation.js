
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
		case 'card-name-input':
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

function clearValidation(formElement, options) {
	const inputList = Array.from(formElement.querySelectorAll(options.inputSelector))
	const buttonElement = formElement.querySelector(options.submitButtonSelector)

	inputList.forEach((inputElement) => {
		hideInputError(formElement, inputElement)
		inputElement.setCustomValidity('')
		inputElement.removeAttribute('data-error-message')
	})

	buttonElement.classList.add(options.inactiveButtonClass)
	buttonElement.setAttribute('disabled', 'disabled')
}

export {enableValidation, clearValidation}