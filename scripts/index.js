// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы
const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list')




// @todo: Функция создания карточки
function createCard(card, deleteCardHandler) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__title').textContent = card.name
  cardElement.querySelector('.card__image').src = card.link
  cardElement.querySelector('.card__image').alt = card.name
  
  const deleteCardButton = cardElement.querySelector('.card__delete-button')

  deleteCardButton.addEventListener('click', function () {
    deleteCardHandler(cardElement)
  })
  
  return cardElement
}


// @todo: Функция удаления карточки

function deleteCard(card) {
  card.remove()
}


// @todo: Вывести карточки на страницу

function renderHasCards(cards) {
  for (card of cards) {
    const cardElement = createCard(card, deleteCard)
    placesList.append(cardElement)
  }
  }

renderHasCards(initialCards)




