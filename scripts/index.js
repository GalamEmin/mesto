import Card from './Card.js';
//import Form from './Popup__Form.js';
import FormValidator from './FormValidator.js';

const defaultFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

class Form {
  constructor(element) {
    this._element = element;
  
    this._closeButton = this._element.querySelector('.popup__close-button');

    this.form = this._element.querySelector('.popup__form');

    this._fullSubmitHandler = e => {
      e.preventDefault();
  
      this.submitHandler
        && this.submitHandler();
  
      this.toggle();

      document.activeElement.blur(); // fixes mobile keyboard being stuck on the screen after form submission (due to `event.preventDefault()`)
    }
  }

  _elementOpenedClass = 'popup_opened';
  
    toggle = () => {
      this._element.classList.contains(this._elementOpenedClass)
        ? this._removeListeners()
        : this._setListeners();
  
      this._element.classList.toggle(this._elementOpenedClass);
    }
  
    _clickHandler = e => {
      (e.target === e.currentTarget || e.target === this._closeButton)
        && this.toggle();
    }

    _keypressHandler = e => {
        console.log('test key keydown');
      (e.key === 'Escape' && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey)
        && this.toggle();
    }

  _setListeners() {
    this._element.addEventListener('click', this._clickHandler);
  
    document.addEventListener('keydown', this._keypressHandler);
    
    this.form.addEventListener('submit', this._fullSubmitHandler);
  }
  _removeListeners() {
    this._element.removeEventListener('click', this._clickHandler);
  
    document.removeEventListener('keydown', this._keypressHandler);

    this.form.removeEventListener('submit', this._fullSubmitHandler);
  }
}

// FEAT: Profile editing

const profileEditorPopup = document.querySelector('#profile-editor');
const profileEditor = new Form(profileEditorPopup);

const profileEditorValidator = new FormValidator(defaultFormConfig, profileEditor.form);
profileEditorValidator.enableValidation();

const nameInput = profileEditor.form.elements.name;
const jobInput = profileEditor.form.elements.job;

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__description');

profileEditor.form.addEventListener('reset', e => {
  e.preventDefault();

  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});

const profileEditorOpenButton = document.querySelector('.profile__edit-button');
profileEditorOpenButton.addEventListener('click', () => {
  profileEditor.form.reset();

  profileEditor.toggle();
});

profileEditor.submitHandler = () => {
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
};

// FEAT: Card adding

const elementEditorPopup = document.querySelector('#element-editor');
const elementEditor = new Form(elementEditorPopup);

const elementEditorValidator = new FormValidator(defaultFormConfig, elementEditor.form);
elementEditorValidator.enableValidation();

const titleInput = elementEditor.form.elements.title;
const linkInput = elementEditor.form.elements.link;

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', elementEditor.toggle);

const elementsContainer = document.querySelector('.elements__list');
function addCard(card) {
  elementsContainer.prepend(card.created);
}
function createInsertDefaultCard(data) {
  const cardInstance = new Card(data, '#element-template');

  addCard(cardInstance);
}

elementEditor.submitHandler = () => {
  createInsertDefaultCard({
    name: titleInput.value,
    link: linkInput.value,
  });

  elementEditor.form.reset();
};


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


