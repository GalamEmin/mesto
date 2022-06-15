

const profileElement = document.querySelector('.profile');

const editButton = profileElement.querySelector('.profile__edit-button');

const nameElement = profileElement.querySelector('.profile__name');
const jobElement = profileElement.querySelector('.profile__description');

const popupElement = document.querySelector('.popup');
const popupElementOpenedString = 'popup_opened';

const closeButton = popupElement.querySelector('.popup__close-button');

const formElement = popupElement.querySelector('.popup__form');

const nameInput = formElement.querySelector('.popup__input[name="name"]');
const jobInput = formElement.querySelector('.popup__input[name="job"]');



function popupToggle() {
  popupElement.classList.toggle(popupElementOpenedString);
}

function popupOpen() {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  popupToggle();
}

function formSubmitHandler(e) {
  e.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  popupToggle();
}



editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupToggle);

formElement.addEventListener('submit', formSubmitHandler); 