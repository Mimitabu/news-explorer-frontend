import { getProfile } from '../utils/utils';

export default class NewsCard {
  constructor(data, keyWord) {
    this.hoverIconOn = this.hoverIconOn.bind(this);
    this.hoverIconOff = this.hoverIconOff.bind(this);
    this.activeIcon = this.activeIcon.bind(this);
    this.title = data.title;
    this.publishedAt = data.publishedAt;
    this.description = data.description;
    this.urlToImage = data.urlToImage;
    this.source = data.source.name;
    this.url = data.url;
    this.cardElement = this.createCard(keyWord);
    this.icon = this.cardElement.querySelector('.result-card__button-icon');
    this.iconButton = this.cardElement.querySelector('.result-card__button');
    this.hoverButton = this.cardElement.querySelector('.result-card__button-warning');

  }

  renderIcon(flag) {
    if (flag) {
      this.icon.classList.add('result-card__button-icon_marced');
    } else {
      this.icon.classList.remove('result-card__button-icon_marced');
    }
  }

  activeIcon(button) {
    if (getProfile) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', true);
    }
  }


  createCard(userKeyWord) {
    // родительский контейнер
    const placeCardElement = document.createElement('div');
    // div с изображением
    const cardImageElement = document.createElement('div');
    // дочерние элементы
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
    placeCardElement.setAttribute('keyWord', userKeyWord);

    cardImageElement.classList.add('result-card__image');
    cardImageElement.style.backgroundImage = `url(${this.urlToImage})`;
    buttonContent.classList.add('result-card__button-content');
    buttonWarning.classList.add('result-card__button-warning');
    button.classList.add('result-card__button');
    button.setAttribute('disabled', true);
    buttonIcon.classList.add('result-card__button-icon');
    buttonIcon.classList.add('result-card__button-icon_normal');

    cardDescriptionElement.classList.add('result-card__description');
    descriptionData.classList.add('result-card__description-data');
    descriptionData.textContent = this.publishedAt;
    descriptionTitle.classList.add('result-card__description-title');
    descriptionTitle.textContent = this.title;
    descriptionAbout.classList.add('result-card__description-about');
    descriptionAbout.textContent = this.description;
    descriptionSource.classList.add('result-card__description-source');
    descriptionSource.textContent = this.source;
    descriptionSource.setAttribute('href', this.url);
    descriptionSource.setAttribute('target', '_blank');

    placeCardElement.appendChild(cardImageElement);
    placeCardElement.appendChild(cardDescriptionElement);

    cardImageElement.appendChild(buttonContent);
    buttonContent.appendChild(buttonWarning);
    buttonContent.appendChild(button);
    button.appendChild(buttonIcon);

    cardDescriptionElement.appendChild(descriptionData);
    cardDescriptionElement.appendChild(descriptionTitle);
    cardDescriptionElement.appendChild(descriptionAbout);
    cardDescriptionElement.appendChild(descriptionSource);
    buttonContent.addEventListener('mouseover', this.hoverIconOn);
    buttonContent.addEventListener('mouseout', this.hoverIconOff);
    this.activeIcon(button);

    return placeCardElement;
  }

  hoverIconOn() {
    if (!getProfile) {
      this.hoverButton.classList.add('result-card__button-warning_is-opened');
      this.hoverButton.textContent = 'Войдите, что бы сохранять статьи';
    }
  }

  hoverIconOff() {
    if (!getProfile) {
      this.hoverButton.classList.remove('result-card__button-warning_is-opened');
    }
  }
}
