
const profileEditorPopup = document.querySelector('#profile-editor');

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

const elementEditorPopup = document.querySelector('#element-editor');
const formAddCard = elementEditorPopup.querySelector('.popup__form');
formAddCard.addEventListener('submit', e => {
  e.preventDefault();

  const cardInstance = createCard(titleInput.value, linkInput.value);

  addCard(cardInstance, true);

  formAddCard.reset();
  closePopup(elementEditorPopup);
});

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', () => { openPopup(elementEditorPopup) });

const titleInput = elementEditorPopup.querySelector('.popup__input[name="title"]');
const linkInput = elementEditorPopup.querySelector('.popup__input[name="link"]');

const elementsContainer = document.querySelector('.elements__list');

function addCard(card, toBeginning) {
  toBeginning
    ? elementsContainer.prepend(card)
    : elementsContainer.append(card);
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

const elementTemplate = document.querySelector('#element-template').content;

function createCard(title, imgLink) {
  const card = elementTemplate.firstElementChild.cloneNode(1);

  const imgElement = card.querySelector('.element__image');
  const trashButton = card.querySelector('.element__trash-button');

  const titleElement = card.querySelector('.element__title');

  const likeButton = card.querySelector('.element__like-button');

  imgElement.src = imgLink;
  imgElement.alt = title;

  titleElement.textContent = title;

  imgElement.addEventListener('click', openPreview);

  trashButton.addEventListener('click', (e) => {
    e.target.parentNode.remove();
  });
  likeButton.addEventListener('click', (e) => {
    e.target.classList.toggle('element__like-button_active')
  });

  return card;
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

initialCards.forEach(card => {
  const cardInstance = createCard(card.name, card.link);
  addCard(cardInstance, false);
});

document.querySelectorAll('.popup').forEach((domElement) => {
  domElement.addEventListener('click', clickOutsideHandler)
});

function openPopup(domElement) {
  domElement.classList.add('popup_opened');
  document.addEventListener('keydown', keydownHandler);
}

function closePopup(domElement) {
  domElement.classList.remove('popup_opened');
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
