import './index.css';

// Images
import alexKolodziej from '../images/alex-kolodziej-l86QrwE_doA-unsplash.jpg';
import hanielEspinal from '../images/haniel-espinal-FBxWhv0Nf1E-unsplash.jpg';
import seanHenesh from '../images/sean-benesh-VnmbcgAfL3Q-unsplash.jpg';
import aliChoubin from '../images/ali-choubin-V8Czzpxg5Mw-unsplash.jpg';
import meganRuth from '../images/megan-ruth-fY3DXRCNP_c-unsplash.jpg';
import filippRomanovski from '../images/filipp-romanovski-4aJEp9bgHJI-unsplash.jpg';

import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const defaultFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const initialCards = [
  {
    name: 'Белая Сова',
    link: alexKolodziej,
  },
  {
    name: 'Таймс-сквер',
    link: hanielEspinal,
  },
  {
    name: 'Скалолаз',
    link: seanHenesh,
  },
  {
    name: 'Водопад',
    link: aliChoubin,
  },
  {
    name: 'Девушка в красном',
    link: meganRuth,
  },
  {
    name: 'Пора обедать',
    link: filippRomanovski,
  },
];


// FEAT: Profile editing

const profileEditorSelector = '#profile-editor';

const profileUserInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description'
});

const profileEditor = new PopupWithForm(profileEditorSelector, (data) =>
  profileUserInfo.setUserInfo({
    name: data.name,
    job: data.job
  })
);
profileEditor.setEventListeners();

const profileEditorValidator = new FormValidator(defaultFormConfig, profileEditor.form);
profileEditorValidator.enableValidation();

const {
  name: nameInput,
  job: jobInput
} = profileEditor.form.elements;

const profileEditorOpenButton = document.querySelector('.profile__edit-button');
profileEditorOpenButton.addEventListener('click', () => {
  const currentUserData = profileUserInfo.getUserInfo();

  nameInput.value = currentUserData.name;
  jobInput.value = currentUserData.job;

  profileEditor.open();
});

//  FEAT: Image preview

const imageViewer = new PopupWithImage('#image-viewer');
imageViewer.setEventListeners();

// FEAT: Initial card loading

const cardsList = new Section({
  items: initialCards,
  renderer: data => {
    const cardInstance = new Card(
      data,
      '#element-template', 
      () => imageViewer.open(data)
    );

    cardsList.addItem(cardInstance.created);
  }
}, '.elements__list');

cardsList.renderItems();

// FEAT: Card adding

const elementEditorSelector = '#element-editor';

const elementEditor = new PopupWithForm(elementEditorSelector, (data) => {
  data.name = data.title;
  delete data.title;

  cardsList.renderer(data);
});
elementEditor.setEventListeners();

const elementEditorValidator = new FormValidator(defaultFormConfig, elementEditor.form);
elementEditorValidator.enableValidation();

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', () => elementEditor.open());