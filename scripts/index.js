import Card from './Card.js';
import FormValidator from './FormValidator.js';

const defaultFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// FEAT: Profile editing

const profileEditorPopup = document.querySelector('#profile-editor');
const profileEditorValidator = new FormValidator(defaultFormConfig, document.querySelector('.popup__form'));
profileEditorValidator.enableValidation();

const nameInput = profileEditorPopup.querySelector('.popup__input[name="name"]');
const jobInput = profileEditorPopup.querySelector('.popup__input[name="job"]');

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__description');

const profileEditorOpenButton = document.querySelector('.profile__edit-button');
const formEditProfile = profileEditorPopup.querySelector('.popup__form');

profileEditorOpenButton.addEventListener('click', () => {
  formEditProfile.reset();

  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  openPopup(profileEditorPopup)
});

formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup(profileEditorPopup)
});

// FEAT: Card adding

const elementEditorPopup = document.querySelector('#element-editor');
const formAddCard = elementEditorPopup.querySelector('.popup__form');

const elementEditorValidator = new FormValidator(defaultFormConfig, elementEditorPopup.querySelector('.popup__form'));
elementEditorValidator.enableValidation();

const titleInput = elementEditorPopup.querySelector('.popup__input[name="title"]');
const linkInput = elementEditorPopup.querySelector('.popup__input[name="link"]');

formAddCard.addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    name: titleInput.value,
    link: linkInput.value,
  };
  createInsertDefaultCard(data);

  formAddCard.reset();
  closePopup(elementEditorPopup);
});

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', () => { openPopup(elementEditorPopup) });

const elementsContainer = document.querySelector('.elements__list');

function addCard(card) {
  elementsContainer.prepend(card.created);
}

function createInsertDefaultCard(data) {
  const cardInstance = new Card(data, '#element-template', openPreview);

  addCard(cardInstance);
}

//  FEAT: Image preview

const imageViewerPopup = document.querySelector('#image-viewer');

const popupImage = imageViewerPopup.querySelector('.popup__image');
const popupCaption = imageViewerPopup.querySelector('.popup__caption');

function openPreview(e) {
  popupImage.src = e.target.src;
  popupImage.alt = e.target.alt;

  popupCaption.textContent = e.target.alt;

  openPopup(imageViewerPopup)
}

// FEAT: Initial card loading

const initialCards = [
  {
    name: 'Белая Сова',
    link: './images/alex-kolodziej-l86QrwE_doA-unsplash.jpg',
  },
  {
    name: 'Таймс-сквер',
    link: './images/haniel-espinal-FBxWhv0Nf1E-unsplash.jpg',
  },
  {
    name: 'Скалолаз',
    link: './images/sean-benesh-VnmbcgAfL3Q-unsplash.jpg',
  },
  {
    name: 'Водопад',
    link: './images/ali-choubin-V8Czzpxg5Mw-unsplash.jpg',
  },
  {
    name: 'Девушка в красном',
    link: './images/megan-ruth-fY3DXRCNP_c-unsplash.jpg',
  },
  {
    name: 'Пора обедать',
    link: './images/filipp-romanovski-4aJEp9bgHJI-unsplash.jpg',
  },
];

initialCards.forEach(
    createInsertDefaultCard
);

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('click', clickOutsideHandler)
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keydownHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownHandler);
}

function clickOutsideHandler(e) {
  if (e.target === e.currentTarget || e.target.classList.contains('popup__close-button')) {
    const popupActive = getPopupActive();
    closePopup(popupActive);
  }
}

function keydownHandler(e) {
  if (e.key === 'Escape') {
    const popupActive = getPopupActive();
    closePopup(popupActive);
  }
}

function getPopupActive() {
  return document.querySelector('.popup_opened');
}
