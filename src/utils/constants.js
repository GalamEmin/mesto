const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditBtn = document.querySelector('.profile__edit-button');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('#name');
const jobInput = formEditProfile.querySelector('#job');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupAddNewCardOpenBtn = document.querySelector('.profile__add-button');
const formAddNewCard = popupAddNewCard.querySelector('.popup__form');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
const buttonEditAvatar = document.querySelector('.profile__avatar-btn');
const avatar = document.querySelector('.profile__avatar');

const config = {
  popupForm : '.popup__form',
  inputErrorClass : 'form__input_type_error',
  inputErrorActive : 'form__input-error_active',
  formInput : '.form__input',
  formSubmit : '.form__submit',
};

export {popupEditProfile, profileEditBtn, formEditProfile, nameInput, jobInput, formAddNewCard,
  popupAddNewCardOpenBtn, popupAddNewCard, config, buttonEditAvatar, formEditAvatar,
avatar};
