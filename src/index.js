import './style.css';

import {
  closePopupButonIn,
  closePopupButonUp,
  closePopupButonSaccsess,
  loginButton,
  signupButton,
  signinButton,
  popup,
  mainApi,
  formSignin,
  formSignup,
  popupButtonSignup,
  popupButtonSignin,
  afterSignupButton,
  header,
  headerMini,
  currentUser,
  getProfile,
} from './js/constants/constants';

import {
  closeForm,
  getUser,
  deleteUser,
} from './js/utils/utils';

header.render(getProfile, currentUser);


const formDOMSignin = document.forms.signin;
const formDOMSignup = document.forms.signup;

// открытие попапа входа
function openFormSignin() {
  popup.open();
  popup.clearContent('.popup__content-signup');
  popup.clearContent('.popup__content_successful-signup');
  popup.setContent('.popup__content-signin');
}

// открытие попапа регистрации
function openFormSignup() {
  popup.clearContent('.popup__content-signin');
  popup.setContent('.popup__content-signup');
}


// открытие попапа успешной регистрации
function openFormSuccessSignup() {
  popup.clearContent('.popup__content-signup');
  popup.setContent('.popup__content_successful-signup');
}

// регистрация пользователя
function signup(event) {
  event.preventDefault();
  const email = formDOMSignup.elements.email.value;
  const password = formDOMSignup.elements.password.value;
  const name = formDOMSignup.elements.name.value;
  mainApi.signup(email, password, name)
    .then(() => {
      openFormSuccessSignup();
    })
    .catch((err) => {
      if (err === 'Bad Request') {
        formSignup.setServerError('Такой пользователь уже существует');
      }
    });
}

// вход пользователя
function signin(event) {
  event.preventDefault();
  const email = formDOMSignin.elements.email.value;
  const password = formDOMSignin.elements.password.value;
  mainApi.signin(email, password)
    .then((data) => {
      header.render(true, data.name);
      headerMini.render(true, data.name);
      closeForm();
    })
    .catch((err) => {
      formSignin.setServerError(err);
    });
}


// слушатели событий
loginButton.addEventListener('click', openFormSignin);
closePopupButonIn.addEventListener('click', closeForm);
closePopupButonUp.addEventListener('click', closeForm);
closePopupButonSaccsess.addEventListener('click', closeForm);
signupButton.addEventListener('click', openFormSignup);
signinButton.addEventListener('click', openFormSignin);
popupButtonSignup.addEventListener('click', signup);
afterSignupButton.addEventListener('click', openFormSignin);
popupButtonSignin.addEventListener('click', signin);
