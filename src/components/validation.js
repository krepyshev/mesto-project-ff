
const showInputError = (formElement, inputElement, errorMessage, settings) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add(settings.inputErrorClass)
	errorElement.textContent = errorMessage
	errorElement.classList.add(settings.errorClass)
}

const hideInputError = (formElement, inputElement, settings) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove(settings.inputErrorClass)
	errorElement.classList.remove(settings.errorClass)
	errorElement.textContent = ''
}

function checkInputValidity(formElement, inputElement, settings) {
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
		showInputError(formElement, inputElement, inputElement.validationMessage, settings)
	} else {
		hideInputError(formElement, inputElement, settings)
	}
}

function setEventListener(formElement, settings) {
	const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
	const buttonElement = formElement.querySelector(settings.submitButtonSelector)

	toggleButtonState(inputList, buttonElement, settings)

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement, settings)
			toggleButtonState(inputList, buttonElement, settings)
		})
	})
}

function enableValidation(settings) {
	const formList = Array.from(document.querySelectorAll(settings.formSelector))
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			evt.preventDefault()
		})
		setEventListener(formElement, settings)
	})
}

function hasInvalidInput(inputList) {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid
	})
}

function toggleButtonState(inputList, buttonElement, settings) {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(settings.inactiveButtonClass)
		buttonElement.setAttribute('disabled', 'disabled')
	}
	else {
		buttonElement.classList.remove(settings.inactiveButtonClass)
		buttonElement.removeAttribute('disabled')
	}
}


function clearValidation(formElement, settings) {
	const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
	const buttonElement = formElement.querySelector(settings.submitButtonSelector)

	inputList.forEach((inputElement) => {
		hideInputError(formElement, inputElement, settings)
		inputElement.setCustomValidity('')
		inputElement.removeAttribute('data-error-message')
	})

	buttonElement.classList.add(settings.inactiveButtonClass)
	buttonElement.setAttribute('disabled', 'disabled')
}

export { enableValidation, clearValidation }