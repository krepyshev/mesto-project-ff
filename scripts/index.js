// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы
const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list')


// @todo: Функция создания карточки
function addCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__title').textContent = card.name
  cardElement.querySelector('.card__image').src = card.link
  return cardElement
}


// @todo: Функция удаления карточки

function deleteCard() {
  const cards = document.querySelector('.card')
  cards.remove();
}


// @todo: Вывести карточки на страницу

function renderHasCards(cards) {
  for (card of cards) {
    const cardElement = addCard(card)
    placesList.append(cardElement)
    const deleteCardButton = cardElement.querySelector('.card__delete-button')
    deleteCardButton.addEventListener('click', function () {
      deleteCard()
    })
  }
  
}

renderHasCards(initialCards)




