import '../pages/index.css'
import { initialCards } from '../scripts/cards'


// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// DOM узлы
const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list')

const profileEditBtn = container.querySelector('.profile__edit-button')
const profileAddBtn = container.querySelector('.profile__add-button')

const editPopup = document.querySelector('.popup_type_edit')
const newCardPopup = document.querySelector('.popup_type_new-card')

const closePopupBtns = document.querySelectorAll('.popup__close')

// const profileForm = document.forms['edit-profile']

// Функция создания карточки

function createCard(card, deleteCardHandler, openPopupHandler) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__title').textContent = card.name
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = card.link
  cardImage.alt = card.name
  
  const deleteCardButton = cardElement.querySelector('.card__delete-button')

  deleteCardButton.addEventListener('click', function () {
    deleteCardHandler(cardElement)
  })



  const imagePopup = document.querySelector('.popup_type_image')

  cardImage.addEventListener('click', function() {
    openPopupHandler(imagePopup, cardImage.src, cardImage.alt)
  })
  
  return cardElement
}



// Функция удаления карточки
function deleteCard(card) {
  card.remove()
}


// Функция вывода карточек на страницу
function renderHasCards(cards) {
  for (let card of cards) {
    const cardElement = createCard(card, deleteCard, openPopup)
    placesList.append(cardElement)
  }
  }

renderHasCards(initialCards)



// Функция открытия popup

function openPopup(popup, imgSrc, imgAlt){
  const imagePopup = document.querySelector('.popup__image')
  if (imgSrc) {
    imagePopup.src = imgSrc
    imagePopup.alt = imgAlt
  }
  popup.classList.add('popup_is-animated')
  setTimeout(() =>  popup.classList.add('popup_is-opened'), 1) 
}

// Функция закрытия popup

function closePopup(popup){
  popup.classList.remove('popup_is-opened')
  setTimeout(() =>  popup.classList.remove('popup_is-animated'), 1000)
}



// Прослушиватели

profileEditBtn.addEventListener('click', function() {
  openPopup(editPopup)
})

profileAddBtn.addEventListener('click', function() {
  openPopup(newCardPopup)
})

closePopupBtns.forEach(function(closePopupBtn) {
  closePopupBtn.addEventListener('click', function() {
    const openedPopup = document.querySelector('.popup_is-opened')
    if (openedPopup) {
      closePopup(openedPopup)
    }
  })
})

document.addEventListener('keydown', function (evt) {
  const openedPopup = document.querySelector('.popup_is-opened')
    if (openedPopup && evt.key === 'Escape') {
        closePopup(openedPopup)
      }
  })

