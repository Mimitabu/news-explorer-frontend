import SigninForm from './SigninForm';

// Класс формы регистрации, расширяющий класс формы входа
export default class SignupForm extends SigninForm {
  constructor(domElement) {
    super(domElement);
  }

  // добавляет форме ошибку, пришедшую с сервера
  setServerError(errorText) {
    this.domElement
      .querySelector('.popup__error-signup')
      .textContent = errorText;
  }

  // валидирует name
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

  // валидирует всю форму
  _validateForm() {
    const inputEmail = this._validateInputElement(this.domElement.email);
    const inputPassword = this._validatePassword(this.domElement.password);
    const inputName = this._validateLenghtName(this.domElement.name);

    this._buttonDisabled();
    if (inputEmail && inputPassword && inputName) {
      this._buttonActive();
    } else {
      this._buttonDisabled();
    }
  }

  // очищает сообщения об ошибках
  clearErrors() {
    this.domElement
      .querySelector('.popup__error-name')
      .textContent = '';
    this.domElement
      .querySelector('.popup__error-email')
      .textContent = '';
    this.domElement
      .querySelector('.popup__error-password')
      .textContent = '';
    this.domElement
      .querySelector('.popup__error-signup')
      .textContent = '';
  }

  // очищает поля формы
  clear() {
    this.domElement.email.value = '';
    this.domElement.password.value = '';
    this.domElement.name.value = '';
  }
}
