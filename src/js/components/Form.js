import validator from 'validator';

export default class Form {
  constructor(domElement, email) {
    this.domElement = domElement;
    // this._validateInputElement = this._validateInputElement.bind(this);
    this._validateForm = this._validateForm.bind(this);
    this.domElement
      .addEventListener('input', this._validateForm);

    this.domElement
      .addEventListener('input', this._validateLenghtPassword);
    // this.domElement
    //   .addEventListener('input', this._validateLenghtName);
    // this._validateInputElement = this._validateInputElement.bind(this);


  }

  setServerError(){

  }

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

  _validateLenghtPassword() {
    if (this.elements.password.value.length === 0) {
      this
        .querySelector('.popup__error-password')
        .textContent = 'Это обязательное поле';
    } else if (this.elements.password.value.length < 6) {
      this
        .querySelector('.popup__error-password')
        .textContent = 'Длина пароля должна быть не меньше 6 символов';
    } else {
      this
        .querySelector('.popup__error-password')
        .textContent = '';
      return true;
    }
    return false;
  }

  _validateLenghtName() {
    if (this.elements.name.value.length === 0) {
      this
        .querySelector('.popup__error-name')
        .textContent = 'Это обязательное поле';
    } else if (this.elements.password.value.length < 2 ||
      this.elements.password.value.length > 30) {
      this
        .querySelector('.popup__error-name')
        .textContent = 'Длина имени должна быть от 2 до 30 символов';
    } else {
      this
        .querySelector('.popup__error-name')
        .textContent = '';
      return true;
    }
    return false;
  }

  _validateForm() {
    this._validateInputElement(this.domElement.email);
    console.log(this);
  }

  _clear() {
    this
      .querySelector('.popup__error-email')
      .textContent = '';
  }

  _getInfo() {

  }
}