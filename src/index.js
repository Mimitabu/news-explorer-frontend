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
  afterSignupButton,
} from './js/constants/constants';

import {
  closeForm,
} from './js/utils/utils';


const formDOMSignin = document.forms.signin;
const formDOMSignup = document.forms.signup;

// const contentSignin = document.querySelector('.popup__content-signin');
// const contentSignup = document.querySelector('.popup__content-signup');


// const popupSignin = new Popup(document.querySelector('.popup__signin'));
// const popupSignup = new Popup(document.querySelector('.popup__signup'));
// const popupSuccessSignup = new Popup(document.querySelector('.popup__successful-signup'));


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

function signup(event) {
  event.preventDefault();
  const email = formDOMSignup.elements.email.value;
  const password = formDOMSignup.elements.password.value;
  const name = formDOMSignup.elements.name.value;
  mainApi.signup(email, password, name)
    .then(() => {
      openFormSuccessSignup();
      console.log('я выполняюсь');
    })
    .catch((err) => {
      if (err === 'Bad Request') {
        formSignup.setServerError('Такой пользователь уже существует');
      }
    });
}


function signin(event) {
  event.preventDefault();
  const email = formDOMSignin.elements.email.value;
  const password = formDOMSignin.elements.password.value;
  mainApi.signin(email, password)
    .then(() => {

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
