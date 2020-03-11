export default class Popup {
  constructor(domElement) {
    this.domElement = domElement;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this.setContent = this.setContent.bind(this);
  }

  // открывает попап
  open() {
    this.domElement.classList.add('popup_is-opened');
  }

  // закрывает попап
  close(event) {
    this.domElement.classList.remove('popup_is-opened');
  }

  // очищает контент попапа
  clearContent(content) {
    document
      .querySelector(content)
      .classList.remove('popup__content_is-opened');
  }

  // добавляет нужный контент в попап
  setContent(content) {
    document
      .querySelector(content)
      .classList.add('popup__content_is-opened');
  }
}
