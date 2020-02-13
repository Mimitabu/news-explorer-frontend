import Form from './Form';

export default class FormExtend extends Form {
  constructor(domElement) {
    super(domElement);
    this._clear();
    this._clearErrors();
  }

  _validateLenghtName(str) {
    if (str.value.length === 0) {
      this.domElement
        .querySelector('.popup__error-name')
        .textContent = 'Это обязательное поле';
    } else if (str.value.length < 2 ||
          str.value.length > 30) {
      this.domElement
        .querySelector('.popup__error-name')
        .textContent = 'Длина имени должна быть от 2 до 30 символов';
    } else {
      this.domElement
        .querySelector('.popup__error-name')
        .textContent = '';
      return true;
    }
    return false;
  }

  _validateForm() {
    const inputEmail = this._validateInputElement(this.domElement.email);
    const inputPassword = this._validatePassword(this.domElement.password);
    const inputName = this._validateLenghtName(this.domElement.name);

    this._buttonDisabled();
    if (inputEmail && inputPassword && inputName) {
      this.domElement.querySelector('.popup__button')
        .classList.remove('popup__button_disabled');
      this.domElement.querySelector('.popup__button').removeAttribute('disabled');
    } else {
      this._buttonDisabled();
    }
  }

  _clearErrors() {
    this.domElement
      .querySelector('.popup__error-name')
      .textContent = '';
    this.domElement
      .querySelector('.popup__error-email')
      .textContent = '';
    this.domElement
      .querySelector('.popup__error-password')
      .textContent = '';
  }

  _clear() {
    this.domElement.email.value = '';
    this.domElement.password.value = '';
    this.domElement.name.value = '';
  }
}
