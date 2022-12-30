export default class Card {
  constructor(cardData, templateSelector, openPreview) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._openPreview = openPreview;

    this._templateSelector = templateSelector;

    this.created = this._create();
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.firstElementChild;
  }

  _toggleLike = () =>
    this._likeButton.classList.toggle('element__like-button_active');

  _remove = () =>
    this._card.remove();

  _setListeners() {
    this._trashButton.addEventListener('click', this._remove);
    this._likeButton.addEventListener('click', this._toggleLike);
    this._imgElement.addEventListener('click', this._openPreview);
  }

  _buildImage(element) {
    element.src = this._link;
    element.alt = this._name; // .alt is excessive
  }

  _buildTitle(element) {
    element.textContent = this._name;
  }

  _create() {
    this._card = this._getTemplate().cloneNode(1);

    this._imgElement = this._card.querySelector('.element__image');
    this._buildImage(this._imgElement);

    this._trashButton = this._card.querySelector('.element__trash-button');

    this._titleElement = this._card.querySelector('.element__title');
    this._buildTitle(this._titleElement);
  
    this._likeButton = this._card.querySelector('.element__like-button');

    this._setListeners();

    return this._card;
  }
}
