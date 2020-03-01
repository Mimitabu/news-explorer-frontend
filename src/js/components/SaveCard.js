import { mainApi } from '../constants/constants';

export default class SaveCard {
  conctructor(data) {
    this._delete = this._delete.bind(this);
    this.keyword = data.keyword;
    this.title = data.title;
    this.text = data.text;
    this.date = data.date;
    this.source = data.source;
    this.link = data.link;
    this.image = data.image;
    this.id = data._id;
    this.cardElement = this.createCard();
    this.hoverButton = this.cardElement
      .querySelector('.result-card__button-warning');
    this.removeButton = this.cardElement
      .querySelector('.result-card__button')
      .addEventListener('click', this._delete);
  }

  createCard() {
    // родительский контейнер
    const placeCardElement = document.createElement('div');
    // div с изображением
    const cardImageElement = document.createElement('div');
    // дочерние элементы
    const keyWordElement = document.createElement('div');
    const buttonContent = document.createElement('div');
    const buttonWarning = document.createElement('div');
    const button = document.createElement('button');
    const buttonIcon = document.createElement('div');
    // div с описанием
    const cardDescriptionElement = document.createElement('div');
    // дочерние элементы
    const descriptionData = document.createElement('p');
    const descriptionTitle = document.createElement('h3');
    const descriptionAbout = document.createElement('p');
    const descriptionSource = document.createElement('a');

    placeCardElement.classList.add('result-card');
    placeCardElement.setAttribute('id', this.id);

    cardImageElement.classList.add('result-card__image');
    cardImageElement.style.backgroundImage = `url(${this.image})`;
    keyWordElement.classList.add('.result-card__key-word');
    buttonContent.classList.add('result-card__button-content');
    buttonWarning.classList.add('result-card__button-warning');
    button.classList.add('result-card__button');
    buttonIcon.classList.add('result-card__button-icon');
    buttonIcon.classList.add('result-card__button-icon_favorites');

    cardDescriptionElement.classList.add('result-card__description');
    descriptionData.classList.add('result-card__description-data');
    descriptionData.textContent = this.date;
    descriptionTitle.classList.add('result-card__description-title');
    descriptionTitle.textContent = this.title;
    descriptionAbout.classList.add('result-card__description-about');
    descriptionAbout.textContent = this.text;
    descriptionSource.classList.add('result-card__description-source');
    descriptionSource.textContent = this.source;
    descriptionSource.setAttribute('href', this.image);
    descriptionSource.setAttribute('target', '_blank');

    placeCardElement.appendChild(cardImageElement);
    placeCardElement.appendChild(cardDescriptionElement);

    cardImageElement.appendChild(buttonContent);
    cardImageElement.appendChild(keyWordElement);
    buttonContent.appendChild(buttonWarning);
    buttonContent.appendChild(button);
    button.appendChild(buttonIcon);

    cardDescriptionElement.appendChild(descriptionData);
    cardDescriptionElement.appendChild(descriptionTitle);
    cardDescriptionElement.appendChild(descriptionAbout);
    cardDescriptionElement.appendChild(descriptionSource);
    buttonContent.addEventListener('mouseover', this._hoverOn);
    buttonContent.addEventListener('mouseout', this._hoverOff);

    return placeCardElement;
  }

  _delete(event) {
    mainApi.removeArticle(this.cardElement.getAttribute('id'))
      .then(() => {
        event.target.closest('.result-card').remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _hoverOn() {
    this.hoverButton.classList.add('result-card__button-warning_is-opened');
  }

  _hoverOff() {
    this.hoverButton.classList.remove('result-card__button-warning_is-opened');
  }
}