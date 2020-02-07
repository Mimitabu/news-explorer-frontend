import validator from 'validator';

export default class Form {
  constructor(domElement) {
    this.domElement = domElement;
    this.domElement
      .addEventListener('input', this._validateForm);
  }

  _validateInputElement(input) {
    if (!(проверка_валидности(input.value))) {
      this
        .querySelector('.popup__error-email')
        .textContent = 'Неверный формат email';
    }
  }

  _validateForm(input) {
    this._validateInputElement(this.elements.email);
  }
}