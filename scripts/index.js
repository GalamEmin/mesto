
class Popup {
  constructor(element) {
    this.element = element;

    this.closeButton = element.querySelector('.popup__close-button');

    this.addListeners();
  }

  elementOpenedString = 'popup_opened';

  toggle() {
    this.element.classList.toggle(this.elementOpenedString);
  }

  addListeners() {
    this.closeButton.addEventListener('click', () => this.toggle());
  }
}

class Form extends Popup {
  constructor(popupElement) {
    super(popupElement);

    this.form = popupElement.querySelector('.popup__form');
  }

  setSubmitHandler(handler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();

      handler();

      super.toggle();
    });
  }
}

// FEAT: Profile editing

const profileEditorPopup = document.querySelector('#profile-editor');

const profileEditor = new Form(profileEditorPopup);

const profileEditorOpenButton = document.querySelector('.profile__edit-button');

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__description');

const nameInput = profileEditorPopup.querySelector('.popup__input[name="name"]');
const jobInput = profileEditorPopup.querySelector('.popup__input[name="job"]');

profileEditorOpenButton.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  profileEditor.toggle();
});

profileEditor.setSubmitHandler(() => {
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
});

// FEAT: Card adding

const elementEditorPopup = document.querySelector('#element-editor');

const elementEditor = new Form(elementEditorPopup);

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', () => { elementEditor.toggle() });

const titleInput = elementEditorPopup.querySelector('.popup__input[name="title"]');
const linkInput = elementEditorPopup.querySelector('.popup__input[name="link"]');

const elementsContainer = document.querySelector('.elements__list');

function addCard(card, toBeginning) {
  toBeginning
    ? elementsContainer.prepend(card.created)
    : elementsContainer.append(card.created);
}

elementEditor.setSubmitHandler(() => {
  const cardInstance = new Card(
    titleInput.value,
    linkInput.value
  );

  addCard(cardInstance, 1);

  elementEditor.form.reset();
});

//  FEAT: Image preview

const imageViewerPopup = document.querySelector('#image-viewer');
const imageViewer = new Popup(imageViewerPopup);

const popupImage = imageViewerPopup.querySelector('.popup__image');
const popupCaption = imageViewerPopup.querySelector('.popup__caption');

function openPreview(e) {
  popupImage.src = e.target.src;
  popupImage.alt = e.target.alt;

  popupCaption.textContent = e.target.alt;

  imageViewer.toggle();
}

class Card {
  constructor(title, imgLink) {
    this.title = title;
    this.imgLink = imgLink;

    this.created = this.create();
  }

  elementTemplate = document.querySelector('#element-template').content;

  toggleLike(e) {
    e.target.classList.toggle('element__like-button_active');
  }

  remove(e) {
    e.target.parentNode.remove();
  }

  create() {
    const card = this.elementTemplate.firstElementChild.cloneNode(1);

    const imgElement = card.querySelector('.element__image');
    const trashButton = card.querySelector('.element__trash-button');

    const titleElement = card.querySelector('.element__title');
  
    const likeButton = card.querySelector('.element__like-button');
  
    imgElement.src = this.imgLink;
    imgElement.alt = this.title;
  
    titleElement.textContent = this.title;

    imgElement.addEventListener('click', openPreview);

    trashButton.addEventListener('click', this.remove);
    likeButton.addEventListener('click', this.toggleLike);
  
    return card;
  }
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
  const cardInstance = new Card(card.name, card.link);
  addCard(cardInstance);
});