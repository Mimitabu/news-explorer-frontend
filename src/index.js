import './style.css';

const page = document.querySelector('.page');
const loginButton = page.querySelector('.header__login');
const popupCloseButton = page.querySelector('.popup__close');
const popUpForm = page.querySelector('.popup');
const headerMiniOpenButton = page.querySelector('.header__hide-nav');
const headerMiniCloseButton = page.querySelector('.header-mini__hide-nav');
const headerMini = page.querySelector('.header-mini');
const popUpFormSignup = page.querySelector('.popup__signup');
const popupSignupButton = page.querySelector('.popup__link-signup');

function openForm() {
  popUpForm.classList.add('popup_is-opened');
}

function openFormSignup() {
  popUpForm.classList.remove('popup_is-opened');
  popUpFormSignup.classList.add('popup_is-opened');
}

function closeForm() {
  popUpForm.classList.remove('popup_is-opened');
}

function openHeaderMini() {
  headerMini.classList.add('header-mini_is-opened');
}

function closeHeaderMini() {
  headerMini.classList.remove('header-mini_is-opened');
}

loginButton.addEventListener('click', openForm);
popupCloseButton.addEventListener('click', closeForm);
headerMiniOpenButton.addEventListener('click', openHeaderMini);
headerMiniCloseButton.addEventListener('click', closeHeaderMini);
popupSignupButton.addEventListener('click', openFormSignup);
