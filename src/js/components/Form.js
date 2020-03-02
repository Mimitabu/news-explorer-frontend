import validator from 'validator';

export default class Form {
  constructor(domElement) {
    this.domElement = domElement;
    this._validateForm = this._validateForm.bind(this);
    this.clearErrors();
    this.clear();
    this.domElement
      .addEventListener('input', this._validateForm);
  }

  // добавляет форме ошибку, пришедшую с сервера
  setServerError(errorText) {
    this.domElement
      .querySelector('.popup__error-signin')
      .textContent = errorText;
  }

  // валидирует email
  _validateInputElement(str) {
    if (!(validator.isEmail(str.value))) {
      this.domElement
        .querySelector('.popup__error-email')
        .textContent = 'Неверный формат email';
    } else {
      this.domElement
        .querySelector('.popup__error-email')
        .textContent = '';
      return true;
    }
    return false;
  }

  // валидирует пароль
  _validatePassword(str) {
    if (str.value.length === 0) {
      this.domElement
        .querySelector('.popup__error-password')
        .textContent = 'Это обязательное поле';
    } else if (str.value.length < 6) {
      this.domElement
        .querySelector('.popup__error-password')
        .textContent = 'Длина пароля должна быть не меньше 6 символов';
    } else {
      this.domElement
        .querySelector('.popup__error-password')
        .textContent = '';
      return true;
    }
    return false;
  }

  // валидирует всю форму
  _validateForm() {
    const inputEmail = this._validateInputElement(this.domElement.email);
    const inputPassword = this._validatePassword(this.domElement.password);
    this._buttonDisabled();

    if (inputEmail && inputPassword) {
      this._buttonActive();
    } else {
      this._buttonDisabled();
    }
  }

  // очищает сообщения об ошибках
  clearErrors() {
    this.domElement
      .querySelector('.popup__error-email')
      .textContent = '';
    this.domElement
      .querySelector('.popup__error-password')
      .textContent = '';
    this.domElement
      .querySelector('.popup__error-signin')
      .textContent = '';
  }

  // очищает поля формы
  clear() {
    this.domElement.email.value = '';
    this.domElement.password.value = '';
  }

  // деактивирует кнопку входа
  _buttonDisabled() {
    this.domElement.querySelector('.popup__button')
      .classList.add('popup__button_disabled');
    this.domElement.querySelector('.popup__button').setAttribute('disabled', true);
  }

  // активирует кнопку входа
  _buttonActive() {
    this.domElement.querySelector('.popup__button')
      .classList.remove('popup__button_disabled');
    this.domElement.querySelector('.popup__button').removeAttribute('disabled');
  }

  _getInfo() {
  }
}
