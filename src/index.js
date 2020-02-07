import './style.css';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import Button from './js/components/Button';

const closePopupButonIn = new Button(document.querySelector('.popup__close_signin'));
const closePopupButonUp = new Button(document.querySelector('.popup__close_signup'));
const closePopupButonSaccsess = new Button(document.querySelector('.popup__close_successful-signup'));

const loginButton = new Button(document.querySelector('.header__login'));
const signupButton = new Button(document.querySelector('.popup__link-signup'));
const signinButton = new Button(document.querySelector('.popup__link-signin'));

// const formSignin = document.forms.signin;
// const formSignup = document.forms.signup;

const contentSignin = document.querySelector('.popup__content-signin');
const contentSignup = document.querySelector('.popup__content-signup');


// const popupSignin = new Popup(document.querySelector('.popup__signin'));
// const popupSignup = new Popup(document.querySelector('.popup__signup'));
// const popupSuccessSignup = new Popup(document.querySelector('.popup__successful-signup'));

const popup = new Popup(document.querySelector('.popup'));


function openFormSignin() {
  popup.open();
  popup.clearContent('.popup__content-signup');
  popup.clearContent('.popup__content_successful-signup');
  popup.setContent('.popup__content-signin');
  const formSignin = new Form(document.forms.signin, document.forms.signin.elements.email);
}

function openFormSignup() {
  popup.clearContent('.popup__content-signin');
  popup.setContent('.popup__content-signup');
}

function openFormSuccessSignup() {
  popup.clearContent('.popup__content-signup');
  popup.clearContent('.popup__content_signin');
  popup.setContent('..popup__content_successful-signup');
}

function closeForm() {
  popup.close();
}

loginButton.addEventListener('click', openFormSignin);
closePopupButonIn.addEventListener('click', closeForm);
closePopupButonUp.addEventListener('click', closeForm);
closePopupButonSaccsess.addEventListener('click', closeForm);
signupButton.addEventListener('click', openFormSignup);
signinButton.addEventListener('click', openFormSignin);
