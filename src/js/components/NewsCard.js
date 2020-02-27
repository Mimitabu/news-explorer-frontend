// import { getProfile } from '../constants/constants';
import { link } from '../constants/constants';

export default class NewsCard {
  constructor(data) {
    this.title = data.title;
    this.publishedAt = data.publishedAt;
    this.description = data.description;
    this.urlToImage = data.urlToImage;
    this.source = data.source.name;
    this.cardElement = this.createCard();
  }

  // renderIcon() {
  //   if (getProfile) {
  //     this.resultСardButton.removeAttribute('disabled');
  //   } else if ()
  // }

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
    const descriptionSource = document.createElement('p');

    placeCardElement.classList.add('result-card');
    // placeCardElement.setAttribute('keyWord', userKeyWord);

    cardImageElement.classList.add('result-card__image');
    cardImageElement.style.backgroundImage = `url(${this.urlToImage})`;
    buttonContent.classList.add('result-card__button-content');
    buttonWarning.classList.add('result-card__button-warning');
    button.classList.add('result-card__button');
    button.setAttribute('disabled', true);
    buttonIcon.classList.add('result-card__button-icon');
    buttonIcon.style.backgroundImage = `url(${link})`;

    cardDescriptionElement.classList.add('result-card__description');
    descriptionData.classList.add('result-card__description-data');
    descriptionData.textContent = this.publishedAt;
    descriptionTitle.classList.add('result-card__description-title');
    descriptionTitle.textContent = this.title;
    descriptionAbout.classList.add('result-card__description-about');
    descriptionAbout.textContent = this.description;
    descriptionSource.classList.add('result-card__description-source');
    descriptionSource.textContent = this.source;

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

    console.log(placeCardElement);
    return placeCardElement;

  }
}
