const profileEditorPopup = document.querySelector('#profile-editor');

const nameInput = profileEditorPopup.querySelector('.popup__input[name="name"]');
const jobInput = profileEditorPopup.querySelector('.popup__input[name="job"]');

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__description');

const profileEditorOpenButton = document.querySelector('.profile__edit-button');
profileEditorOpenButton.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  openPopup(profileEditorPopup)
});

const profileEditorSaveButton = document.querySelector('#profile-editor > div:nth-child(1) > form:nth-child(3) > button:nth-child(3)');
profileEditorSaveButton.addEventListener('click', () => {
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup(profileEditorPopup)
});

const profileEditorCloseButton = profileEditorPopup.querySelector('.popup__close-button');
profileEditorCloseButton.addEventListener('click', () => {
  closePopup(profileEditorPopup)
});

const elementEditorPopup = document.querySelector('#element-editor');
const formAddCard = elementEditorPopup.querySelector('.popup__form');
elementEditorPopup.addEventListener('submit', e => {
  e.preventDefault();

  const cardInstance = createCard(titleInput.value, linkInput.value);

  addCard(cardInstance, true);

  formAddCard.reset();
  closePopup(elementEditorPopup);
});

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', () => { openPopup(elementEditorPopup) });

const elementEditorCloseButton = elementEditorPopup.querySelector('.popup__close-button');
elementEditorCloseButton.addEventListener('click', () => { closePopup(elementEditorPopup) });

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
const popupImageCloseButton = imageViewerPopup.querySelector('.popup__close-button');
popupImageCloseButton.addEventListener('click', () => {
  closePopup(imageViewerPopup)
})

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

  trashButton.addEventListener('click', (e ) => {
    e.target.parentNode.remove();
  });
  likeButton.addEventListener('click', (e) => {
    if (e.target.classList.contains('element__like-button_active')) {
      e.target.classList.remove('element__like-button_active');
    } else {
      e.target.classList.add('element__like-button_active');
    }

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

function openPopup(domElement) {
  if (!domElement.classList.contains('popup_opened')) {
    domElement.classList.add('popup_opened');
  }
}

function closePopup(domElement) {
  if (domElement.classList.contains('popup_opened')) {
    domElement.classList.remove('popup_opened');
  }
}

const formEditProfile = document.querySelector('.popup__form');
formEditProfile.addEventListener('submit', e => {
  e.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup(form);
});